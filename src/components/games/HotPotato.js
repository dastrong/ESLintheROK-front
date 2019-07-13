import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useAudio from "../../hooks/useAudio";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useFirstRun from "../../hooks/useFirstRun";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, changeIsVocab } from "../../helpers/gameUtils";
import FitText from "../reusable/FitText";
import "./HotPotato.css";

const baseURL = "https://res.cloudinary.com/dastrong/";
const URLs = {
  bubbling: `${baseURL}video/upload/v1540601372/TeacherSite/Media/HotPotato/Bubbling.mp3`,
  scream: `${baseURL}video/upload/v1540601372/TeacherSite/Media/HotPotato/Scream.mp3`,
  song: `${baseURL}video/upload/v1540601372/TeacherSite/Media/HotPotato/HotPotato.mp3`,
  sizzle: `${baseURL}video/upload/v1540601372/TeacherSite/Media/HotPotato/Sizzle.mp3`,
  boiling: `${baseURL}image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoesBoiling.gif`,
  dancing: `${baseURL}image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoDancing.gif`,
  cooling: `${baseURL}image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoCooling.gif`,
};
const reset = { numOfText: 1, stage: 1, countdown: 0 };

const init = data => ({
  data: shuffle(data),
  gameData: [],
  isVocab: true,
  ...reset,
});

function reducer(state, action) {
  const { type, data, gameData, numOfText, isVocab } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data), ...reset };
  if (type === "New_Round") return { ...state, data, gameData, stage: 1, countdown: 0 };
  if (type === "Countdown") return { ...state, countdown: state.countdown - 1 };
  if (type === "Countdown_Start") return { ...state, countdown: 3 };
  if (type === "Countdown_Stop") return { ...state, countdown: 0, stage: 2 };
  if (type === "Show_Text") return { ...state, stage: 3 };
  if (type === "Change_NumOfText") return { ...state, ...reset, numOfText };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state, reset);
  return state;
}

export default function HotPotato(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // AUDIO
  const [Bubbling, resetBubb] = useAudio(URLs.bubbling);
  const [Scream, resetScream] = useAudio(URLs.scream);
  const [Sizzle, resetSizzle] = useAudio(URLs.sizzle);
  const [Song, resetSong] = useAudio(URLs.song, true);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, gameData, isVocab, numOfText, stage, countdown } = state;
  const [refs] = useFitText(gameData.length, gameData, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // google events are sent when user starts a round, not here
    // stop all sounds when game resets
    resetSounds(resetBubb, resetScream, resetSizzle, resetSong);
    const [cur, nex] = nextRoundData(data, numOfText, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", gameData: cur, data: nex });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, numOfText, isVocab, dispatch]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
      if (code.includes("Digit")) {
        const num = Number(key);
        if (!num || num > 3 || !isVocab || num === numOfText) return;
        dispatch({ type: "Change_NumOfText", numOfText: num });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stage, isVocab, numOfText]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => dispatch({ type: "Change_isVocab", isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  // updates game if numOfText changes
  useEffect(() => {
    if (isFirstRun) return;
    // avoid unnecessary call if we're switching to expressions
    // remember - there can only be one expression, but multiple vocabs
    if (!isVocab) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfText]);

  useEffect(() => {
    if (countdown < 1) return;
    const id =
      countdown > 1
        ? setTimeout(() => dispatch({ type: "Countdown" }), 1000)
        : setTimeout(() => dispatch({ type: "Countdown_Stop" }), 1000);
    return () => clearTimeout(id);
  }, [dispatch, countdown]);

  useEffect(() => {
    if (countdown !== 1) return;
    Scream.current.currentTime = 0.3;
    Scream.current.play();
  }, [countdown, Scream]);

  useEffect(() => {
    if (stage !== 2) return;
    const id = __fadeIn(Song);
    return () => clearInterval(id);
  }, [stage, Song]);

  useEffect(() => {
    if (stage !== 3) return;
    const id = __fadeOut(Song, Sizzle);
    return () => clearInterval(id);
  }, [stage, Song, Sizzle]);

  // not wrapping since it's always going to update anyways
  function _handleClick() {
    // wait for useAudio to add audio to ref
    if (!Bubbling.current) return;
    if (countdown > 0) return;
    if (stage === 1) {
      Bubbling.current.currentTime = 0.2;
      Bubbling.current.play();
      googleEvent(title);
      return dispatch({ type: "Countdown_Start" });
    }
    if (stage === 2) {
      Sizzle.current.play();
      return dispatch({ type: "Show_Text" });
    }
    if (stage === 3) return handleGame();
  }

  return (
    <div
      className="hotpotato-container"
      onClick={_handleClick}
      style={{ fontFamily: font }}
    >
      <PotatoSection
        isIn={stage === 1}
        className="hotpotato-countdown"
        src={URLs.boiling}
        alt="potatoes-boiling"
      />
      <PotatoSection
        isIn={stage === 2}
        className="hotpotato-active"
        src={URLs.dancing}
        alt="potato-dancing"
      />
      <PotatoSection
        isIn={stage === 3}
        className="hotpotato-finished"
        src={URLs.cooling}
        alt="potato-finished"
      >
        <Text
          gameData={gameData}
          refs={refs}
          isIn={stage === 3}
          isVocab={isVocab}
          numOfText={numOfText}
        />
      </PotatoSection>
      {countdown && <span className="countdown-timer">{countdown}</span>}
    </div>
  );
}

const PotatoSection = ({ isIn, children, className, src, alt }) => (
  <CSSTransition in={isIn} classNames="hotpotato-img" timeout={550}>
    <div className={className}>
      <img src={src} alt={alt} />
      {children}
    </div>
  </CSSTransition>
);

const Text = ({ refs, gameData, isIn, isVocab, numOfText }) => (
  <div className="hotpotato-text">
    {gameData.map((text, i) => (
      <CSSTransition key={text} in={isIn} classNames="hotpotato-text" timeout={i * 400}>
        <div
          className="hotpotato-text-wrapper"
          style={{ height: isVocab ? `${96 / numOfText}vh` : "100vh" }}
        >
          <FitText text={text} ref={refs[i]} />
        </div>
      </CSSTransition>
    ))}
  </div>
);

function __fadeIn(Song) {
  Song.current.volume = 0.05;
  Song.current.play();
  const id = setInterval(() => {
    if (Song.current.volume < 0.85) return (Song.current.volume += 0.15);
    clearInterval(id);
  }, 400);
  return id;
}

function __fadeOut(Song, Sizzle) {
  Song.current.pause();
  Sizzle.current.play();
  const id = setInterval(() => {
    if (Sizzle.current.volume > 0.11) return (Sizzle.current.volume -= 0.1);
    clearInterval(id);
  }, 250);
  return id;
}

function resetSounds(...cbs) {
  cbs.forEach(cb => cb());
}
