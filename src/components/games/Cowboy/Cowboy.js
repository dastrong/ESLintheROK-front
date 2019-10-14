import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useAudio from "hooks/useAudio";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { changeIsVocab, nextRoundData } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./Cowboy.css";

const baseURL = `https://res.cloudinary.com/dastrong/video/upload/v1567147248/TeacherSite/Media/Cowboy`;
const ReloadAudioURL = `${baseURL}/GunReload.mp3`;
const ShotAudioURL = `${baseURL}/GunShot.mp3`;

const init = data => ({
  data: shuffle(data),
  text: "",
  showReady: null,
  isVocab: true,
});

function reducer(state, action) {
  const { type, data, text, isVocab } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, showReady: true, data, text };
  if (type === "Show_Ready_False") return { ...state, showReady: false };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state);
  return state;
}

export default function Cowboy(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // AUDIO
  const [ReloadAudio] = useAudio(ReloadAudioURL);
  const [ShotAudio] = useAudio(ShotAudioURL);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, text, showReady, isVocab } = state;
  const [[ref]] = useFitText(1, text, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (!ShotAudio.current || !ReloadAudio.current) return;
    if (showReady) {
      googleEvent(title);
      ShotAudio.current.play();
      dispatch({ type: "Show_Ready_False" });
    } else {
      // don't play the audio on mounting
      if (showReady !== null) ReloadAudio.current.play();
      const [cur, nex] = nextRoundData(data, 1, isVocab, vocabulary, expressions);
      dispatch({ type: "New_Round", text: cur, data: nex });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, showReady]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }) => {
      if (key === "ArrowLeft") return dispatch({ type: "Change_isVocab", isVocab: true });
      if (key === "ArrowRight")
        return dispatch({ type: "Change_isVocab", isVocab: false });
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

  return (
    <div className="cowboy-container" onClick={handleGame} style={{ fontFamily: font }}>
      <div className="cowboy-text-holder">
        <CSSTransition in={showReady} classNames="cowboy-ready" timeout={0}>
          <p className="cowboy-ready">On your marks</p>
        </CSSTransition>
        <CSSTransition
          in={!showReady}
          classNames="cowboy-text"
          timeout={{ enter: 100, exit: 0 }}
        >
          <FitText text={text} ref={ref} cx="cowboy-text" />
        </CSSTransition>
      </div>
    </div>
  );
}
