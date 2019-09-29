import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
// import classNames from "classnames";
// import {useSpring} from "react-spring"
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  nextRoundData,
  arrOfRandoNum,
  changeIsVocab,
  getRandoNum,
} from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
// import helpers here
// import CSS here

// CONSTANT VARIABLES - specific to the game

const init = data => ({
  data: shuffle(data),
  isVocab: true,
});

function reducer(state, action) {
  const { type, data, isVocab } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    // add other conditions here
    default:
      return state;
  }
}

export default function MissingLetter(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab } = state;
  // const [refs] = useFitText(gameData.length, gameData, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
  }, []);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      console.log("game specific key events");
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => {
      console.log("game specific scroll events");
    },
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE

  // GAME FUNCTIONS HERE

  // CLASSES

  return (
    <div
      className="missing-letter-container"
      onClick={handleGame}
      style={{ fontFamily: font }}
    >
      <p>{title} Template</p>
    </div>
  );
}

// INNER COMPONENTS HERE

// OTHER FUNCTIONS HERE - should start with a double underscore __func()
