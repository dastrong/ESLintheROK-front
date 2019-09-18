import React, { useCallback, useState, useEffect, useMemo } from "react";
import shuffle from "lodash/shuffle";
import { animated, useSprings, interpolate, useSpring, config } from "react-spring";
import useData from "../../hooks/useData";
// import useKeys from "../../hooks/useKeys";
// import useAudio from "../../hooks/useAudio";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
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
import FitText from "../reusable/FitText";
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
  "SHOW_LEVEL",
  "SHOW_READY",
  "ACTION",
  "SHOW_ANSWER_BOX",
  "SHOW_ANSWER_TEXT",
];

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  answer: "",
  level: 8,
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
      const newStage = oldStage === stages.length - 1 ? 1 : oldStage + 1;
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
    preloadImgs(BG_images); // load and cache images for use later
  }, []);

  // ================
  // GAME FUNCTIONS HERE
  // ================
  function _handleClick() {
    dispatch({ type: "Stage_Change" });
    if (stage !== 4) return;
    handleGame();
  }

  return (
    <div
      className="speedwriter-container"
      onClick={_handleClick}
      style={{ fontFamily: font, backgroundImage }}
    >
      <AnimatedText show={curStage === "SHOW_LEVEL"} text={`Level ${level}`} />
      <AnimatedText show={curStage === "SHOW_READY"} text="Ready?" />
      {curStage === "ACTION" && <Letters gameData={gameData} level={level} />}
      <Answer answer={answer} curStage={curStage} font={font} />
    </div>
  );
}

// OTHER COMPONENTS HERE
function AnimatedText({ show, text }) {
  const springProps = show
    ? { opacity: 1, transform: "translateX(0vw)" }
    : { opacity: 0, transform: "translateX(-100vw)" };
  const spring = useSpring({ config: config.wobbly, ...springProps });

  return (
    <animated.div className="animated-text" style={spring}>
      {text}
    </animated.div>
  );
}

function Letters({ gameData, level }) {
  const [isReverse, setReverse] = useState(false);
  const toggleReverse = () => setReverse(state => !state);

  const [durations, largestDur, outputs] = useMemo(() => {
    const [durations, largestDur] = getDurations(level, gameData.length);
    const outputs = getSettings(gameData, level);
    return [durations, largestDur, outputs];
  }, [gameData]);

  const springs = useSprings(
    gameData.length,
    durations.map(dur => ({
      from: { x: 0 },
      x: 1,
      reverse: isReverse,
      reset: true,
      onRest: dur === largestDur ? toggleReverse : null,
      config: { duration: dur },
    }))
  );

  console.log("dfdfdfdf");

  return springs.map((spring, i) => {
    const text = gameData[i];
    const { outputX, outputY, outputRotation } = outputs[i];
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
              spring.x.interpolate({ range: [0, 1], output: outputRotation }),
            ],
            (x, y, r) => `translate(${x}px, ${y}px) rotate(${r}deg)`
          ),
        }}
      />
    );
  });
}

function Answer({ curStage, answer, font }) {
  const [[textRef]] = useFitText(1, answer, font);
  const [[headerRef]] = useFitText(1, null, font);

  const showBox = curStage === "SHOW_ANSWER_BOX";
  const showText = curStage === "SHOW_ANSWER_TEXT";

  const boxOpts =
    showBox || showText
      ? { opacity: 1, transform: "translateX(0vw)" }
      : { opacity: 0, transform: "translateX(100vw)" };
  const boxSpring = useSpring({ config: config.wobbly, ...boxOpts });
  const textSpring = useSpring({ config: config.wobbly, opacity: showText ? 1 : 0 });
  const headerSpring = useSpring({
    transform: showBox ? "translateY(0)" : "translateY(-19vh)",
  });

  return (
    <>
      <animated.div className="answer-header" style={headerSpring}>
        <FitText text="Show your answers" ref={headerRef} />
      </animated.div>
      <animated.div className="answer-box" style={boxSpring}>
        <animated.div style={textSpring}>
          <FitText text={answer} ref={textRef} />
        </animated.div>
      </animated.div>
    </>
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

function getDurations(level, count) {
  const maxDur = (10 - level) * 1000;
  const minDur = maxDur * 0.85;

  const durations = arrOfRandoNum(maxDur, minDur, count);
  const largestDur = Math.max(...durations);

  return [durations, largestDur];
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

function getRotation(level) {
  if (level <= 6) return [0, 0];

  const maxLevel = 9;
  const rotationDeg = 360;
  const maxNumOfRotations = 1;

  const lvlDiff = (maxLevel - level) / 2;
  const currentLvlNumOfRotation = maxNumOfRotations - lvlDiff;
  const currentLvlRotationDeg = currentLvlNumOfRotation * rotationDeg;
  const rotation = getRandoNum(currentLvlRotationDeg);

  return shuffle([0, rotation]);
}

function getCoords(sideValues, isXAxis, isNormalDirection, rotation) {
  const { top, right, bottom, left } = sideValues;
  let x, y;

  if (isXAxis) {
    const z = getRandoNum(top + bottom);
    const w = getRandoNum(top + bottom);
    if (isNormalDirection) {
      x = [left, right];
      y = [w, z];
    } else {
      x = [right, left];
      y = [w, z];
    }
  } else {
    const z = getRandoNum(left + right);
    const w = getRandoNum(left + right);
    if (isNormalDirection) {
      x = [w, z];
      y = [top, bottom];
    } else {
      x = [w, z];
      y = [bottom, top];
    }
  }
  return { outputX: x, outputY: y, outputRotation: rotation };
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
      const rotation = getRotation(level);
      return getCoords(sideValues, isXAxis, isNormalDirection, rotation);
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
