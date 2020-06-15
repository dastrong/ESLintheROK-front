import React, { useCallback, useState, useEffect, useMemo } from "react";
import shuffle from "lodash/shuffle";
import { animated, useSprings, interpolate, useSpring, config } from "react-spring";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useAudio from "hooks/useAudio";
import useScroll from "hooks/useScroll";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  arrOfRandoNum,
  changeIsVocab,
  getRandoNum,
  verifyGameData,
} from "helpers/gameUtils";
import AnswerBox from "@Reusable/AnswerBox";
import "./SpeedSolver.css";

// CONSTANT VARIABLES
const getMediaURL = (type, file, transforms = "") =>
  `https://res.cloudinary.com/dastrong/${type}/upload${transforms}/TeacherSite/Media/SpeedSolver/${file}`;
// IMAGES URLs
const BG_blu = getMediaURL("image", "BG_blu.jpg", "/f_auto");
const BG_pnk = getMediaURL("image", "BG_pnk.jpg", "/f_auto");
const BG_bNr = getMediaURL("image", "BG_bNr.jpg", "/f_auto");
const BG_rbw = getMediaURL("image", "BG_rbw.jpg", "/f_auto");
const BG_images = [BG_blu, BG_pnk, BG_bNr, BG_rbw];
// AUDIO URLs
const flyByUrl = getMediaURL("video", "zoomBy.mp3");
const level1Url = getMediaURL("video", "level1.mp3");
const level2Url = getMediaURL("video", "level2.mp3");
const level3Url = getMediaURL("video", "level3.mp3");
const level4Url = getMediaURL("video", "level4.mp3");
const level5Url = getMediaURL("video", "level5.mp3");
const level6Url = getMediaURL("video", "level6.mp3");
const level7Url = getMediaURL("video", "level7.mp3");
const level8Url = getMediaURL("video", "level8.mp3");
const level9Url = getMediaURL("video", "level9.mp3");
const level10Url = getMediaURL("video", "level10.mp3");

// the different stages
const stages = [
  "SHOW_LEVEL",
  "SHOW_READY",
  "ACTION",
  "SHOW_ANSWER_BOX",
  "SHOW_ANSWER_TEXT",
];

const init = (data) => ({
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
      return { ...state, data, gameData, answer, stage: 1 };
    case "Level_Change":
      return { ...state, level, stage: 0 };
    case "Stage_Change":
      const oldStage = state.stage;
      const newStage = oldStage === stages.length - 1 ? 1 : oldStage + 1;
      return { ...state, stage: newStage };
    default:
      return state;
  }
}

export default function SpeedSolver(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // AUDIO REFS
  const [flyByAud, resetFlyBy] = useAudio(flyByUrl);
  const [lvl1Aud, resetLvl1] = useAudio(level1Url, true);
  const [lvl2Aud, resetLvl2] = useAudio(level2Url, true);
  const [lvl3Aud, resetLvl3] = useAudio(level3Url, true);
  const [lvl4Aud, resetLvl4] = useAudio(level4Url, true);
  const [lvl5Aud, resetLvl5] = useAudio(level5Url, true);
  const [lvl6Aud, resetLvl6] = useAudio(level6Url, true);
  const [lvl7Aud, resetLvl7] = useAudio(level7Url, true);
  const [lvl8Aud, resetLvl8] = useAudio(level8Url, true);
  const [lvl9Aud, resetLvl9] = useAudio(level9Url, true);
  const [lvl10Aud, resetLvl10] = useAudio(level10Url, true);

  // array of the above audios for easier playing
  const audios = [
    { track: flyByAud, reset: resetFlyBy },
    { track: lvl1Aud, reset: resetLvl1 },
    { track: lvl2Aud, reset: resetLvl2 },
    { track: lvl3Aud, reset: resetLvl3 },
    { track: lvl4Aud, reset: resetLvl4 },
    { track: lvl5Aud, reset: resetLvl5 },
    { track: lvl6Aud, reset: resetLvl6 },
    { track: lvl7Aud, reset: resetLvl7 },
    { track: lvl8Aud, reset: resetLvl8 },
    { track: lvl9Aud, reset: resetLvl9 },
    { track: lvl10Aud, reset: resetLvl10 },
  ];

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData, answer, level, stage } = state;
  const backgroundImage = __getBGimg(level);
  const curStage = stages[stage];

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const [cur, nex] = verifyGameData(data, isVocab, vocabulary, expressions);
    const splitData = __splitText(cur, isVocab);
    const gameData = shuffle(splitData);
    dispatch({ type: "New_Round", gameData, data: nex, answer: cur });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, dispatch]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }) => {
      if (key === "ArrowLeft") return dispatch({ type: "Change_isVocab", isVocab: true });
      if (key === "ArrowRight")
        return dispatch({ type: "Change_isVocab", isVocab: false });
      const keyNum = Number(key);
      const level = keyNum !== 0 ? keyNum : 10; // if keyNum is 0, turn into 10
      if (!level) return;
      dispatch({ type: "Level_Change", level });
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp) => dispatch({ type: "Change_isVocab", isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  // want to show the level text on mounting (after handleGame runs) and load (cache) the images for later
  useEffect(() => {
    dispatch({ type: "Level_Change", level: 1 }); // show level on load
    __preloadImgs(BG_images); // load and cache images for use later
  }, [dispatch]);

  // handles what audio plays during each stage
  useEffect(() => {
    if (isFirstRun) return;
    // we're gonna reset all audios whenever stage changes
    const resetAudios = audios.map((audio) => audio.reset);
    __resetSounds(resetAudios);
    if (stage === 1) {
      flyByAud.current.play();
    } else if (stage === 2) {
      audios[level].track.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // GAME FUNCTIONS HERE
  function _handleClick() {
    // when user starts a round, log that event
    if (stage === 1) {
      googleEvent(title);
    }
    // move onto the next stage in the game
    dispatch({ type: "Stage_Change" });
    // if we're at the last stage, get new game data
    if (stage !== 4) return;
    handleGame();
  }

  return (
    <div
      className="speedsolver-container"
      onClick={_handleClick}
      style={{ fontFamily: font, backgroundImage }}
    >
      <AnimatedText show={curStage === "SHOW_LEVEL"} text={`Level ${level}`} />
      <AnimatedText show={curStage === "SHOW_READY"} text="Ready?" />
      {curStage === "ACTION" && (
        <Letters gameData={gameData} level={level} isVocab={isVocab} />
      )}
      <AnswerBox
        answer={answer}
        showBox={curStage === "SHOW_ANSWER_BOX"}
        showText={curStage === "SHOW_ANSWER_TEXT"}
        font={font}
      />
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

function Letters({ gameData, level, isVocab }) {
  const [isReverse, setReverse] = useState(false);
  const toggleReverse = () => setReverse((state) => !state);

  const [durations, largestDur, styles] = useMemo(() => {
    const [durations, largestDur] = __getDurations(level, gameData.length);
    const styles = __getStyles(gameData, level, isVocab);
    return [durations, largestDur, styles];
  }, [gameData, level, isVocab]);

  const springs = useSprings(
    gameData.length,
    durations.map((dur) => ({
      from: { x: 0 },
      x: 1,
      reverse: isReverse,
      reset: true,
      onRest: dur === largestDur ? toggleReverse : null,
      config: { duration: dur },
    }))
  );

  return springs.map((spring, i) => {
    const text = gameData[i];
    const { x, y, r } = styles[i];
    return (
      <animated.div
        key={i + text}
        children={text}
        className="letter"
        style={{
          transform: interpolate(
            [spring.x.interpolate(x), spring.x.interpolate(y), spring.x.interpolate(r)],
            (x, y, r) => `translate(${x}px, ${y}px) rotate(${r}deg)`
          ),
        }}
      />
    );
  });
}

// OTHER FUNCTIONS HERE
function __preloadImgs(images) {
  images.forEach((src) => {
    let image = new Image();
    image.src = src;
  });
}

function __getBGimg(level) {
  let img = level > 8 ? BG_rbw : level > 5 ? BG_bNr : level > 2 ? BG_pnk : BG_blu;
  return `url(${img})`;
}

function __splitText(text, isVocab) {
  const splitter = isVocab ? "" : " ";
  return text.split(splitter);
}

function __getDurations(level, count) {
  const maxDur = (11 - level) * 1000;
  const minDur = maxDur * 0.85;

  const durations = arrOfRandoNum(maxDur, minDur, count);
  const largestDur = Math.max(...durations);

  return [durations, largestDur];
}

function __getSideValues(isVocab) {
  const { innerHeight, innerWidth } = window;
  const height = 20; // 20vh
  const divHeight = (height / 100) * innerHeight;
  const multiplier = isVocab ? 1 : 3;
  const left = -(divHeight * multiplier);

  return {
    top: -divHeight,
    right: innerWidth,
    bottom: innerHeight,
    left,
  };
}

function __getBoolean() {
  return getRandoNum(100, 1) > 50;
}

function __getRotation(level) {
  const range = [0, 1];

  const minLevel = 6;
  if (level < minLevel) return { range, output: [0, 0] };

  const maxLevel = 10;
  const rotationDeg = 360;
  const maxNumOfRotations = 1.8;
  const denominator = maxLevel - minLevel;

  // higher levels; more rotation potential
  const lvlDiff = (maxLevel - level) / denominator;
  const currentLvlNumOfRotation = Math.abs(maxNumOfRotations - lvlDiff);
  const currentLvlRotationDeg = currentLvlNumOfRotation * rotationDeg;
  const rotate = getRandoNum(currentLvlRotationDeg);
  const rotation = [0, rotate];

  // highest levels can start rotated
  if (level < 9) {
    return { range, output: rotation };
  } else {
    return { range, output: shuffle(rotation) };
  }
}

function __getIncrementer(numerator, arrayLength, decimalAmt = 3) {
  return Number((numerator / arrayLength).toFixed(decimalAmt));
}

function __makeWavy(level, targetArr) {
  // only levels 3 and higher get waves added
  if (level < 3) return { range: [0, 1], output: targetArr };

  const multiplier = 3;
  const arrayLength = level * multiplier;
  const emptyArray = Array.from(Array(arrayLength + 1));

  const levelSq = level * level;
  const waveHeight = getRandoNum(levelSq * 1.1, levelSq * 0.2);

  const diffInTargetArr = Math.abs(targetArr[0] - targetArr[1]);
  const min = Math.min(...targetArr);

  const outputIncrementer = __getIncrementer(diffInTargetArr, arrayLength);
  const output = emptyArray.map((_, i) => {
    const base = min + i * outputIncrementer;
    return i % 2 ? base : base + (__getBoolean() ? waveHeight : -waveHeight);
  });

  const rangeIncremeter = __getIncrementer(1, arrayLength);
  const range = emptyArray.map((_, i, arr) => {
    if (arr.length - 1 === i) return 1;
    return i * rangeIncremeter;
  });

  return { range, output };
}

function __getXandY(max, start, end, level) {
  // normal = left=>right and up=>down; false = the reverse of either
  const isNormalDirection = __getBoolean();

  const tempOutput = arrOfRandoNum(max, 0, 2);
  const { range, output } = __makeWavy(level, tempOutput);

  const range1 = range;
  const output1 = output;

  const range2 = [0, 1];
  const output2 = isNormalDirection ? [start, end] : [end, start];

  return [
    { range: range1, output: output1 },
    { range: range2, output: output2 },
  ];
}

function __getStyles(gameData, level, isVocab) {
  const { top, right, bottom, left } = __getSideValues(isVocab);

  return gameData.map((_, i) => {
    // toggles back and forth so each axis gets equal lovin'
    const isXAxis = i % 2;

    // x and y styles
    let x, y;
    if (isXAxis) {
      [y, x] = __getXandY(top + bottom, left, right, level);
    } else {
      [x, y] = __getXandY(left + right, top, bottom, level);
    }

    // r styles
    const r = __getRotation(level);

    return {
      x: { range: x.range, output: x.output },
      y: { range: y.range, output: y.output },
      r: { range: r.range, output: r.output },
    };
  });
}

function __resetSounds(cbs) {
  cbs.forEach((cb) => cb());
}
