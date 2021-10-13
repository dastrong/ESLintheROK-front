/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './SparkleDie.state';
import type { GameStore } from './SparkleDie.types';
import * as Styles from './SparkleDie.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

export default function SparkleDie({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.expressions;
  const secondary = store.vocabulary;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, text, timer, timeRemaining, isTimerRunning } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const springStyles = useSpring({ opacity: timeRemaining ? 1 : 0 });
  const timerStyles = useSpring({
    translateX: `${((timer - timeRemaining) / (timer - 1)) * 100}%`,
    config: { duration: 1000 },
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    track.newRound(title);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[text], newData] = nextRoundData(1, data, fullData);
    dispatch({ type: 'New_Round', text, data: newData });
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      if (key === 'ArrowUp') return dispatch({ type: 'Timer_Increase' });
      if (key === 'ArrowDown') return dispatch({ type: 'Timer_Decrease' });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean, wheelClicked: boolean) => {
      if (wheelClicked) {
        dispatch({ type: scrolledUp ? 'Timer_Increase' : 'Timer_Decrease' });
      } else {
        dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp });
      }
    },
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS
  // counts the time down
  useEffect(() => {
    if (!isTimerRunning) return;
    const id = setInterval(() => dispatch({ type: 'Timer_Countdown' }), 1000);
    return () => clearInterval(id);
  }, [dispatch, isTimerRunning]);

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className}>
        <animated.div
          style={springStyles}
          className={Styles.TextContainerCSS.className}
          onClick={handleGame}
        >
          <FitText text={text} ref={ref} />
        </animated.div>

        <div
          className={Styles.TimerContainerCSS.className}
          onClick={() => dispatch({ type: 'Timer_Pause' })}
        >
          <animated.div
            className={Styles.TimerBarCSS.className}
            style={timerStyles}
          />
          <div className={Styles.TimerTextCSS.className}>{timeRemaining}</div>
        </div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.TextContainerCSS.styles}
        {Styles.TimerContainerCSS.styles}
        {Styles.TimerBarCSS.styles}
        {Styles.TimerTextCSS.styles}
      </div>
    </GameWrapper>
  );
}
