import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import ReactFitText from "react-fittext";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
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
  const { title, isMenuOpen, font, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, expressions);
  const { compressor, data, text, showReady } = state;

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (showReady) {
      newGoogEvent(title);
      dispatch({ type: "Show_Ready_False" });
    } else {
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(expressions) : rest;
      dispatch({ type: "New_Round", text, data: newData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, showReady]);
  useHandleGame(handleGame, didUpdate);

  // EVENT HANDLERS
  const reqDep = [dispatch, isMenuOpen, compressor];
  const keysCB = useCallback(
    ({ keyCode }) => {
      if (keyCode === 32 || keyCode === 13) return handleGame();
    },
    [handleGame]
  );
  useKeys(keysCB, ...reqDep);
  useScroll(null, ...reqDep);

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
