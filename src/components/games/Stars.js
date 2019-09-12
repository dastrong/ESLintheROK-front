import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import classnames from "classnames";
import { Icon } from "semantic-ui-react";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useFirstRun from "../../hooks/useFirstRun";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, arrOfRandoNum, changeIsVocab } from "../../helpers/gameUtils";
import Card from "../reusable/Card";
import "./Stars.css";

// CONSTANTS
const starColors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"];
const getBoxCount = isVocab => (isVocab ? 8 : 6);

const init = data => ({
  data: shuffle(data),
  isVocab: true,
  gameData: [],
  clickedIDs: [],
  stars: [],
  starOpts: { min: 0, max: 6 },
});

function reducer(state, action) {
  const { type, data, isVocab, gameData, stars, min, id } = action;
  const { clickedIDs, starOpts } = state;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, data, gameData, stars, clickedIDs: [] };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state);
  if (type === "Change_Min_Stars") {
    const prevMin = starOpts.min;
    if (prevMin === min || min > 5) return state;
    return { ...state, starOpts: { max: 6, min } };
  }
  if (type === "Card_Clicked") {
    if (clickedIDs.includes(id)) return state;
    return { ...state, clickedIDs: [...clickedIDs, id] };
  }
  return state;
}

export default function Stars(props) {
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, gameData, isVocab, clickedIDs, stars, starOpts } = state;
  const [refs] = useFitText(gameData.length, gameData, font);

  // HANDLE GAME - add dependencies as needed
  const handleGame = useCallback(() => {
    googleEvent(title);
    const boxCount = getBoxCount(isVocab);
    const { min, max } = starOpts;
    // how many 'stars' for each box
    const stars = arrOfRandoNum(min, max, boxCount);
    const [nex, rest] = nextRoundData(data, boxCount, isVocab, vocabulary, expressions);
    dispatch({ type: "New_Round", data: rest, gameData: nex, stars });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isVocab, starOpts]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode, code, key }) => {
      if (keyCode === 37) return dispatch({ type: "Change_isVocab", isVocab: true });
      if (keyCode === 39) return dispatch({ type: "Change_isVocab", isVocab: false });
      if (!code.includes("Digit")) return;
      const min = Number(key);
      dispatch({ type: "Change_Min_Stars", min });
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

  // if minStars are changed, reset the game
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starOpts.min]);

  // reset the game if all the cards have been clicked
  useEffect(() => {
    if (isFirstRun) return;
    if (clickedIDs.length !== gameData.length) return;
    const id = setTimeout(() => handleGame(), 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIDs.length, gameData.length]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: "Card_Clicked", id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  // CLASSES
  const cx = classnames("stars-container", { vert25: isVocab }, { vert33: !isVocab });

  return (
    <div className={cx} style={{ fontFamily: font }}>
      {gameData.map((text, i) => {
        const starIcons = [...Array(stars[i])].map((x, j) => (
          <Icon name="star" color={starColors[i]} size="small" key={starColors[i] + j} />
        ));
        return (
          <Card
            id={i}
            key={text + i}
            ref={refs[i]}
            textFront={text}
            textBack={starIcons}
            colorFront={colors[i]}
            handleClick={_handleClick}
            flipMe={clickedIDs.includes(i)}
          />
        );
      })}
    </div>
  );
}
