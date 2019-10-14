import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { getRandoNum } from "helpers/gameUtils";
import Emoji from "./Emoji";
import ShowUpdatedSetting from "./ShowUpdatedSetting";
import FitText from "@Reusable/FitText";
import "./Kimchi.css";

const init = data => ({
  data: shuffle(data),
  text: "",
  showPic: false,
  isKimchi: true,
  freq: 50,
  freqUpd: false,
  noClick: false,
});

function reducer(state, action) {
  const { type, data, text, isKimchi, freq } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data), showPic: true };
    case "New_Round":
      return { ...state, showPic: false, noClick: true, data, text, isKimchi };
    case "Show_Pic":
      return { ...state, showPic: true, noClick: true };
    case "Change_Frequency":
      return { ...state, freqUpd: true, freq };
    case "Freq_Upd_False":
      return { ...state, freqUpd: false };
    case "No_Click":
      return { ...state, noClick: false };
    default:
      return state;
  }
}

export default function Kimchi(props) {
  const { title, isMenuOpen, font, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, expressions);
  const { data, text, showPic, isKimchi, freq, freqUpd, noClick } = state;
  const [[ref]] = useFitText(1, text, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (noClick) return;
    if (showPic) {
      googleEvent(title);
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(expressions) : rest;
      const isKimchi = __isKimchi(freq);
      dispatch({ type: "New_Round", text, data: newData, isKimchi });
    } else {
      dispatch({ type: "Show_Pic" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showPic, freq, noClick]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }) => {
      if (key === "ArrowLeft") return __decreaseFreq(dispatch, freq);
      if (key === "ArrowRight") return __increaseFreq(dispatch, freq);
    },
    [dispatch, freq]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp =>
      scrolledUp ? __increaseFreq(dispatch, freq) : __decreaseFreq(dispatch, freq),
    [dispatch, freq]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (!freqUpd) return;
    dispatch({ type: "Freq_Upd_False" });
  }, [dispatch, freqUpd]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "No_Click" }), 750);
    return () => clearTimeout(id);
  }, [dispatch, showPic]);

  return (
    <div className="kim-container" onClick={handleGame} style={{ fontFamily: font }}>
      <CSSTransition in={!showPic} timeout={0} classNames="kimchiText">
        <div className="kimchi-box">
          <FitText text={text} ref={ref} />
        </div>
      </CSSTransition>
      <CSSTransition in={showPic} timeout={0} classNames="kimchiImg">
        {isKimchi ? (
          <img
            alt="kimchi"
            className="kim-img"
            src="https://www.sarang.sg/wp-content/uploads/2015/07/kimchi_im.png"
          />
        ) : (
          <Emoji className="poo-img" label="poo emoji" symbol="💩" />
        )}
      </CSSTransition>
      <ShowUpdatedSetting isIn={freqUpd} text={freq} symbol="%" />
    </div>
  );
}

function __increaseFreq(dispatch, freq) {
  if (freq >= 99) return;
  dispatch({ type: "Change_Frequency", freq: freq + 1 });
}

function __decreaseFreq(dispatch, freq) {
  if (freq <= 1) return;
  dispatch({ type: "Change_Frequency", freq: freq - 1 });
}

function __isKimchi(percent) {
  return getRandoNum(100) < percent;
}
