import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { seed } from 'lib/seed';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
export type DataModalNameType = 'lessons' | 'custom' | 'edit' | 'past';
type ShowSettings = boolean;

type LessonData = {
  vocabulary: string[];
  expressions: string[];
};

type StoreTypes = LessonData & {
  isDataReady: IsDataReady;
  isMenuOpen: boolean;
  dataModalName: '' | DataModalNameType;
  showSettings: ShowSettings;
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
  ...(Boolean(process.env.NEXT_PUBLIC_SEED) && seed),
};

type ActionTypes =
  | { type: 'Set_Data'; vocabulary: Vocabulary; expressions: Expressions }
  | { type: 'Open_Menu' }
  | { type: 'Close_Menu' }
  | { type: 'Open_Data_Modal'; dataModalName: DataModalNameType }
  | { type: 'Close_Data_Modal' }
  | { type: 'Open_Settings' }
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
    default:
      return state;
  }
};

const StoreContext = createContext(
  {} as StoreTypes & { storeDispatch: React.Dispatch<ActionTypes> }
);

export const StoreProvider = ({ children }) => {
  const [state, storeDispatch] = useReducer(reducer, initialState);

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

  return (
    <StoreContext.Provider value={{ ...state, storeDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
