import React, { createContext, useContext, useReducer } from 'react';
import { seed } from 'lib/seed';
import { checkForPastLessons } from 'utils/lessons';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
export type DataModalNameType = 'lessons' | 'custom' | 'edit' | 'past';
type ShowSettings = boolean;

type StoreTypes = {
  isDataReady: IsDataReady;
  vocabulary: Vocabulary;
  expressions: Expressions;
  isMenuOpen: boolean;
  dataModalName: '' | DataModalNameType;
  showSettings: ShowSettings;
};

const init = (): StoreTypes => {
  const initialStuff = checkForPastLessons();

  return {
    ...initialStuff,
    isMenuOpen: false,
    dataModalName: '',
    showSettings: false,
    // if we want to seed the store we will here
    ...(process.env.NEXT_PUBLIC_SEED && seed),
  };
};

const initialState = init();

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
    case 'Set_Data':
      return {
        ...state,
        isDataReady: true,
        dataModalName: '' as DataModalNameType,
        vocabulary: action.vocabulary,
        expressions: action.expressions,
      };
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

  return (
    <StoreContext.Provider value={{ ...state, storeDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
