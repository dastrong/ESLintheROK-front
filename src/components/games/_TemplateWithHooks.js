import React from "react";
// import classNames from "classnames";
// import shuffle from "lodash/shuffle";
// import ReactFitText from "react-fittext";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useMountListeners from "../../hooks/useMountListeners";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useSetGameData from "../../hooks/useSetGameData";
import useUpdateData from "../../hooks/useUpdateData";
import { newGoogEvent } from "../../helpers/phase2helpers";
// import helpers here

const initialState = {
  compressor: 0.6,
  // put state values here
};

function reducer(state, action) {
  const { type, compressor } = action;
  switch (type) {
    case "Compressor":
      return { ...state, compressor };
    // add other conditions here
    default:
      return state;
  }
}

export default function Template(props) {
  const { vocabulary, expressions, font, dataUpdated, title, isMenuOpen, colors } = props;
  const initialSetUp = { reducer, initialState, vocabulary, expressions };
  const [state, dispatch] = useSetGameData(initialSetUp);
  const { compressor } = state;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  useMountListeners({ dispatch, isMenuOpen, compressor, keysCB, scrollCB });
  useUpdateData(dataUpdated, dispatch);

  // CUSTOM GAME LOGIC
  function handleGame() {
    console.log("new round");
    newGoogEvent(title);
  }

  // GAME SPECIFIC KEY EVENTS
  function keysCB(e) {
    console.log("game specific key events");
  }

  // GAME SPECIFIC SCROLL EVENTS
  function scrollCB(compressorChange) {
    console.log("game specific scroll events");
  }

  return (
    <div onClick={handleGame}>
      <p>{title} Template</p>
    </div>
  );
}
