import React, { useCallback, forwardRef } from "react";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { nextRoundData, changeIsVocab } from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
import "./RedAndBlue.css";

const init = data => ({
  data: shuffle(data),
  red: "",
  blue: "",
  isVocab: true,
});

function reducer(state, action) {
  const { type, data, red, blue, isVocab } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, red, blue, data };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state);
  return state;
}

export default function RedAndBlue(props) {
  const { title, isMenuOpen, font, vocabulary, expressions } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, red, blue, isVocab } = state;
  const [refs] = useFitText(2, [red, blue], font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    googleEvent(title);
    const [[red, blue], nex] = nextRoundData(data, 2, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", red, blue, data: nex });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, dispatch]);
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
