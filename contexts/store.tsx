import React, { createContext, useContext, useReducer } from 'react';
import { checkForPastLessons } from '../utils/lessons';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
export type DataModalNameType = 'lessons' | 'custom' | 'edit' | 'past';
type Font = string;

type StoreTypes = {
  isDataReady: IsDataReady;
  vocabulary: Vocabulary;
  expressions: Expressions;
  isSidebarOpen: boolean;
  dataModalName: '' | DataModalNameType;
  font: Font;
};

const init = (): StoreTypes => {
  const initialStuff = checkForPastLessons();

  return {
    ...initialStuff,
    vocabulary: [
      'Lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'consectetur',
      'adipisicing',
      'elit',
      'Voluptate',
      'quidem',
    ],
    expressions: [
      'Lorem Lorem Lorem',
      'ipsum ipsum ipsum',
      'dolor dolor dolor',
      'sit sit sit',
      'amet amet amet',
      'consectetur consectetur consectetur',
      'adipisicing adipisicing adipisicing',
      'elit elit elit',
      'Voluptate Voluptate Voluptate',
      'quidem quidem quidem',
    ],
    isSidebarOpen: false,
    dataModalName: '',
    font: 'Poppins, sans-serif',
  };
};

const initialState = init();

type ActionTypes =
  | { type: 'setData'; vocabulary: Vocabulary; expressions: Expressions }
  | { type: 'clearData' }
  | { type: 'openSidebar' }
  | { type: 'closeSidebar' }
  | { type: 'openDataModal'; dataModalName: DataModalNameType }
  | { type: 'closeDataModal' }
  | { type: 'setFont'; font: Font };

const reducer = (state: StoreTypes, action: ActionTypes) => {
  const { type, ...newVals } = action;
  switch (type) {
    case 'setData':
      return { ...state, isDataReady: true, ...newVals };
    case 'clearData':
      return { ...state, isDataReady: false, vocabulary: [], expressions: [] };
    case 'openSidebar':
      return { ...state, isSidebarOpen: true };
    case 'closeSidebar':
      return { ...state, isSidebarOpen: false };
    case 'openDataModal':
      return { ...state, ...newVals };
    case 'closeDataModal':
      return { ...state, dataModalName: '' as DataModalNameType };
    case 'setFont':
      return { ...state, ...newVals };
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
