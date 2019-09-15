import React, { useCallback, useState, useEffect, useMemo } from "react";
import shuffle from "lodash/shuffle";
import { animated, useSprings, interpolate, useSpring } from "react-spring";
// import classNames from "classnames";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
// import useKeys from "../../hooks/useKeys";
// import useAudio from "../../hooks/useAudio";
import useScroll from "../../hooks/useScroll";
// import useFirstRun from "../../hooks/useFirstRun";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import {
  nextRoundData,
  arrOfRandoNum,
  changeIsVocab,
  getRandoNum,
} from "../../helpers/gameUtils";
import "./SpeedWriter.css";

// CONSTANT VARIABLES
const fontSize = 18; // 18vw - change in CSS file too
const BG_blu = `https://images.unsplash.com/photo-1561211919-1947abbbb35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=100`;
const BG_pnk = `https://images.unsplash.com/photo-1559251606-c623743a6d76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=100`;
const BG_bNr = `https://images.unsplash.com/photo-1557672211-0741026eacfb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=100`;
const BG_rbw = `https://images.unsplash.com/photo-1558470598-a5dda9640f68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=100`;
const BG_images = [BG_blu, BG_pnk, BG_bNr, BG_rbw];

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
  stage: 0,
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, answer, level } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData, answer };
    case "Level_New":
      return { ...state, level, stage: 0 };
    case "Stage_Change":
      const oldStage = state.stage;
      const newStage = oldStage === stages.length - 1 ? 0 : oldStage + 1;
      return { ...state, stage: newStage };
    default:
      return state;
  }
}

export default function SpeedWriter(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  // const isFirstRun = useFirstRun();

  // const [audioRef, resetFunc] = useAudio(url, shouldLoop);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData, answer, level, stage } = state;
  const backgroundImage = getBGimg(level);
  const curStage = stages[stage];

  const [isReverse, setReverse] = useState(false);
  const toggleReverse = () => setReverse(state => !state);

  // LETTER/WORD SPRING
  const [durations, maxDur, outputs] = useMemo(() => {
    const durations = arrOfRandoNum(7000, 4000, gameData.length);
    const maxDur = Math.max(...durations);
    const outputs = getSettings(gameData, level);
    return [durations, maxDur, outputs];
  }, [gameData]);
  const springOpts = getSpringOpts(isReverse, toggleReverse, durations, maxDur);
  const letterSprings = useSprings(gameData.length, springOpts);

  // LEVEL SPRING
  const levelOpts =
    curStage !== "LEVEL_SHOW"
      ? { opacity: 0, transform: "translateX(-100vw)" }
      : { opacity: 1, transform: "translateX(0vw)" };
  const levelSpring = useSpring(levelOpts);

  // ANSWER SPRING

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
    const [cur, nex] = __verifyGameData(data, isVocab, vocabulary, expressions);
    const splitData = __splitText(cur, isVocab);
    const gameData = shuffle(splitData);
    dispatch({ type: "New_Round", gameData, data: nex, answer: cur });
  }, [data, isVocab, dispatch]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => dispatch({ type: "Change_isVocab", isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // ================
  // USE EFFECTS HERE
  // ================
  useEffect(() => {
    // preloadImgs(BG_images); // load and cache images for use later
  }, []);

  // ================
  // GAME FUNCTIONS HERE
  // ================

  return (
    <div
      className="speedwriter-container"
      onClick={handleGame}
      style={{ fontFamily: font, backgroundImage }}
    >
      <animated.div className="level" style={levelSpring}>
        Level {level}
      </animated.div>
      {letterSprings.map((spring, i) => {
        const text = gameData[i];
        const { outputX, outputY } = outputs[i];
        return (
          <animated.div
            key={i + text}
            children={text}
            className="letter"
            style={{
              fontSize: `${fontSize}vw`,
              transform: interpolate(
                [
                  spring.x.interpolate({ range: [0, 1], output: outputX }),
                  spring.x.interpolate({ range: [0, 1], output: outputY }),
                  // spring.x.interpolate({ range, output: rotation }),
                ],
                // (x, y, rotation) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`
                (x, y, rotation) => `translate(${x}px, ${y}px)`
              ),
            }}
          />
        );
      })}
    </div>
  );
}

// OTHER FUNCTIONS HERE
function preloadImgs(images) {
  images.forEach(src => {
    let image = new Image();
    image.src = src;
  });
}

function getBGimg(level) {
  let img = level === 0 ? BG_rbw : level > 6 ? BG_bNr : level > 3 ? BG_pnk : BG_blu;
  return `url(${img})`;
}

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

function getSpringOpts(isReverse, toggleReverse, durations, maxDur) {
  return durations.map(dur => ({
    from: { x: 0 },
    x: 1,
    reverse: isReverse,
    reset: true,
    onRest: dur === maxDur ? toggleReverse : null,
    config: { duration: dur },
  }));
}

function getMaxDivWidth() {
  const nodes = document.getElementsByClassName("letter");
  const divs = [...nodes];

  const widths = divs.map(div => div.offsetWidth);
  const maxDivWidth = Math.max(...widths);

  return maxDivWidth;
}

function getSideValues() {
  const { innerHeight, innerWidth } = window;
  const maxDivHeight = (fontSize / 100) * innerWidth;
  const maxDivWidth = getMaxDivWidth();

  const left = -(maxDivWidth > 0 ? maxDivWidth : 200);

  return {
    top: -maxDivHeight,
    right: innerWidth,
    bottom: innerHeight,
    left,
  };
}

// normal = left=>right and up=>down; false = the reverse of either
function getDirection(multipleDirections) {
  if (!multipleDirections) return true;
  return getRandoNum(100, 1) > 50;
}

function getCoords(sideValues, isXAxis, isNormalDirection) {
  const { top, right, bottom, left } = sideValues;
  let x, y;

  if (isXAxis) {
    const z = getRandoNum(top + bottom);
    if (isNormalDirection) {
      x = [left, right];
      y = [z, z];
    } else {
      x = [right, left];
      y = [z, z];
    }
  } else {
    const z = getRandoNum(left + right);
    if (isNormalDirection) {
      x = [z, z];
      y = [top, bottom];
    } else {
      x = [z, z];
      y = [bottom, top];
    }
  }
  return { outputX: x, outputY: y };
}

function getSettings(gameData, level = 1) {
  const multipleDirections = level > 5;
  const sideValues = getSideValues();
  let outputs;

  // linear patterns
  if (level < 3 || true) {
    outputs = gameData.map((_, i) => {
      const isXAxis = i % 2;
      const isNormalDirection = getDirection(multipleDirections);
      return getCoords(sideValues, isXAxis, isNormalDirection);
    });
  }

  return outputs;
}

// // linear and wavy patterns
// if (level < 6) {
// }
// // linear, wavy and rotating patterns
// if (level < 9) {
// }
// // zig zag patterns
// if (level === 0) {
// }
