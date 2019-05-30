import React, { useCallback } from "react";
// import shuffle from "lodash/shuffle";
// import ReactFitText from "react-fittext";
// import classNames from "classnames";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useSetData from "../../hooks/useSetData";
import useUpdateData from "../../hooks/useUpdateData";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useMountListeners from "../../hooks/useMountListeners";
import { newGoogEvent } from "../../helpers/phase2helpers";
// import helpers here
// import CSS here

const init = data => ({
  compressor: 0.6,
  data: shuffle(data),
});

function reducer(state, action) {
  const { type, compressor } = action;
  switch (type) {
    case "Compressor":
      return { ...state, compressor };
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    // add other conditions here
    default:
      return state;
  }
}

export default function Template(props) {
  // REMOVE UNUSED VARIABLES BELOW
  const { title, isMenuOpen, font, dataUpdated, vocabulary, expressions, colors } = props;
  // SET VOCABULARY OR EXPRESSIONS BELOW
  const [state, dispatch] = useSetGame(reducer, DATATYPE, init);
  // IF DATA IS EDITED, CREATE A NEW HANDLE GAME FUNCTION THAT USES THAT NEW DATA
  const handleGameRef = useCallback(handleGame, [dataUpdated]);
  // DESTRUCTURE THE STATE
  const { compressor, data } = state;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  // CAN REMOVE CB, IF IT'S NOT USED
  useMountListeners({ dispatch, isMenuOpen, compressor, data, keysCB, scrollCB });
  useUpdateData(dataUpdated, handleGameRef);

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
    // REMEMBER TO PASS FONT TO THE CONTAINER STYLING
    <div onClick={handleGame}>
      <p>{title} Template</p>
    </div>
  );
}
