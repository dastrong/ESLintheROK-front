import React, { useCallback, useEffect, forwardRef } from "react";
import { animated, useSpring, config } from "react-spring";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { nextRoundData, arrOfRandoNum } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./WhatsMissing.css";

// CONSTANT VARIABLES
const widthsAndHeights = [95, 45, 28];
const maxAngle = 10;
const stages = ["SHOW_INFO", "SHOW_ALL", "SHOW_SOME", "SHOW_MISSING"];

const init = data => ({
  data: shuffle(data),
  allText: [],
  missingText: [],
  otherText: [],
  numOfMissing: 1,
  numOfWords: 6,
  stage: 0,
});

function reducer(state, action) {
  const {
    type,
    data,
    allText,
    missingText,
    otherText,
    numOfMissing,
    numOfWords,
  } = action;
  const { stage } = state;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "New_Round":
      return { ...state, data, allText, missingText, otherText, stage: 0 };
    case "Change_Stage":
      return { ...state, stage: stage === stages.length - 1 ? 0 : stage + 1 };
    case "Change_NumOfMissing":
      return { ...state, numOfMissing };
    case "Change_NumOfWords":
      return { ...state, numOfWords };
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
  const {
    data,
    allText,
    missingText,
    otherText,
    numOfMissing,
    numOfWords,
    stage,
  } = state;
  const curStage = stages[stage];

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const missingTextIndexes = arrOfRandoNum(numOfWords - 1, 0, numOfMissing, true);
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
    const allText = shuffle(cur);
    dispatch({ type: "New_Round", data: nex, allText, otherText, missingText });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, numOfWords, numOfMissing]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ code, key }) => {
      if (code.includes("Digit")) {
        const keyNum = Number(key);
        if (!keyNum) return;
        if (keyNum <= 3) {
          // 1-3 changes the number of missing
          dispatch({ type: "Change_NumOfMissing", numOfMissing: keyNum });
        } else {
          // 4-9 changes the number of words allowed
          dispatch({ type: "Change_NumOfWords", numOfWords: keyNum });
        }
      }
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfMissing, numOfWords]);

  useEffect(() => {
    if (stage !== stages.length - 1) return;
    googleEvent(title);
  }, [stage, title]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(() => dispatch({ type: "Change_Stage" }), [dispatch]);

  // choose the correct set of words
  const words =
    curStage === "SHOW_INFO"
      ? null
      : curStage === "SHOW_ALL"
      ? allText
      : curStage === "SHOW_SOME"
      ? otherText
      : missingText;

  return (
    <div
      className="whats-missing-container"
      onClick={_handleClick}
      style={{ fontFamily: font }}
    >
      <MissingText
        isIn={curStage === "SHOW_INFO"}
        numOfMissing={numOfMissing}
        font={font}
      />
      {words && <Cards words={words} colors={colors} font={font} />}
    </div>
  );
}

// INNER COMPONENTS HERE
function MissingText({ isIn, numOfMissing, font }) {
  const [[ref]] = useFitText(1, numOfMissing, font, true);

  const style = useSpring({
    transform: `scale(${isIn ? 1 : 0})`,
    config: config[isIn ? "wobbly" : "default"],
  });

  return (
    <animated.div className="whats-missing-text" style={style}>
      <FitText ref={ref} text={`${numOfMissing} Missing!`} />
    </animated.div>
  );
}

function Cards({ words, colors, font }) {
  const [refs] = useFitText(words.length, words, font, true);

  const [widths, height] = getWandH(words.length);
  const shuffledColors = shuffle(colors);
  const transforms = arrOfRandoNum(maxAngle, -maxAngle, words.length, false);

  return words.map((word, i) => (
    <Card
      key={word + i}
      ref={refs[i]}
      text={word}
      color={shuffledColors[i]}
      height={`${height}vh`}
      width={`${widths[i]}vw`}
      transform={`rotate(${transforms[i]}deg)`}
    />
  ));
}

const Card = forwardRef(({ text, color, height, width, transform }, ref) => (
  <div className="whats-missing-card" style={{ color, transform, height, width }}>
    <FitText ref={ref} text={text} />
  </div>
));

// OTHER FUNCTIONS HERE
// returns an array of widths dependant on the number of words and their heights
function getWandH(numOfWords) {
  const columns = getColumns(numOfWords);
  const rows = getRows(numOfWords, columns);
  const height = getValue(rows);

  const rowIndexes = Array.from(Array(rows), (_, i) => i);
  const numOfRowsAffected = getNumOfRowsToExpand(numOfWords, columns);

  const targetRowIndexes = arrOfRandoNum(rows - 1, 0, numOfRowsAffected, true);
  const sortedTargets = targetRowIndexes.sort((a, b) => a - b);

  const widths = rowIndexes.reduce((acc, cVal) => {
    const columnsUsed = sortedTargets.includes(cVal) ? columns - 1 : columns;
    const tempArr = Array.from(Array(columnsUsed), () => getValue(columnsUsed));
    return [...acc, ...tempArr];
  }, []);

  return [widths, height];
}

// gets the number of columns needed
function getColumns(numOfWords) {
  if (numOfWords <= 3) return 1;
  if (numOfWords <= 6) return 2;
  return 3;
}

// gets the number of rows needed
function getRows(numOfWords, columns) {
  return Math.ceil(numOfWords / columns);
}

// how many rows will need expanded cards
function getNumOfRowsToExpand(numOfWords, columns) {
  const rem = numOfWords % columns;
  return !rem ? 0 : columns - rem;
}

// gets the height/width for a card
function getValue(length) {
  return widthsAndHeights[length - 1];
}
