import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import ReactFitText from "react-fittext";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { newGoogEvent } from "../../helpers/phase2helpers";
import "./RedAndBlue.css";

const init = data => ({
  compressor: 0.6,
  data: shuffle(data),
  red: "",
  blue: "",
});

function reducer(state, action) {
  const { type, compressor, data, red, blue } = action;
  if (type === "Compressor") return { ...state, compressor };
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, red, blue, data };
  return state;
}

export default function RedAndBlue(props) {
  const { title, isMenuOpen, font, vocabulary } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
  const { compressor, data, red, blue } = state;

  // HANDLE GAME
  const handleGame = useCallback(() => {
    newGoogEvent(title);
    const [red, blue, ...rest] = data;
    const nextData = rest.length < 2 ? shuffle(vocabulary) : rest;
    dispatch({ type: "New_Round", red, blue, data: nextData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
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
    <div className="redblue-container" onClick={handleGame} style={{ fontFamily: font }}>
      <Box color="red" compressor={compressor} text={red} />
      <Box color="blue" compressor={compressor} text={blue} />
    </div>
  );
}

const Box = ({ color, compressor, text }) => (
  <div className={`outer-color ${color}`}>
    <hr className="st-line" />
    <hr className="nd-line" />
    <hr className="rd-line" />
    <hr className="th-line" />
    <ReactFitText compressor={compressor} minFontSize={0} maxFontSize={500}>
      <div className={`inner-color ${color}`}>{text}</div>
    </ReactFitText>
  </div>
);
