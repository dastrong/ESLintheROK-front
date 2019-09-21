import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import FlipMove from "react-flip-move";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import FitText from "@Reusable/FitText";
import "./ChaseTheVocab.css";
import "@Reusable/Box.css";

const init = data => ({
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
  const { type, data, gameData, color, id, ...settings } = action;
  switch (type) {
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
      // bail out of dispatch if already clicked
      if (state.clickedIDs.includes(id)) return state;
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
  const [refs] = useFitText(9, gameData, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const gameData = data.slice(0, 9).map((text, i) => ({ text, id: i }));
    const restData = data.length < 18 ? shuffle(vocabulary) : data.slice(9);
    dispatch({ type: "New_Round", gameData, data: restData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isShuffleDone, isAnimating, clickedIDs]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
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
    [dispatch, color]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // USE EFFECTS HERE
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

  useEffect(() => {
    if (round < shuffRounds) return;
    const time = shuffDuration + shuffBuffer;
    const id = setTimeout(() => dispatch({ type: "Shuffle_Stop" }), time);
    return () => clearTimeout(id);
  }, [dispatch, round, shuffRounds, shuffDuration, shuffBuffer]);

  useEffect(() => {
    if (clickedIDs.length !== 9) return;
    const id = setTimeout(handleGame, 2000);
    return () => clearTimeout(id);
  }, [dispatch, clickedIDs, handleGame]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(() => {
    googleEvent(title);
    dispatch({ type: "Start_Animating" });
  }, [dispatch, title]);

  const _handleBoxClick = useCallback(
    e => dispatch({ type: "Add_Click_ID", id: Number(e.target.id) }),
    [dispatch]
  );

  // CLASSES
  const boxClass = classNames("box box-chase box-grid", { "box-shrink": isAnimating });
  const numClass = classNames(boxClass, "box-num", { "box-num-show": isShuffleDone });

  return (
    <FlipMove
      onClick={!isAnimating && !isShuffleDone ? _handleClick : null}
      className="chase-container"
      style={{ fontFamily: font }}
      duration={!isAnimating && !isShuffleDone ? 500 : shuffDuration}
    >
      {gameData.map(({ text, id }, i) => {
        const isClicked = clickedIDs.includes(i);
        return (
          <div key={id}>
            <CSSTransition
              in={isAnimating || (isShuffleDone && !isClicked)}
              timeout={0}
              classNames="box"
            >
              <div
                id={i}
                className={numClass}
                style={{ backgroundColor: colors[color] }}
                onClick={isShuffleDone ? _handleBoxClick : null}
              >
                {i + 1}
              </div>
            </CSSTransition>
            <div
              className={boxClass}
              style={{
                backgroundColor: !isClicked ? colors[color] : "#676767",
              }}
            >
              <FitText text={text} ref={refs[i]} />
            </div>
          </div>
        );
      })}
    </FlipMove>
  );
}

// OTHER FUNCTIONS HERE
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
