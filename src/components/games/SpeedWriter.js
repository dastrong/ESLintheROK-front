import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
// import classNames from "classnames";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useAudio from "../../hooks/useAudio";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useFirstRun from "../../hooks/useFirstRun";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import {
  nextRoundData,
  arrOfRandoNum,
  changeIsVocab,
  getRandomNum,
} from "../../helpers/gameUtils";
import FitText from "../reusable/FitText";
import "./SpeedWriter.css";

// CONSTANT VARIABLES - specific to the game

// the different stages
const stages = [
  "LEVEL_SHOW",
  "LEVEL_HIDE",
  "NEW_ROUND",
  "ANIMATION_START",
  "ANIMATION_STOP",
  "SHOW_ANSWER_BOARD",
  "SHOW_ANSWER_TEXT",
];

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  answer: "",
  level: 1,
  showLevel: false,
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, answer } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData, answer };
    default:
      return state;
  }
}

export default function SpeedWriter(props) {
  // PROPS
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // const [audioRef, resetFunc] = useAudio(url, shouldLoop);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData } = state;
  // const [refs] = useFitText(gameData.length, gameData, font, false);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    const [cur, nex] = __verifyGameData(data, isVocab, vocabulary, expressions);
    const splitData = __splitText(cur, isVocab);
    const gameData = shuffle(splitData);
    console.log(cur, gameData);
    dispatch({ type: "New_Round", gameData, data: nex, answer: cur });
    // googleEvent(title);
  }, [data, isVocab, dispatch]);
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
    <div onClick={handleGame} style={{ fontFamily: font }}>
      <p>{title} Template</p>
    </div>
  );
}

// INNER COMPONENTS HERE

// OTHER FUNCTIONS HERE
function __splitText(text, isVocab) {
  const splitter = isVocab ? "" : " ";
  return text.split(splitter);
}

function __verifyGameData(data, isVocab, vocabulary, expressions) {
  let gameData = "";
  let nextData = [];
  for (let i = 0; i < data.length; i++) {
    const [[cur], nex] = nextRoundData(data, 1, isVocab, vocabulary, expressions);
    if (!cur.includes("_")) {
      gameData = cur;
      nextData = nex;
      break;
    }
  }
  return [gameData, nextData];
}
