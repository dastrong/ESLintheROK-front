import React, { useCallback, forwardRef } from "react";
import shuffle from "lodash/shuffle";
// import classNames from "classnames";
// import {useSpring} from "react-spring"
// import { TransitionGroup, CSSTransition } from "react-transition-group";
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
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData } = state;
  const [refs] = useFitText(gameData.length, gameData, font, false);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
    const [cur, nex] = nextRoundData(data, 4, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", data: nex, gameData: cur });
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
const Card = forwardRef(({ text, i }, ref) => (
  <div className="sleeping-card">
    <div className="sleeping-card-front">
      <img src={bearImgs[i]} alt={"bear-" + (i + 1)} />
    </div>
    <div className="sleeping-card-back">
      <FitText ref={ref} text={text} />
    </div>
  </div>
));

// OTHER FUNCTIONS HERE
