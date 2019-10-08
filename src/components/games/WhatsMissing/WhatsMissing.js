import React, { useCallback, forwardRef } from "react";
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
import { nextRoundData, arrOfRandoNum, getRandoNum } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./WhatsMissing.css";

// CONSTANT VARIABLES
const widths = [100, 50, 33.3, 25];
const heights = [50, 33.3, 25];
const stages = ["SHOW_ALL", "SHOW_SOME", "SHOW_MISSING"];

const init = data => ({
  data: shuffle(data),
  allText: [],
  missingText: [],
  otherText: [],
  missingMax: 1,
  numOfWords: 9,
  stage: 0,
});

function reducer(state, action) {
  const { type, data, allText, missingText, otherText } = action;
  const { stage } = state;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "New_Round":
      return { ...state, data, allText, missingText, otherText, stage: 0 };
    case "Change_Stage":
      return { ...state, stage: stage === 2 ? 0 : stage + 1 };
    default:
      return state;
  }
}

export default function WhatsMissing(props) {
  const { title, isMenuOpen, font, vocabulary, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
  const { data, allText, missingText, otherText, missingMax, numOfWords, stage } = state;
  const curStage = stages[stage];

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
    const missingTextIndexes = arrOfRandoNum(numOfWords - 1, 0, missingMax, true);
    const [cur, nex] = nextRoundData(data, numOfWords, true, vocabulary);
    const { missingText, otherText } = cur.reduce(
      (acc, cVal, i) => {
        if (missingTextIndexes.includes(i)) {
          acc.missingText.push(cVal);
        } else {
          acc.otherText.push(cVal);
        }
        return acc;
      },
      { otherText: [], missingText: [] }
    );
    dispatch({
      type: "New_Round",
      data: nex,
      allText: shuffle(cur),
      otherText,
      missingText,
    });
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  console.log(state);

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
  const handleClick = () => {
    dispatch({ type: "Change_Stage" });
  };

  // CLASSES

  const words =
    curStage === "SHOW_ALL"
      ? allText
      : curStage === "SHOW_SOME"
      ? otherText
      : missingText;

  return (
    <div
      className="whats-missing-container"
      onClick={handleClick}
      style={{ fontFamily: font }}
    >
      {words.length && <Cards words={words} colors={colors} font={font} />}
    </div>
  );
}

// INNER COMPONENTS HERE
function Cards(props) {
  const { words, colors, font } = props;

  const [refs] = useFitText(words.length, words, font, true);

  const transform = "rotate(23deg)";

  return words.map((word, i) => {
    return (
      <Card
        key={word + i}
        ref={refs[i]}
        text={word}
        color={colors[i]}
        transform={transform}
      />
    );
  });
}

const Card = forwardRef((props, ref) => {
  const { text, color, transform } = props;
  return (
    <div className="whats-missing-card" style={{ color, transform }}>
      <FitText ref={ref} text={text} />
    </div>
  );
});

// OTHER FUNCTIONS HERE
// gets the number of columns needed
function getColumns(numOfWords) {
  if (numOfWords < 4) return 1;
  if (numOfWords < 9) return 2;
  return 3;
}

// gets the number of rows needed
function getRows(numOfWords, columns) {
  return Math.ceil(numOfWords / columns);
}

//
function getNumNeededToBeExpanded(numOfWords, columns) {
  if (numOfWords === 5 || numOfWords === 7) return 1;
  return 0;
  // return columns - (numOfWords % columns);
}

//
function getExpandedIndex(numOfWords, columns) {
  const maxHalfIndex = Math.floor(numOfWords / columns);
  const index = getRandoNum(maxHalfIndex);
  return index * 2;
}

// gets the width of the boxs
function getWidth(widths, columns) {
  return widths[columns - 1];
}

// gets the height of the boxs
function getHeight(heights, rows) {
  return heights[rows - 2];
}

// gets the angle across the parent box
function getAngle(height, width) {
  return Math.atan(height / width) * (180 / Math.PI);
}
