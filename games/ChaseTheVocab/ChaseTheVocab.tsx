/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import { animated, useSpring, useSprings } from 'react-spring';
import classNames from 'classnames';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys } from 'hooks';

import { init, reducer } from './ChaseTheVocab.state';
import type { GameStore } from './ChaseTheVocab.types';
import * as Styles from './ChaseTheVocab.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
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

export default function ChaseTheVocab({ title, description }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = null;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const {
    data,
    gameData,
    clickedIDs,
    color,
    round,
    isAnimating,
    isShuffleDone,
    shuffBuffer,
    shuffDuration,
    shuffRounds,
  } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [refs] = useFitText(gameData);
  const cardStyles = useSpring({ scale: isAnimating ? 0.9 : 1 });
  const numSprings = useSprings(
    gameData.length,
    gameData.map((_, i) => ({
      opacity: isShuffleDone && !clickedIDs.includes(i) ? 1 : 0,
    }))
  );
  const textSprings = useSprings(
    gameData.length,
    gameData.map((_, i) => ({
      opacity:
        (!isAnimating && !isShuffleDone) || clickedIDs.includes(i) ? 1 : 0,
    }))
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const [cur, nex] = nextRoundData(9, data, store.vocabulary);
    const gameData = cur.map((text, i) => ({ text, id: i }));
    dispatch({ type: 'New_Round', gameData, data: nex });
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      // c was clicked; change the cards background color
      if (key === 'c' || key === 'C') {
        const colorIdx = color < colors.length - 1 ? color + 1 : 0;
        return dispatch({ type: 'Change_Color', color: colorIdx });
      }
      // a number key was clicked; change difficulty
      const keyNum = Number(key);
      if (!keyNum) return;
      const shuffBuffer = __changeDelay(keyNum);
      const shuffRounds = __changeRound(keyNum);
      const shuffDuration = __changeSpeed(keyNum);
      dispatch({
        type: 'Change_Settings',
        shuffBuffer,
        shuffDuration,
        shuffRounds,
      });
    },
    [dispatch, color]
  );
  useKeys(handleGame, keysCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (!isAnimating) return;
    if (round === shuffRounds) return;
    const time = shuffDuration + shuffBuffer;
    const id =
      round === 0
        ? setTimeout(() => dispatch({ type: 'Shuffle', gameData }), 1000)
        : setTimeout(() => dispatch({ type: 'Shuffle', gameData }), time);
    return () => clearTimeout(id);
  }, [
    dispatch,
    isAnimating,
    gameData,
    round,
    shuffRounds,
    shuffDuration,
    shuffBuffer,
  ]);

  useEffect(() => {
    if (round < shuffRounds) return;
    const time = shuffDuration + shuffBuffer;
    const id = setTimeout(() => dispatch({ type: 'Shuffle_Stop' }), time);
    return () => clearTimeout(id);
  }, [dispatch, round, shuffRounds, shuffDuration, shuffBuffer]);

  useEffect(() => {
    if (clickedIDs.length !== 9) return;
    const id = setTimeout(handleGame, 2000);
    return () => clearTimeout(id);
  }, [dispatch, clickedIDs, handleGame]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleClick = useCallback(() => {
    // googleEvent(title);
    dispatch({ type: 'Start_Animating' });
    // }, [dispatch, title]);
  }, [dispatch]);

  const _handleBoxClick = useCallback(
    e => dispatch({ type: 'Add_Click_ID', id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  return (
    <GameWrapper title={title} description={description}>
      <div
        className={ContainerCSS.className}
        onClick={!isAnimating && !isShuffleDone ? _handleClick : null}
      >
        <FlipMove
          className={Styles.FlipperContainerCSS.className}
          duration={!isAnimating && !isShuffleDone ? 500 : shuffDuration}
        >
          {gameData.map(({ text, id }, i) => {
            return (
              // we double wrap our divs here because FlipMove will animate using a CSS ...
              // ... transform which will interfere with our CSS transform springs
              <div
                key={`chase-card-${id}`}
                id={String(i)}
                onClick={_handleBoxClick}
              >
                <animated.div
                  style={{ ...cardStyles, backgroundColor: colors[color] }}
                  className={classNames(
                    Styles.CardHolderCSS.className,
                    Styles.CardCSS.className
                  )}
                >
                  <animated.div
                    style={numSprings[i]}
                    className={classNames(
                      Styles.CardCSS.className,
                      Styles.CardNumCSS.className
                    )}
                  >
                    {i + 1}
                  </animated.div>
                  <animated.div
                    style={textSprings[i]}
                    className={classNames(
                      Styles.CardCSS.className,
                      Styles.CardTextCSS.className
                    )}
                  >
                    <FitText text={text} ref={refs[id]} />
                  </animated.div>
                </animated.div>
              </div>
            );
          })}
        </FlipMove>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.FlipperContainerCSS.styles}
        {Styles.CardHolderCSS.styles}
        {Styles.CardCSS.styles}
        {Styles.CardNumCSS.styles}
        {Styles.CardTextCSS.styles}
      </div>
    </GameWrapper>
  );
}

// OTHER FUNCTIONS HERE
function __changeSpeed(num: number) {
  const base = 2000;
  const increaseMultiplier = (2000 - 500) / 4;
  const decreaseMultiplier = (5000 - 2000) / 4;
  if (num >= 5) return base - increaseMultiplier * (num - 5);
  if (num < 5) return base + decreaseMultiplier * (5 - num);
}

function __changeDelay(num: number) {
  return 1000 - num * 100;
}

function __changeRound(num: number) {
  return num < 4 ? 3 : num;
}
