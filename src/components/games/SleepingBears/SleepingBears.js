import React, { useCallback, forwardRef } from "react";
import shuffle from "lodash/shuffle";
import { useSpring } from "react-spring";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { nextRoundData, changeIsVocab, getRandoNum } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./SleepingBears.css";

// CONSTANT VARIABLES
const getImgUrl = bearNum =>
  `https://res.cloudinary.com/dastrong/image/upload/TeacherSite/Media/SleepingBears/Bear-${bearNum}.png`;
const bearImgs = [getImgUrl(1), getImgUrl(2), getImgUrl(3), getImgUrl(4)];

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
});

function reducer(state, action) {
  const { type, data, isVocab, gameData } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData };
    default:
      return state;
  }
}

export default function SleepingBears(props) {
  // PROPS
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData } = state;
  const [refs] = useFitText(gameData.length, gameData, font, false);

  // SPRINGS
  // const springs = useSprings(gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
    const [[cur], nex] = nextRoundData(data, 1, isVocab, vocabulary, expressions);
    const gameData = isVocab ? __splitVocab(cur) : __splitExpression(cur);
    const shuffledGD = shuffle(gameData);
    dispatch({ type: "New_Round", data: nex, gameData: shuffledGD });
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
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

  // GAME FUNCTIONS HERE

  // CLASSES

  return (
    <div
      className="sleeping-bears-container"
      onClick={handleGame}
      style={{ fontFamily: font }}
    >
      {gameData.map((text, i) => (
        <Card key={i + text} i={i} text={text} ref={refs[i]} />
      ))}
    </div>
  );
}

// INNER COMPONENTS HERE
const Card = forwardRef(({ text, i }, ref) => {
  // const spring = useSpring({ opacity: showText ? 1 : 0 });

  return (
    <div className="sleeping-card">
      <div className="sleeping-card-front">
        <img src={bearImgs[i]} alt={"bear-" + (i + 1)} />
      </div>
      <div className="sleeping-card-back">
        <FitText ref={ref} text={text} />
      </div>
    </div>
  );
});

// OTHER FUNCTIONS HERE
function __splitVocab(text) {
  if (text.length > 4) {
    const splitSpots = __getSplitSpots(text.length);
    const splitText = text.split("");
    return splitSpots.map(num => splitText.splice(0, num));
  } else if (text.length < 4) {
    return Array.from(Array(4), (_, i) => text[i] || "");
  } else {
    return text.split("");
  }
}

function __splitExpression(text) {
  const split = text.split(" ");

  if (split.length === 1) return __splitVocab(text);

  if (split.length === 2) {
    const halved = split.map(string => __halvedWord(string));
    return halved.reduce((acc, cVal) => [...acc, ...cVal], []);
  }

  if (split.length === 3) {
    const longestWord = split.reduce((acc, cVal) => (acc > cVal ? acc : cVal), "");
    const otherWords = split.filter(word => word !== longestWord);
    const splitWord = __halvedWord(longestWord);
    return [...otherWords, ...splitWord];
  }

  if (split.length === 4) return split;

  if (split.length > 4) {
    // much more complicated
    const indexOfSpaces = text
      .split("")
      .reduce((acc, cVal, i) => (cVal === " " ? [...acc, i] : acc), []);
    const allIndexes = indexOfSpaces.push(text.length);
    console.log(allIndexes);
  }
}

// used to evenly split a string, when the string is longer than 4
// returns an array of shuffled numbers where the string should be sliced
function __getSplitSpots(strLength) {
  const boxCount = 4;
  let length = strLength;
  const splitSpots = Array.from(Array(boxCount), (_, i) => {
    const splitSpot = Math.ceil(length / (boxCount - i));
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
