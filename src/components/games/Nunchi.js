import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import ReactFitText from "react-fittext";
import { CSSTransition } from "react-transition-group";
import useSetData from "../../hooks/useSetData";
import useUpdateData from "../../hooks/useUpdateData";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useKeyEvents from "../../hooks/useKeyEvents";
import useScrollEvents from "../../hooks/useScrollEvents";
import { newGoogEvent } from "../../helpers/phase2helpers";
import "./Nunchi.css";

const init = data => ({
  compressor: 0.8,
  data: shuffle(data),
  text: "",
  showReady: false,
});

function reducer(state, action) {
  const { type, compressor, data, text } = action;
  if (type === "Compressor") return { ...state, compressor };
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, showReady: true, data, text };
  if (type === "Show_Ready_False") return { ...state, showReady: false };
  return state;
}

export default function Nunchi(props) {
  const { title, isMenuOpen, font, dataUpdated, expressions } = props;
  const [state, dispatch] = useSetData(reducer, expressions, init);
  const { compressor, data, text, showReady } = state;
  const handleGameRef = useCallback(handleGame, [dataUpdated]);
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  useKeyEvents({ dispatch, keysCB }, isMenuOpen, compressor, data, showReady);
  useScrollEvents({ dispatch }, isMenuOpen, compressor);
  useUpdateData(dataUpdated, handleGameRef);

  function handleGame() {
    if (showReady) {
      newGoogEvent(title);
      dispatch({ type: "Show_Ready_False" });
    } else {
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(expressions) : rest;
      dispatch({ type: "New_Round", text, data: newData });
    }
  }

  function keysCB({ keyCode }) {
    if (keyCode === 32 || keyCode === 13) return handleGame();
  }

  return (
    <div className="nunchi-container" onClick={handleGame} style={{ fontFamily: font }}>
      <div className="nunchi-text-holder">
        <CSSTransition in={showReady} classNames="nunchi-ready" timeout={0}>
          <p className="nunchi-ready">Ready?</p>
        </CSSTransition>
        <ReactFitText compressor={compressor} minFontSize={0} maxFontSize={350}>
          <CSSTransition
            in={!showReady}
            classNames="nunchi-text"
            timeout={{ enter: 500, exit: 0 }}
          >
            <p className="nunchi-text">{text}</p>
          </CSSTransition>
        </ReactFitText>
      </div>
    </div>
  );
}
