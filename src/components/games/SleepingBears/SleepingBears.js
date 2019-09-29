import React, { useCallback, useEffect, forwardRef } from "react";
import shuffle from "lodash/shuffle";
import classNames from "classnames";
import { animated, useSpring } from "react-spring";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { changeIsVocab, arrOfRandoNum, verifyGameData } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import AnswerBox from "@Reusable/AnswerBox";
import "./SleepingBears.css";

// CONSTANT VARIABLES
const getImgUrl = bearNum =>
  `https://res.cloudinary.com/dastrong/image/upload/TeacherSite/Media/SleepingBears/Bear-${bearNum}.png`;
const bearImgs = [getImgUrl(1), getImgUrl(2), getImgUrl(3), getImgUrl(4)];

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  answer: "",
  boxes: 4,
  stage: 0,
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, boxes, answer } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData, stage: 0, answer };
    case "Stage_Change":
      const oldStage = state.stage;
      const newStage = oldStage === state.gameData.length * 2 + 1 ? 0 : oldStage + 1;
      return { ...state, stage: newStage };
    case "Box_Num_Change":
      return { ...state, boxes };
    default:
      return state;
  }
}

export default function SleepingBears(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData, answer, boxes, stage } = state;
  const [refs] = useFitText(gameData.length, gameData, font, true);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const [cur, nex] = verifyGameData(data, isVocab, vocabulary, expressions);
    const gameData = __splitString(cur, boxes);
    const shuffledGD = shuffle(gameData);
    const answer = [cur];
    dispatch({ type: "New_Round", data: nex, gameData: shuffledGD, answer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, boxes]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
      if (code.includes("Digit")) {
        const keyNum = Number(key);
        if (keyNum < 2 || keyNum > 4) return;
        dispatch({ type: "Box_Num_Change", boxes: keyNum });
      }
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => dispatch({ type: "Change_isVocab", isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxes]);

  // GAME FUNCTIONS HERE
  function _handleClick() {
    dispatch({ type: "Stage_Change" });
    if (gameData.length * 2 + 1 === stage) {
      handleGame();
    }
    if (stage === 0) {
      googleEvent(title);
    }
  }

  const showAnswerBox = gameData.length && gameData.length * 2 === stage;
  const showAnswerText = gameData.length * 2 + 1 === stage;

  return (
    <div
      className="sleeping-bears-container"
      onClick={_handleClick}
      style={{ fontFamily: font }}
    >
      <AnswerBox
        showBox={showAnswerBox}
        showText={showAnswerText}
        answer={answer}
        font={font}
      />
      <Bears gameData={gameData} refs={refs} stage={stage} />
    </div>
  );
}

// INNER COMPONENTS HERE
function Bears({ gameData, refs, stage }) {
  const show = stage < gameData.length * 2;
  const spring = useSpring({ opacity: show ? 1 : 0 });

  const cx = classNames(
    "sleeping-bear",
    { "sleeping-bear-3": gameData.length === 3 },
    { "sleeping-bear-2": gameData.length === 2 }
  );

  return (
    <animated.div className="sleeping-bears-container" style={spring}>
      {gameData.map((text, i) => (
        <Bear
          key={i + text}
          src={bearImgs[i]}
          text={text}
          ref={refs[i]}
          cx={cx}
          showText={i * 2 + 1 === stage}
        />
      ))}
    </animated.div>
  );
}

const Bear = forwardRef(({ src, text, cx, showText }, ref) => {
  const imgSpring = useSpring({ opacity: showText ? 0 : 1 });
  const textSpring = useSpring({ opacity: showText ? 1 : 0 });

  return (
    <div className={cx}>
      <animated.div className="sleeping-bear-front" style={imgSpring}>
        <img src={src} alt="bear" />
      </animated.div>
      <animated.div className="sleeping-bear-back" style={textSpring}>
        <FitText ref={ref} text={text} />
      </animated.div>
    </div>
  );
});

// OTHER FUNCTIONS HERE
// determines how we should split a string
function __splitString(text, numOfBoxes = 4) {
  const split = text.split(" ");
  const numOfWords = split.length;

  if (numOfWords === 1) return __splitWord(text, numOfBoxes);

  if (numOfWords === numOfBoxes) return split;

  if (numOfWords > numOfBoxes) return __getBestSplit(text, split, numOfBoxes);

  if (numOfWords === 2 && numOfBoxes === 4) {
    const halved = split.map(string => __halvedWord(string));
    return halved.reduce((acc, cVal) => [...acc, ...cVal], []);
  }

  // 1 less word than boxes
  // split the longest and keep the others the same
  const longestWord = __getLongestWord(split);
  const otherWords = split.filter(word => word !== longestWord);
  const splitWord = __halvedWord(longestWord);
  return [...otherWords, ...splitWord];
}

// splits a word evenly (or as best as it can)
function __splitWord(word, numOfBoxes) {
  if (word.length > numOfBoxes) {
    const splitSpots = __getSplitSpots(word.length, numOfBoxes);
    const splitText = word.split("");
    return splitSpots.map(num => splitText.splice(0, num).join(""));
  } else if (word.length < numOfBoxes) {
    return Array.from(Array(numOfBoxes), (_, i) => word[i] || "");
  } else {
    return word.split("");
  }
}

// returns the longest word given an array of strings
function __getLongestWord(words) {
  return words.reduce((acc, cVal) => (acc.length > cVal.length ? acc : cVal), "");
}

// calculates the best way to split a longer string evenly
function __getBestSplit(text, split, numOfBoxes) {
  const textLength = text.length;
  const numOfWords = split.length;

  // get the index of all the spaces (and the last character index)
  const indexOfSpaces = [
    ...text.split("").reduce((acc, cVal, i) => (cVal === " " ? [...acc, i] : acc), []),
    textLength,
  ];

  // get all possible slice combinations
  let sliceCombos = __getSliceCombinations(
    numOfBoxes - 1,
    numOfWords - 1,
    numOfWords - 1
  );

  // reduce the number of combinations if it gets over 400
  // ex) sentences with over 15 words in 4 boxes
  if (sliceCombos.length > 455) {
    const condenseIndexes = arrOfRandoNum(sliceCombos.length, 0, 150, true);
    sliceCombos = sliceCombos.filter((_, i) => condenseIndexes.includes(i));
  }

  // get the indexes of the text string for every slice combination
  const textSliceCombos = sliceCombos.map((arrOfIndexes, i) => {
    return arrOfIndexes.map(index => indexOfSpaces[index]);
  });

  // get the length of words for each potential slice combination
  const lengthOfWordsCombinations = textSliceCombos.map(indexArr => {
    return indexArr.reduce((acc, cVal, i) => {
      if (i === 0) return [cVal];
      return [...acc, cVal - indexArr[i - 1] - 1];
    }, []);
  });

  // get the lowest difference between the longest and shortest strings
  const minAndMaxDiffs = lengthOfWordsCombinations.map(lengths => {
    const { diff } = __getMinMaxAndDiff(lengths);
    return diff;
  });

  // get the lowest difference
  const minDiff = Math.min(...minAndMaxDiffs);

  // get the index of the first combo that has that diff
  const targetIndex = minAndMaxDiffs.findIndex(diff => diff === minDiff);

  // get the combo that matches the correct index
  const bestSliceCombo = textSliceCombos[targetIndex];

  // return an array of accurately sliced portions of the original text string
  return bestSliceCombo.map((slicer, i, arr) =>
    text.substring(i ? arr[i - 1] : 0, slicer)
  );
}

// returns the max, min, and difference values of an array of numbers
function __getMinMaxAndDiff(arr) {
  const max = arr.reduce((a, b) => Math.max(a, b));
  const min = arr.reduce((a, b) => Math.min(a, b));
  const diff = Math.abs(max - min);
  return { max, min, diff };
}

// used to evenly split a string, when the string is longer than 4
// returns an array of shuffled numbers where the string should be sliced
function __getSplitSpots(strLength, numOfBoxes) {
  let length = strLength;
  const splitSpots = Array.from(Array(numOfBoxes), (_, i) => {
    const splitSpot = Math.ceil(length / (numOfBoxes - i));
    length -= splitSpot;
    return splitSpot;
  });
  return shuffle(splitSpots);
}

// split a word into equal parts
// returns an array of both halves of the string
function __halvedWord(word) {
  const slicePos = Math.floor(word.length / 2);
  const start = word.substring(0, slicePos);
  const end = word.substring(slicePos);
  return [start, end];
}

// returns an array of incrementing numbers from 0 until count
function __getIncreNumArray(count) {
  return Array.from(Array(count), (_, i) => i);
}

// returns an array containing arrays of every possible combination of slice positions
function __getSliceCombinations(numOfSlots, rangeOfNum, lastIndex) {
  const possibleNums = __getIncreNumArray(rangeOfNum);
  const end = possibleNums.length;

  let combs = [];

  for (let i = 0; i < end; i++) {
    if (numOfSlots === 1) {
      combs.push([i, lastIndex]);
    } else {
      for (let j = i + 1; j < end; j++) {
        if (numOfSlots === 2) {
          combs.push([i, j, lastIndex]);
        } else {
          for (let k = j + 1; k < end; k++) {
            combs.push([i, j, k, lastIndex]);
          }
        }
      }
    }
  }

  return combs;
}
