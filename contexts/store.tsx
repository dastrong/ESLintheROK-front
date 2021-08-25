import React, { createContext, useContext, useReducer } from 'react';
import { seed } from 'lib/seed';
import { checkForPastLessons } from 'utils/lessons';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
export type DataModalNameType = 'lessons' | 'custom' | 'edit' | 'past';
type Font = string;

type StoreTypes = {
  isDataReady: IsDataReady;
  vocabulary: Vocabulary;
  expressions: Expressions;
  isMenuOpen: boolean;
  dataModalName: '' | DataModalNameType;
  font: Font;
};

const init = (): StoreTypes => {
  const initialStuff = checkForPastLessons();

  return {
    ...initialStuff,
    isMenuOpen: false,
    dataModalName: '',
    font: 'Poppins, sans-serif',
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
  | { type: 'Set_Font'; font: Font };

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
    case 'Set_Font':
      return { ...state, font: action.font };
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
