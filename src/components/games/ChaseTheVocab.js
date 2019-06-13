import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import FlipMove from "react-flip-move";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { newGoogEvent } from "../../helpers/phase2helpers";
import CardBlock from "../reusable/CardBlock";
import "./ChaseTheVocab.css";

const init = data => ({
  compressor: 0.6,
  data: shuffle(data),
  gameData: [],
  round: 0,
  color: 2,
  clickedIDs: [],
  shuffDuration: 2000,
  shuffBuffer: 500,
  shuffRounds: 5,
  isAnimating: true,
  isShuffleDone: false,
});

function reducer(state, action) {
  const { type, compressor, data, gameData, color, id, ...settings } = action;
  switch (type) {
    case "Compressor":
      return { ...state, compressor };
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "New_Round":
      return {
        ...state,
        clickedIDs: [],
        isAnimating: false,
        isShuffleDone: false,
        round: 0,
        data,
        gameData,
      };
    case "Add_Click_ID":
      return { ...state, clickedIDs: [...state.clickedIDs, id] };
    case "Change_Settings":
      return { ...state, ...settings };
    case "Change_Color":
      return { ...state, color };
    case "Start_Animating":
      return { ...state, isAnimating: true };
    case "Shuffle":
      return { ...state, gameData: shuffle(gameData), round: state.round + 1 };
    case "Shuffle_Stop":
      return { ...state, isAnimating: false, isShuffleDone: true };
    default:
      return state;
  }
}

export default function ChaseTheVocab(props) {
  const { title, isMenuOpen, font, vocabulary, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
  const {
    compressor,
    data,
    gameData,
    clickedIDs,
    color,
    round,
    isAnimating,
    isShuffleDone,
    shuffBuffer,
    shuffDuration,
    shuffRounds,
  } = state;

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (isShuffleDone && clickedIDs.length !== 9) return;
    if (isAnimating || clickedIDs.length === 9) {
      newGoogEvent(title);
      const gameData = data.slice(0, 9).map((text, i) => ({ text, id: i }));
      const restData = data.length < 18 ? shuffle(vocabulary) : data.slice(9);
      dispatch({ type: "New_Round", gameData, data: restData });
    } else {
      dispatch({ type: "Start_Animating" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isShuffleDone, isAnimating, clickedIDs]);
  useHandleGame(handleGame, didUpdate);

  // EVENT HANDLERS
  const reqDep = [dispatch, isMenuOpen, compressor];
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 32 || keyCode === 13) return handleGame();
      // c was clicked; change the cards background color
      if (keyCode === 67) {
        const colorIdx = color < colors.length - 1 ? color + 1 : 0;
        return dispatch({ type: "Change_Color", color: colorIdx });
      }
      // a number key was clicked; change difficulty
      if (code.includes("Digit")) {
        const keyNum = Number(key);
        if (!keyNum) return;
        const shuffBuffer = __changeDelay(keyNum);
        const shuffRounds = __changeRound(keyNum);
        const shuffDuration = __changeSpeed(keyNum);
        dispatch({ type: "Change_Settings", shuffBuffer, shuffDuration, shuffRounds });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleGame, dispatch, color]
  );
  useKeys(keysCB, ...reqDep);
  useScroll(null, ...reqDep);

  const keyDeps = [data, color, isAnimating, isShuffleDone, clickedIDs];
  const handleReset = useCallback(handleGame, keyDeps);

  // handles the shuffling
  useEffect(() => {
    if (!isAnimating) return;
    if (round === shuffRounds) return;
    const time = shuffDuration + shuffBuffer;
    const id =
      round === 0
        ? setTimeout(() => dispatch({ type: "Shuffle", gameData }), 1000)
        : setTimeout(() => dispatch({ type: "Shuffle", gameData }), time);
    return () => clearTimeout(id);
  }, [dispatch, isAnimating, gameData, round, shuffRounds, shuffDuration, shuffBuffer]);

  // stops the shuffling
  useEffect(() => {
    if (round < shuffRounds) return;
    const time = shuffDuration + shuffBuffer;
    const id = setTimeout(() => dispatch({ type: "Shuffle_Stop" }), time);
    return () => clearTimeout(id);
  }, [dispatch, round, shuffRounds, shuffDuration, shuffBuffer]);

  // resets the game automatically when all cards have been clicked
  useEffect(() => {
    if (clickedIDs.length !== 9) return;
    const id = setTimeout(handleReset, 1000);
    return () => clearTimeout(id);
  }, [dispatch, clickedIDs, handleReset]);

  const _handleBoxClick = useCallback(
    e => {
      if (!isShuffleDone) return;
      const id = Number(e.target.id);
      if (clickedIDs.includes(id)) return;
      dispatch({ type: "Add_Click_ID", id });
    },
    [dispatch, isShuffleDone, clickedIDs]
  );

  const boxClass = classNames("box box-chase box-grid", { "box-shrink": isAnimating });
  const numClass = classNames(boxClass, "box-number", {
    "box-number-show": isShuffleDone,
  });

  return (
    <FlipMove
      onClick={handleGame}
      className="chase-container"
      style={{ fontFamily: font }}
      duration={!isAnimating && !isShuffleDone ? 500 : shuffDuration}
    >
      {gameData.map(({ text, id }, i) => (
        <div key={id}>
          <CSSTransition
            in={isAnimating || (isShuffleDone && !clickedIDs.includes(i))}
            timeout={0}
            classNames="box-number"
          >
            <CardBlock
              text={i + 1}
              compressor={compressor}
              boxClass={numClass}
              backColor={colors[color]}
              id={i}
              handleClick={_handleBoxClick}
            />
          </CSSTransition>
          <CardBlock
            classNames="box"
            text={text}
            compressor={compressor}
            boxClass={boxClass}
            backColor={!clickedIDs.includes(i) ? colors[color] : "#676767"}
          />
        </div>
      ))}
    </FlipMove>
  );
}

function __changeSpeed(num) {
  const base = 2000;
  const increaseMultiplier = (2000 - 500) / 4;
  const decreaseMultiplier = (5000 - 2000) / 4;
  if (num >= 5) return base - increaseMultiplier * (num - 5);
  if (num < 5) return base + decreaseMultiplier * (5 - num);
}

function __changeDelay(num) {
  return 1000 - num * 100;
}

function __changeRound(num) {
  return num < 4 ? 3 : num;
}
