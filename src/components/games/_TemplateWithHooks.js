import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
// import ReactFitText from "react-fittext";
// import classNames from "classnames";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { newGoogEvent } from "../../helpers/phase2helpers";
// import helpers here
// import CSS here

const init = data => ({
  compressor: 0.6,
  data: shuffle(data),
});

function reducer(state, action) {
  const { type, compressor, data } = action;
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
  // PROPS - remove unused variable below
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE - set vocabulary, expressions or both below
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { compressor, data } = state;

  // HANDLE GAME - add dependencies as needed
  const handleGame = useCallback(() => {
    console.log("new round");
    newGoogEvent(title);
  }, []);
  useHandleGame(handleGame, didUpdate);

  // EVENT HANDLERS - add dependencies as needed
  // reqDep are required dependencies of useKeys and useScroll hooks
  const reqDep = [dispatch, isMenuOpen, compressor];
  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      console.log("game specific key events");
      if (keyCode === 32 || keyCode === 13) return handleGame();
    },
    [handleGame]
  );
  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(compressorChange => {
    console.log("game specific scroll events");
  }, []);
  // if keysCB or scrollCB are not used, set param to null
  useKeys(keysCB, ...reqDep);
  useScroll(scrollCB, ...reqDep);

  // OTHER GAME FUNCTIONS AND LOGIC HERE

  return (
    // REMEMBER TO PASS FONT TO THE CONTAINER STYLING
    <div onClick={handleGame}>
      <p>{title} Template</p>
    </div>
  );
}
