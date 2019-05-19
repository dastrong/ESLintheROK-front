import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  vocabulary: [],
  expressions: [],
  isGameReady: false,
  showSideBar: false,
  showDataModal: false,
  showPastLessons: false,
  pastLessons: [],
  dataModalName: "",
  font: "Poppins, sans-serif",
  colors: [
    "chocolate",
    "purple",
    "darkslateblue",
    "aqua",
    "teal",
    "fuchsia",
    "plum",
    "olive",
    "violet",
  ],
};

// we won't set a variable to see if the data was updated
// instead we'll just check the vocab and expression arrays for changes
const reducer = (state, action) => {
  const { type, vocabulary, expressions, name, font, bool, pastLessons } = action;
  switch (type) {
    case "setData":
      return { ...state, vocabulary, expressions, isGameReady: true };
    case "clearData":
      return { ...state, vocabulary: [], expressions: [], isGameReady: false };
    case "openSideBar":
      return { ...state, showSideBar: true };
    case "closeSideBar":
      return { ...state, showSideBar: false };
    case "openDataModal":
      return { ...state, showDataModal: true, dataModalName: name };
    case "closeDataModal":
      return { ...state, showDataModal: false, dataModalName: "" };
    case "togglePastLessons":
      return { ...state, showPastLessons: bool };
    case "setPastLessons":
      return { ...state, pastLessons };
    case "setFont":
      return { ...state, font };
    default:
      return state;
  }
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
