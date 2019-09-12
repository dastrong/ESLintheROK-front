import React, { createContext, useContext, useReducer } from "react";

const init = () => {
  // grab the last lesson on load
  var isLastLesson = localStorage.getItem("previousLessonData");
  var lastLesson = !!isLastLesson && JSON.parse(isLastLesson);
  // grab the past lessons on load
  const isPastLessons = localStorage.getItem("lessonData");
  const pastLessons = !!isPastLessons ? JSON.parse(isPastLessons) : [];
  // get the last lesson's data
  const { vocabulary = [], expressions = [] } = lastLesson;
  // ensure there's enough data available
  const isGameReady = vocabulary.length >= 9 && expressions.length >= 6;

  return {
    vocabulary,
    expressions,
    pastLessons,
    isGameReady,
    showSideBar: false,
    showDataModal: false,
    showPastLessons: false,
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
};

const initialState = init();

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
