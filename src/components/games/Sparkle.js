import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { newGoogEvent } from "../../helpers/phase2helpers";
import TextBox from "../reusable/TextBox";
import "./Sparkle.css";

const init = data => ({
  compressor: 0.6,
  data: shuffle(data),
  text: "",
  timer: 15,
  timeRemaining: 15,
  isTimerRunning: false,
});

function reducer(state, action) {
  const { type, compressor, data, text, timer } = action;
  switch (type) {
    case "Compressor":
      return { ...state, compressor };
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "New_Round":
      return { ...state, isTimerRunning: true, data, text, timeRemaining: state.timer };
    case "Timer_Change":
      return { ...state, timer, timeRemaining: timer };
    case "Timer_Pause":
      return {
        ...state,
        isTimerRunning: state.timeRemaining > 0 ? !state.isTimerRunning : false,
      };
    case "Timer_Countdown":
      return {
        ...state,
        isTimerRunning: state.timeRemaining > 1,
        timeRemaining: state.timeRemaining - 1,
      };
    default:
      return state;
  }
}

export default function Sparkle(props) {
  const { title, isMenuOpen, font, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, expressions);
  const { compressor, data, text, timer, timeRemaining, isTimerRunning } = state;

  // HANDLE GAME
  const handleGame = useCallback(() => {
    newGoogEvent(title);
    const [text, ...rest] = data;
    const newData = rest.length < 1 ? shuffle(expressions) : rest;
    dispatch({ type: "New_Round", text, data: newData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  // EVENT HANDLERS
  const reqDep = [dispatch, isMenuOpen, compressor];
  const keysCB = useCallback(
    ({ keyCode }) => {
      if (keyCode === 32 || keyCode === 13) return handleGame();
      if (keyCode === 39) return __increaseTimer(dispatch, timer);
      if (keyCode === 37) return __decreaseTimer(dispatch, timer);
    },
    [handleGame, dispatch, timer]
  );
  const scrollCB = useCallback(
    compressorChange => {
      compressorChange < 0
        ? __increaseTimer(dispatch, timer)
        : __decreaseTimer(dispatch, timer);
    },
    [dispatch, timer]
  );
  useKeys(keysCB, ...reqDep);
  useScroll(scrollCB, ...reqDep);

  useEffect(() => {
    if (!isTimerRunning) return;
    const id = setInterval(() => dispatch({ type: "Timer_Countdown" }), 1000);
    return () => clearInterval(id);
  }, [dispatch, isTimerRunning]);

  return (
    <div className="spark-container" style={{ fontFamily: font }}>
      <div onClick={handleGame}>
        <CSSTransition in={!!timeRemaining} timeout={0} classNames="textBox">
          <TextBox
            text={text}
            width="100%"
            height="85vh"
            compressor={compressor}
            gameReady={!!text}
          />
        </CSSTransition>
      </div>
      <Timer timeRemaining={timeRemaining} timer={timer} dispatch={dispatch} />
    </div>
  );
}

const Timer = ({ timeRemaining, timer, dispatch }) => {
  const width = ((timer - timeRemaining) / (timer - 1)) * 100 + "%";
  return (
    <div className="timer" onClick={() => dispatch({ type: "Timer_Pause" })}>
      <div className="timer-bar" style={{ width }} />
      <div className="timer-text">{timeRemaining}</div>
    </div>
  );
};

function __increaseTimer(dispatch, timer) {
  if (timer >= 20) return;
  dispatch({ type: "Timer_Change", timer: timer + 1 });
}

function __decreaseTimer(dispatch, timer) {
  if (timer <= 5) return;
  dispatch({ type: "Timer_Change", timer: timer - 1 });
}
