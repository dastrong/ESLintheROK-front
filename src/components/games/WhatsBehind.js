import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { Icon } from "semantic-ui-react";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useFirstRun from "../../hooks/useFirstRun";
import useSplit2Rows from "../../hooks/useSplit2Rows";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, changeIsVocab, getRandoNum } from "../../helpers/gameUtils";
import CardRow from "../reusable/CardRow";
import Confetti from "../reusable/Confetti";
import GifModal from "../reusable/GifModal";
import "./WhatsBehind.css";

// CONSTANTS
const getBackCard = isTarget =>
  isTarget ? [<Icon name="trophy" size="large" />, "gold"] : ["", "white"];
const getBoxCount = isVocab => (isVocab ? 8 : 6);

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  clickedIDs: [],
  clickedID: null,
  target: [],
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, target, id } = action;
  const { clickedIDs, clickedID } = state;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData, clickedIDs: [], clickedID: null, target };
    case "Card_Clicked": {
      if (clickedID !== null || clickedIDs.includes(id)) return state;
      return { ...state, clickedID: id };
    }
    case "Animate_Done":
      return { ...state, clickedID: null, clickedIDs: [...clickedIDs, clickedID] };
    default:
      return state;
  }
}

export default function WhatsBehind(props) {
  // PROPS
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, gameData, isVocab, clickedIDs, clickedID, target } = state;
  const [refs, resizeText] = useFitText(gameData.length, gameData, font);
  const splitRows = useSplit2Rows(refs, gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    googleEvent(title);
    const boxCount = getBoxCount(isVocab);
    // choose the target box
    const target = [getRandoNum(boxCount - 1)];
    const [nex, rest] = nextRoundData(data, boxCount, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", data: rest, gameData: nex, target });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
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

  // USE EFFECTS HERE
  // after a card is spun
  useEffect(() => {
    if (clickedID === null) return;
    if (target.includes(clickedID)) return;
    const id = setTimeout(() => dispatch({ type: "Animate_Done" }), 1050);
    return () => clearTimeout(id);
  }, [clickedID, dispatch, target]);

  // after cards are done animating, resize the text
  useEffect(() => {
    if (isFirstRun) return;
    const id = setTimeout(resizeText, 1050);
    return () => clearTimeout(id);
  }, [resizeText, clickedIDs.length, isFirstRun]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: "Card_Clicked", id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  const foundTarget = target.includes(clickedID);
  return (
    <div className="WB-container" style={{ fontFamily: font }}>
      {splitRows.map((row, i) => (
        <CardRow
          key={"row" + i}
          rowIdx={i * 2}
          rowArr={row}
          targets={target}
          colors={colors}
          clickedID={clickedID}
          clickedIDs={clickedIDs}
          handleClick={_handleClick}
          getBackCard={getBackCard}
        />
      ))}
      <GifModal handleReset={handleGame} open={foundTarget} />
      {foundTarget && (
        <Confetti height={window.innerHeight} width={window.innerWidth} recycle={false} />
      )}
    </div>
  );
}
