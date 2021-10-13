import React, { createContext, useContext, useEffect, useReducer } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { seed } from 'lib/seed';
import { checkIfNew } from 'utils/checkIfNew';
import { regFetch } from 'utils/fetchers';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
export type DataModalNameType = 'lessons' | 'custom' | 'edit' | 'past';
type ShowSettings = boolean;
type ShowChangelogNotification = boolean;

type LessonData = {
  vocabulary: string[];
  expressions: string[];
};

type StoreTypes = LessonData & {
  isDataReady: IsDataReady;
  isMenuOpen: boolean;
  dataModalName: '' | DataModalNameType;
  showSettings: ShowSettings;
  showChangelogNotification: ShowChangelogNotification;
};

const setLastLessonUsed = (data: LessonData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lastLessonUsed', JSON.stringify(data));
};

const getLastLessonUsed = () => {
  if (typeof window === 'undefined') return null;
  const lastLessonUsed: LessonData = JSON.parse(
    localStorage.getItem('lastLessonUsed')
  );
  if (!lastLessonUsed) return null;
  return lastLessonUsed;
};

const initialState: StoreTypes = {
  dataModalName: '',
  isMenuOpen: false,
  showSettings: false,
  isDataReady: false,
  vocabulary: [],
  expressions: [],
  showChangelogNotification: false,
  ...(Boolean(process.env.NEXT_PUBLIC_SEED) && seed),
};

type ActionTypes =
  | { type: 'Set_Data'; vocabulary: Vocabulary; expressions: Expressions }
  | { type: 'Open_Menu' }
  | { type: 'Close_Menu' }
  | { type: 'Open_Data_Modal'; dataModalName: DataModalNameType }
  | { type: 'Close_Data_Modal' }
  | { type: 'Open_Settings' }
  | { type: 'Close_Settings' }
  | { type: 'Set_Changelog_Notification'; show: boolean }
  | { type: 'Close_Settings' };

const reducer = (state: StoreTypes, action: ActionTypes) => {
  switch (action.type) {
    case 'Set_Data': {
      // gather the vocabulary and expressions together
      const newData = {
        vocabulary: action.vocabulary,
        expressions: action.expressions,
      };
      // set the data in localStorage for hard page refresh data initialization
      setLastLessonUsed(newData);
      // spread the data, close the dataModal, set the ready boolean
      return {
        ...state,
        isDataReady: true,
        dataModalName: '' as DataModalNameType,
        ...newData,
      };
    }
    case 'Open_Menu':
      return { ...state, isMenuOpen: true };
    case 'Close_Menu':
      return { ...state, isMenuOpen: false };
    case 'Open_Data_Modal':
      return {
        ...state,
        isMenuOpen: false,
        dataModalName: action.dataModalName,
      };
    case 'Close_Data_Modal':
      return { ...state, dataModalName: '' as DataModalNameType };
    case 'Open_Settings':
      return { ...state, isMenuOpen: false, showSettings: true };
    case 'Close_Settings':
      return { ...state, isMenuOpen: false, showSettings: false };
    case 'Set_Changelog_Notification':
      return { ...state, showChangelogNotification: action.show };
    default:
      return state;
  }
};

const StoreContext = createContext(
  {} as StoreTypes & { storeDispatch: React.Dispatch<ActionTypes> }
);

export const StoreProvider = ({ children }) => {
  const [state, storeDispatch] = useReducer(reducer, initialState);
  const { data } = useSWR(
    'https://api.github.com/repos/dastrong/eslintherok-front/commits?path=CHANGELOG.md&page=1&per_page=1',
    regFetch
  );

  // check if there is a past lesson in the user's localStorage and set it, if there was
  useEffect(() => {
    const lastLessonUsed = getLastLessonUsed();

    if (lastLessonUsed) {
      storeDispatch({
        type: 'Set_Data',
        vocabulary: lastLessonUsed?.vocabulary || [],
        expressions: lastLessonUsed?.expressions || [],
      });
    }
  }, []);

  // check if there has been an update to the changelog page
  // if there is we want to indicate that to the user
  useEffect(() => {
    if (data) {
      // when did the user last visit the changelog page and when was the last update made
      const lastViewedUpdate = Cookies.get('last_viewed_update');
      const lastUpdatePublished = data[0].commit.committer.date;

      // if the user has viewed the changelog after the most recent update, skip it
      if (lastViewedUpdate) {
        const lastViewedUpdateInMs = new Date(lastViewedUpdate).getTime();
        const lastUpdatePublishedInMs = new Date(lastUpdatePublished).getTime();
        if (lastViewedUpdateInMs > lastUpdatePublishedInMs) return;
      }

      // check if the last update published is actually
      if (checkIfNew(lastUpdatePublished, 21)) {
        storeDispatch({
          type: 'Set_Changelog_Notification',
          show: true,
        });
      }
    }
  }, [data]);

  return (
    <StoreContext.Provider value={{ ...state, storeDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
