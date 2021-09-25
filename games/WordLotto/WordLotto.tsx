/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './WordLotto.state';
import type { GameStore } from './WordLotto.types';
import * as Styles from './WordLotto.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { arrOfRandoNum, nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
const minDelay = 500; // in ms
const maxDelay = 4000; // in ms
const newRoundDelayReset = 4000; // in ms
const colors = [
  'chocolate',
  'purple',
  'darkslateblue',
  'aqua',
  'teal',
  'fuchsia',
  'plum',
  'olive',
  'violet',
];

export default function WordLotto({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, isAnimating, isDone, maxCardDelay } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [refs] = useFitText(gameData);
  const lottoCardStyles = useSprings(
    gameData.length,
    gameData.map(({ isWinner, timeout }) => {
      return {
        opacity: isWinner || isDone || !isAnimating ? 1 : 0,
        delay: isDone ? newRoundDelayReset : timeout,
      };
    })
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const [numOfBox, numOfX] = isVocab ? [9, 3] : [4, 1];
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [cur, nex] = nextRoundData(numOfBox, data, fullData);
    const winners = arrOfRandoNum(numOfBox - 1, 0, numOfX, true);
    const timeouts = arrOfRandoNum(maxDelay, minDelay, numOfBox, false);
    const maxTimeout = Math.max(...timeouts);
    const newGameData = cur.map((text, i) => ({
      text,
      timeout: timeouts[i],
      isWinner: winners.includes(i),
    }));
    dispatch({
      type: 'New_Round',
      data: nex,
      gameData: newGameData,
      maxCardDelay: maxTimeout,
    });
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (!isAnimating) return;
    const id = setTimeout(
      () => dispatch({ type: 'Animation_Done' }),
      maxCardDelay
    );
    return () => clearTimeout(id);
  }, [isAnimating, dispatch]);

  useEffect(() => {
    if (!isDone) return;
    const id = setTimeout(() => handleGame, newRoundDelayReset);
    return () => clearTimeout(id);
  }, [isDone, handleGame]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleClick = useCallback(() => {
    if (isDone && isAnimating) return;
    if (isDone) return handleGame();
    if (!isAnimating) {
      // googleEvent(title);
      dispatch({ type: 'Animation_Start' });
    }
    // }, [isDone, isAnimating, dispatch, handleGame, title]); // title
  }, [isDone, isAnimating, dispatch, handleGame]);

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className} onClick={_handleClick}>
        {lottoCardStyles.map((cardStyles, i) => (
          <animated.div
            key={`lotto-card-${i}-${gameData[i].text}`}
            style={{
              ...cardStyles,
              width: isVocab ? '32vw' : '99vw',
              height: isVocab ? '32vh' : '24vh',
              backgroundColor: colors[i],
            }}
            className={Styles.CardCSS.className}
          >
            <FitText text={gameData[i].text} ref={refs[i]} />
          </animated.div>
        ))}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.CardCSS.styles}
      </div>
    </GameWrapper>
  );
}
