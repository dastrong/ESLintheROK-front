import React, { useCallback, forwardRef } from "react";
import shuffle from "lodash/shuffle";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useFitText from "../../hooks/useFitText";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import FitText from "../reusable/FitText";
import "./RedAndBlue.css";

const init = data => ({
  data: shuffle(data),
  red: "",
  blue: "",
});

function reducer(state, action) {
  const { type, data, red, blue } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, red, blue, data };
  return state;
}

export default function RedAndBlue(props) {
  const { title, isMenuOpen, font, vocabulary } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
  const { data, red, blue } = state;
  const [refs] = useFitText(2, [red, blue], font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    googleEvent(title);
    const [red, blue, ...rest] = data;
    const nextData = rest.length < 2 ? shuffle(vocabulary) : rest;
    dispatch({ type: "New_Round", red, blue, data: nextData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  useKeys(isMenuOpen, handleGame, null);

  return (
    <div className="redblue-container" onClick={handleGame} style={{ fontFamily: font }}>
      <Box color="red" text={red} ref={refs[0]} />
      <Box color="blue" text={blue} ref={refs[1]} />
    </div>
  );
}

const Box = forwardRef(({ color, text }, ref) => (
  <div className={`outer-color ${color}`}>
    <hr className="st-line" />
    <hr className="nd-line" />
    <hr className="rd-line" />
    <hr className="th-line" />
    <div className={`inner-color ${color}`}>
      <FitText text={text} ref={ref} />
    </div>
  </div>
));
