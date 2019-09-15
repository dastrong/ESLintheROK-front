import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useAudio from "../../hooks/useAudio";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, getRandoNum, changeIsVocab } from "../../helpers/gameUtils";
import FitText from "../reusable/FitText";
import pubgStats from "../../helpers/pubgStats";
import "./BattleGround.css";

// CONSTANT VARIABLES
const baseURL = "https://res.cloudinary.com/dastrong";
const addURL = "/image/upload/f_auto/v1543130357/TeacherSite/Media/BattleGround/images/";
const countdownAudioURL = `${baseURL}/video/upload/f_auto/v1543135345/TeacherSite/Media/BattleGround/countdownAudio.mp3`;
const backgroundURL = `${baseURL}/image/upload/f_auto/v1543135348/TeacherSite/Media/BattleGround/pubgMap.jpg`;
const numOfText = 4;
const reset = { stage: 0, countdown: 0 };

const init = data => ({
  data: shuffle(data),
  gameData: [],
  items: [],
  isVocab: true,
  scaled: 0,
  ...reset,
});

function reducer(state, action) {
  const { type, data, gameData, items, isVocab } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, data, gameData, items, ...reset };
  if (type === "Countdown") return { ...state, countdown: state.countdown - 1 };
  if (type === "Countdown_Start") return { ...state, countdown: 10 };
  if (type === "Countdown_Setup") return { ...state, stage: 1 };
  if (type === "Countdown_Stop")
    return { ...state, stage: 2, countdown: 0, scaled: state.scaled + 0.03 };
  if (type === "Show_Items") return { ...state, stage: 3 };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state, reset);
  return state;
}

export default function BattleGround(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // AUDIO
  const [CountAudio, resetCountAudio] = useAudio(countdownAudioURL);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, gameData, items, isVocab, scaled, stage, countdown } = state;
  const [refs] = useFitText(4, gameData, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    resetCountAudio();
    const [cur, nex] = nextRoundData(data, numOfText, isVocab, vocabulary, expressions);
    const newItems = shuffle([0, 1, 2, 3]).map(
      num => pubgStats[num][getRandoNum(pubgStats[num].length - 1)]
    );
    dispatch({ type: "New_Round", data: nex, gameData: cur, items: newItems });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, dispatch]);
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
  useEffect(() => {
    if (stage !== 1) return;
    const id = setTimeout(() => dispatch({ type: "Countdown_Start" }), 4500);
    return () => clearTimeout(id);
  }, [stage, dispatch]);

  useEffect(() => {
    if (countdown < 1) return;
    const id =
      countdown > 1
        ? setTimeout(() => dispatch({ type: "Countdown" }), 1000)
        : setTimeout(() => dispatch({ type: "Countdown_Stop" }), 1000);
    return () => clearTimeout(id);
  }, [countdown, dispatch]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(() => {
    if (!CountAudio.current) return;
    if (stage === 0) {
      googleEvent(title);
      CountAudio.current.currentTime = 0;
      CountAudio.current.play();
      return dispatch({ type: "Countdown_Setup" });
    }
    if (stage === 1) return;
    if (stage === 2) return dispatch({ type: "Show_Items" });
    if (stage === 3) return handleGame();
  }, [stage, handleGame, CountAudio, title, dispatch]);

  return (
    <div
      className="battleground-container"
      onClick={_handleClick}
      style={{ fontFamily: font }}
    >
      <div
        className="blue-zone"
        style={{
          transform: `scale(${stage === 1 ? 0.97 : 1}`,
          transitionDelay: `${stage === 1 ? 8 : 0}s`,
        }}
      />
      <img
        src={backgroundURL}
        alt="map background"
        style={{
          transform: `scale(${1 + scaled}) translate(-${scaled * 12}vw, ${scaled}vh)`,
        }}
      />
      <Text gameData={gameData} stage={stage} refs={refs} isVocab={isVocab} />
      <Items items={items} stage={stage} />
      {countdown && <div className="countdown-timer">{countdown}</div>}
    </div>
  );
}

// INNER COMPONENTS HERE
const Text = ({ gameData, stage, refs }) => (
  <div className="corner-holder">
    {gameData.map((text, i) => (
      <TransitionComp key={text + i} isIn={stage !== 3}>
        <div className="corner">
          <FitText text={text} ref={refs[i]} />
        </div>
      </TransitionComp>
    ))}
  </div>
);

const Items = ({ items, stage }) => (
  <div className="corner-holder">
    {items.map(({ name, points }, i) => {
      const color = points.includes("-") ? "red" : "green";
      return (
        <TransitionComp key={name + i} isIn={stage === 3}>
          <div
            className="corner cornersItem"
            style={{ color, backgroundImage: `url(${baseURL + addURL + name}.png)` }}
          >
            {points}
          </div>
        </TransitionComp>
      );
    })}
  </div>
);

const TransitionComp = ({ isIn, children }) => (
  <CSSTransition timeout={0} in={isIn} classNames="cornersItem">
    {children}
  </CSSTransition>
);
