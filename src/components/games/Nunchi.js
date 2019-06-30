import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useFitText from "../../hooks/useFitText";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import FitText from "../reusable/FitText";
import "./Nunchi.css";

const init = data => ({
  data: shuffle(data),
  text: "",
  showReady: false,
});

function reducer(state, action) {
  const { type, data, text } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, showReady: true, data, text };
  if (type === "Show_Ready_False") return { ...state, showReady: false };
  return state;
}

export default function Nunchi(props) {
  const { title, isMenuOpen, font, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, expressions);
  const { data, text, showReady } = state;
  const ref = useFitText(text, font, true);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (showReady) {
      googleEvent(title);
      dispatch({ type: "Show_Ready_False" });
    } else {
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(expressions) : rest;
      dispatch({ type: "New_Round", text, data: newData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showReady]);
  useHandleGame(handleGame, didUpdate);

  useKeys(isMenuOpen, handleGame);

  return (
    <div className="nunchi-container" onClick={handleGame} style={{ fontFamily: font }}>
      <div className="nunchi-text-holder">
        <CSSTransition in={showReady} classNames="nunchi-ready" timeout={0}>
          <p className="nunchi-ready">Ready?</p>
        </CSSTransition>
        <CSSTransition
          in={!showReady}
          classNames="nunchi-text"
          timeout={{ enter: 500, exit: 0 }}
        >
          <FitText text={text} ref={ref} cx="nunchi-text" style={{ width: "33%" }} />
        </CSSTransition>
      </div>
    </div>
  );
}
