import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
import ReactFitText from "react-fittext";
import useSetData from "../../hooks/useSetData";
import useUpdateData from "../../hooks/useUpdateData";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useMountListeners from "../../hooks/useMountListeners";
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
  if (type === "Next_Round") return { ...state, red, blue, data };
  return state;
}

export default function RedAndBlue(props) {
  const { title, isMenuOpen, font, dataUpdated, vocabulary } = props;
  const [state, dispatch] = useSetData(reducer, vocabulary, init);
  const handleGameRef = useCallback(handleGame, [dataUpdated]);
  const { compressor, data, red, blue } = state;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  useMountListeners({ dispatch, isMenuOpen, compressor, data, keysCB });
  useUpdateData(dataUpdated, handleGameRef);

  function handleGame() {
    newGoogEvent(title);
    const [red, blue, ...rest] = data;
    dispatch({ type: "Next_Round", red, blue, data: rest });
    if (rest.length < 2) dispatch({ type: "Set_Data", data: vocabulary });
  }

  function keysCB({ keyCode }) {
    if (keyCode === 32 || keyCode === 13) return handleGame();
  }

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
