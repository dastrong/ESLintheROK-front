import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useSetData from "../../hooks/useSetData";
import useUpdateData from "../../hooks/useUpdateData";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useKeyEvents from "../../hooks/useKeyEvents";
import useScrollEvents from "../../hooks/useScrollEvents";
import { newGoogEvent, getRandomNum } from "../../helpers/phase2helpers";
import TextBox from "../reusable/TextBox";
import Emoji from "../reusable/Emoji";
import ShowUpdatedSetting from "../reusable/ShowUpdatedSetting";
import "./Kimchi.css";

const init = data => ({
  compressor: 0.8,
  data: shuffle(data),
  text: "",
  showPic: true,
  isKimchi: true,
  freq: 50,
  freqUpd: false,
  noClick: false,
});

function reducer(state, action) {
  const { type, compressor, data, text, isKimchi, freq } = action;
  switch (type) {
    case "Compressor":
      return { ...state, compressor };
    case "Set_Data":
      return { ...state, data: shuffle(data) };
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
  const { title, isMenuOpen, font, dataUpdated, expressions } = props;
  const [state, dispatch] = useSetData(reducer, expressions, init);
  const handleGameRef = useCallback(handleGame, [dataUpdated]);
  const { compressor, data, text, showPic, isKimchi, freq, freqUpd, noClick } = state;
  const keyDeps = [isMenuOpen, compressor, data, showPic, freq, noClick];
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  useKeyEvents({ dispatch, keysCB }, ...keyDeps);
  useScrollEvents({ dispatch, scrollCB }, isMenuOpen, compressor, freq);
  useUpdateData(dataUpdated, handleGameRef);

  useEffect(() => {
    if (!freqUpd) return;
    dispatch({ type: "Freq_Upd_False" });
  }, [dispatch, freqUpd]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "No_Click" }), 750);
    return () => clearTimeout(id);
  }, [dispatch, showPic]);

  function handleGame() {
    if (noClick) return;
    if (showPic) {
      newGoogEvent(title);
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(expressions) : rest;
      const isKimchi = _isKimchi(freq);
      dispatch({ type: "New_Round", text, data: newData, isKimchi });
    } else {
      dispatch({ type: "Show_Pic" });
    }
  }

  function keysCB({ keyCode }) {
    if (keyCode === 32 || keyCode === 13) return handleGame();
    if (keyCode === 39) return _increaseFreq();
    if (keyCode === 37) return _decreaseFreq();
  }

  function scrollCB(compressorChange) {
    compressorChange < 0 ? _increaseFreq() : _decreaseFreq();
  }

  function _increaseFreq() {
    if (freq >= 99) return;
    dispatch({ type: "Change_Frequency", freq: freq + 1 });
  }

  function _decreaseFreq() {
    if (freq <= 1) return;
    dispatch({ type: "Change_Frequency", freq: freq - 1 });
  }

  const _isKimchi = percent => getRandomNum(100) < percent;

  return (
    <div className="kim-container" onClick={handleGame} style={{ fontFamily: font }}>
      <CSSTransition in={!showPic} timeout={0} classNames="kimchiText">
        <TextBox
          gameReady={!!text}
          text={text}
          height="100vh"
          width="100%"
          compressor={compressor}
        />
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
