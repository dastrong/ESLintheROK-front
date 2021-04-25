import React, { createContext, useContext, useReducer } from 'react';
import { checkForPastLessons } from '../utils/lessons';

type IsDataReady = boolean;
type Vocabulary = string[];
type Expressions = string[];
type DataModalName = 'lessons' | 'data' | 'dataEdit' | '';
type Font = string;

type StoreTypes = {
  isDataReady: IsDataReady;
  vocabulary: Vocabulary;
  expressions: Expressions;
  isSidebarOpen: boolean;
  dataModalName: DataModalName;
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
  | { type: 'openDataModal'; dataModalName: DataModalName }
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
      return { ...state, dataModalName: '' as DataModalName };
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
