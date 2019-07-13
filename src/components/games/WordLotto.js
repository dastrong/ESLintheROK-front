import React, { useCallback, useEffect } from "react";
import shuffle from "lodash/shuffle";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import useData from "../../hooks/useData";
import useKeys from "../../hooks/useKeys";
import useScroll from "../../hooks/useScroll";
import useFitText from "../../hooks/useFitText";
import useHandleGame from "../../hooks/useHandleGame";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { googleEvent } from "../../helpers/ga";
import { nextRoundData, arrOfRandoNum, changeIsVocab } from "../../helpers/gameUtils";
import FitText from "../reusable/FitText";
import "./WordLotto.css";
import "../reusable/Box.css";

const flagVars = { isDone: false, isAnimating: false };

const init = data => ({
  data: shuffle(data),
  gameData: [],
  isVocab: true,
  ...flagVars,
});

function reducer(state, action) {
  const { type, data, gameData, isVocab } = action;
  if (type === "Set_Data") return { ...state, data: shuffle(data) };
  if (type === "New_Round") return { ...state, data, gameData, ...flagVars };
  if (type === "Animation_Start") return { ...state, isAnimating: true };
  if (type === "Animation_Done") return { ...state, isDone: true };
  if (type === "Change_isVocab") return changeIsVocab(isVocab, state);
  return state;
}

export default function WordLotto(props) {
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);

  // STATE
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data, isVocab, gameData, isAnimating, isDone } = state;
  const [refs] = useFitText(gameData.length, gameData, font);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const [numOfBox, numOfX] = isVocab ? [9, 3] : [4, 1];
    const [cur, nex] = nextRoundData(data, numOfBox, isVocab, vocabulary, expressions);
    const winners = arrOfRandoNum(0, numOfBox, numOfX, true);
    const timeouts = arrOfRandoNum(500, 8500, numOfBox, false);
    const gameData = cur.map((text, i) => ({
      text,
      timeout: timeouts[i],
      isWinner: winners.includes(i),
    }));
    dispatch({ type: "New_Round", data: nex, gameData });
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
    scrolledUp => dispatch({ type: "Change_isVocab", isVocab: scrolledUp }),
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE
  useEffect(() => {
    if (!isAnimating) return;
    const id = setTimeout(() => dispatch({ type: "Animation_Done" }), 10000);
    return () => clearTimeout(id);
  }, [isAnimating, dispatch]);

  useEffect(() => {
    if (!isDone) return;
    const id = setTimeout(handleGame, 10000);
    return () => clearTimeout(id);
  }, [isDone, handleGame]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(() => {
    if (isDone && isAnimating) return;
    if (isDone) return handleGame();
    if (!isAnimating) {
      googleEvent(title);
      dispatch({ type: "Animation_Start" });
    }
  }, [isDone, isAnimating, dispatch, handleGame, title]);

  // CLASSES
  const cx = classNames("box", { "box-grid": isVocab }, { "box-list": !isVocab });

  return (
    <div className="lotto-container" style={{ fontFamily: font }} onClick={_handleClick}>
      {gameData.map(({ text, timeout, isWinner }, i) => {
        const isIn = !(isAnimating && !isWinner);
        return (
          <CSSTransition key={i} in={isIn} timeout={0} classNames="box">
            <div
              className={cx}
              style={{
                backgroundColor: colors[i],
                transitionDelay: `${isAnimating ? timeout : 0}ms`,
              }}
            >
              <FitText text={text} ref={refs[i]} />
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
}
