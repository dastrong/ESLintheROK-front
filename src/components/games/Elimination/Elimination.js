import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useAudio from "hooks/useAudio";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useSplit2Rows from "hooks/useSplit2Rows";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import { nextRoundData, arrOfRandoNum, changeIsVocab } from "helpers/gameUtils";
import CardRow from "@Reusable/CardRow";
import "./Elimination.css";

// CONSTANTS
const baseURL = "https://res.cloudinary.com/dastrong/video/upload";
const gameOverAudioURL = `${baseURL}/v1564219595/TeacherSite/Media/Elimination/game-over.wav`;
const ohYeahAudioURL = `${baseURL}/v1564219597/TeacherSite/Media/Elimination/oh-yeah.mp3`;
const getBackCard = isX => (isX ? ["X", "red"] : ["O", "lime"]);
const getBoxCount = isVocab => (isVocab ? 8 : 6);

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  Xs: [],
  xCount: 3,
  clickedIDs: [],
  clickedID: null,
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, Xs, id, xCount } = action;
  const { clickedIDs, clickedID } = state;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    case "New_Round":
      return { ...state, data, gameData, clickedIDs: [], clickedID: null, Xs };
    case "Card_Clicked": {
      if (clickedID !== null || clickedIDs.includes(id)) return state;
      return { ...state, clickedID: id };
    }
    case "Animate_Done":
      return { ...state, clickedID: null, clickedIDs: [...clickedIDs, clickedID] };
    case "xCount_Changed": {
      if (!xCount || xCount > 5 || xCount === state.xCount) return state;
      return { ...state, xCount };
    }
    default:
      return state;
  }
}

export default function Elimination(props) {
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // AUDIO
  const [GameOverAudio, resetGameOverAudio] = useAudio(gameOverAudioURL);
  const [OhYeahAudio, resetOhYeahAudio] = useAudio(ohYeahAudioURL);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, gameData, isVocab, Xs, xCount, clickedIDs, clickedID } = state;
  const [refs, resizeText] = useFitText(gameData.length, gameData, font);
  const splitRows = useSplit2Rows(refs, gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    googleEvent(title);
    const boxCount = getBoxCount(isVocab);
    // get a unique array of indexes for our 'chosen' blocks
    const Xs = arrOfRandoNum(boxCount - 1, 0, xCount, true);
    const [nex, rest] = nextRoundData(data, boxCount, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", data: rest, gameData: nex, Xs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, xCount]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
      if (code.includes("Digit")) {
        dispatch({ type: "xCount_Changed", xCount: Number(key) });
      }
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

  // after a card is spun
  useEffect(() => {
    if (clickedID === null) return;
    const id = setTimeout(() => dispatch({ type: "Animate_Done" }), 1550);
    return () => clearTimeout(id);
  }, [clickedID, dispatch]);

  // handles sound effects
  useEffect(() => {
    if (isFirstRun) return;
    if (clickedID === null) {
      resetGameOverAudio();
      resetOhYeahAudio();
      return;
    }
    if (Xs.includes(clickedID)) {
      GameOverAudio.current.play();
    } else {
      OhYeahAudio.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedID, Xs]);

  // after cards are done animating, resize the text
  useEffect(() => {
    if (isFirstRun) return;
    const id = setTimeout(resizeText, 1550);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeText, clickedIDs.length]);

  // all cards are clicked, reset the game
  useEffect(() => {
    if (clickedIDs.length !== gameData.length) return;
    const id = setTimeout(handleGame, 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIDs.length, gameData.length]);

  // resets game if xCount changes
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xCount]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: "Card_Clicked", id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  return (
    <div className="elim-container" style={{ fontFamily: font }}>
      {splitRows.map((row, i) => (
        <CardRow
          key={"row" + i}
          rowIdx={i * 2}
          rowArr={row}
          targets={Xs}
          colors={colors}
          clickedID={clickedID}
          clickedIDs={clickedIDs}
          handleClick={_handleClick}
          getBackCard={getBackCard}
        />
      ))}
    </div>
  );
}
