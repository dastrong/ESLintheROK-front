import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useFirstRun from "../../hooks/useFirstRun";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, getRandoGrad } from "../../helpers/gameUtils";
import FitText from "../reusable/FitText";
import "./Matching.css";

// CONSTANT VARIABLES
const boxSettings = [
  { height: "32vh", width: "48vw", poo: 0, words: 6 },
  { height: "32vh", width: "32vw", poo: 1, words: 8 },
  { height: "24vh", width: "32vw", poo: 0, words: 12 }, // default
  { height: "19vh", width: "32vw", poo: 1, words: 14 },
  { height: "24vh", width: "24vw", poo: 0, words: 16 },
];
const max = boxSettings.length - 1;

const init = data => ({
  data: shuffle(data),
  gameData: [],
  clicked: [],
  matched: [],
  settingsNum: 2,
});

function reducer(state, action) {
  const { type, data, gameData, settingsNum, id, background } = action;
  const { clicked, matched } = state;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "New_Round":
      return { ...state, data, gameData, background, clicked: [], matched: [] };
    case "Change_Boxes_Num":
      return { ...state, settingsNum };
    case "Handle_Click": {
      if (clicked.includes(id)) return state;
      if (clicked.length === 0) return { ...state, clicked: [id] };
      if (clicked.length === 1) return { ...state, clicked: [id, ...clicked] };
      return state;
    }
    case "Match_Yes":
      return { ...state, matched: [...matched, ...clicked], clicked: [] };
    case "Match_No":
      return { ...state, clicked: [] };
    default:
      return state;
  }
}

export default function Matching(props) {
  const { title, isMenuOpen, font, vocabulary } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary);
  const { data, gameData, clicked, matched, settingsNum, background } = state;
  const { words, poo, ...styles } = boxSettings[settingsNum];
  const refs = useFitText(gameData, font, true);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const num = words / 2;
    const [cur, nex] = nextRoundData(data, num, true, vocabulary);
    const round = shuffle(poo ? [...cur, ...cur, "poo"] : [...cur, ...cur]);
    const background = getRandoGrad();
    dispatch({ type: "New_Round", data: nex, gameData: round, background });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, words, poo, dispatch]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      if (keyCode === 37) return __decreaseBoxes(dispatch, settingsNum);
      if (keyCode === 39) return __increaseBoxes(dispatch, settingsNum);
    },
    [settingsNum, dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => {
      scrolledUp
        ? __increaseBoxes(dispatch, settingsNum)
        : __decreaseBoxes(dispatch, settingsNum);
    },
    [settingsNum, dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsNum]);

  useEffect(() => {
    if (matched.length !== words) return;
    googleEvent(title);
    const id = setTimeout(handleGame, 500);
    return () => clearTimeout(id);
  }, [matched, handleGame, words, title]);

  useEffect(() => {
    if (isFirstRun) return;
    if (clicked.length === 0) return;
    const id =
      // check if user found poo on first click; reset if true
      gameData[clicked[0]] === "poo"
        ? setTimeout(() => dispatch({ type: "Match_No" }), 900)
        : clicked.length === 2
        ? setTimeout(() => {
            // compare the two clicked words
            gameData[clicked[0]] === gameData[clicked[1]]
              ? dispatch({ type: "Match_Yes" })
              : dispatch({ type: "Match_No" });
          }, 1500)
        : null;
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked, gameData]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: "Handle_Click", id: Number(e.target.id) }),
    [dispatch]
  );

  return (
    <div className="match-container" style={{ fontFamily: font, background }}>
      <Boxes
        gameData={gameData}
        clicked={clicked}
        matched={matched}
        styles={styles}
        _handleClick={_handleClick}
        refs={refs}
      />
    </div>
  );
}

// INNER COMPONENTS HERE
const Boxes = ({ gameData, clicked, matched, styles, _handleClick, refs }) => {
  return gameData.map((text, i) => {
    const show = clicked.includes(i) || matched.includes(i);
    return (
      <div key={i} className="match-holder" style={{ ...styles }}>
        <CSSTransition in={!show} timeout={0} classNames="match">
          <div className="match match-front" onClick={_handleClick} id={i}>
            {i + 1}
          </div>
        </CSSTransition>
        <CSSTransition in={show} timeout={0} classNames="match">
          <div className="match match-back">
            <FitText text={text !== "poo" ? text : "💩"} ref={refs[i]} />
          </div>
        </CSSTransition>
      </div>
    );
  });
};

// OTHER FUNCTIONS HERE
function __increaseBoxes(dispatch, current) {
  // max is declared at the top = boxSettings.length - 1
  if (current === max) return;
  dispatch({ type: "Change_Boxes_Num", settingsNum: current + 1 });
}

function __decreaseBoxes(dispatch, current) {
  if (current === 0) return;
  dispatch({ type: "Change_Boxes_Num", settingsNum: current - 1 });
}
