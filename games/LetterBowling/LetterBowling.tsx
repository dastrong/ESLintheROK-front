import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { FaPlay, FaRandom, FaSyncAlt } from 'react-icons/fa';
import { animated, useSpring, useSprings } from 'react-spring';

import { useStore } from 'contexts/store';
import { useData, useHandleGame, useKeys } from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './LetterBowling.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { getRandoNum, nextRoundData } from 'games/_utils';
import SeoWrapper from 'components/SeoWrapper';
import Popup from 'components/Popup';
import Button from 'components/Button';

// CONSTANTS - img, audio, function, etc.
const letterBuffer = 3000; // in ms - time between each letter's animation
const animDuration = 5000; // in ms - time it takes from the letter appearing to disappearing
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

export default function LetterBowling({ title, description }: GameSEOProps) {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const {
    data,
    text,
    left,
    round,
    rounds,
    bowlColors,
    splitText,
    showAnswer,
    isGameOver,
    isBowling,
  } = state;
  const totalBufferTime = (text.length - 1) * letterBuffer;
  const totalRoundTime = totalBufferTime + animDuration;

  // REFS - useFitText, useSplit2Rows, etc..
  const textStyles = useSpring({
    opacity: showAnswer || isGameOver || !isBowling ? 1 : 0,
  });
  const letterSprings = useSprings(
    text.length,
    splitText.map((_, i) => {
      const animate = isBowling || isGameOver;
      return {
        opacity: animate ? 0 : 1,
        x: animate ? `${window.innerWidth / 2 - 75}px` : `${left[i]}px`,
        y: animate ? '10vh' : '100vh',
        delay: !isBowling ? 0 : i * letterBuffer,
        immediate: !isBowling,
        config: { duration: animDuration },
      };
    })
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // GOOGLE EVENTS ARE SENT WHEN USER STARTS A ROUND, NOT HERE
    const [[cur], nex] = nextRoundData(1, data, store.vocabulary);
    const splitText = shuffle(cur.split(''));
    const bowlColors = shuffle(colors).slice(0, splitText.length - 1);
    const left = splitText.map(() => getRandoNum(window.innerWidth));
    dispatch({
      type: 'New_Round',
      text: cur,
      data: nex,
      splitText,
      bowlColors,
      left,
    });
  }, [data]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft') return dispatch({ type: 'Rounds_Decrease' });
      if (key === 'ArrowRight') return dispatch({ type: 'Rounds_Increase' });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (!isBowling) return;
    const id =
      round < rounds
        ? setTimeout(() => dispatch({ type: 'Bowl_Next' }), totalRoundTime)
        : setTimeout(() => dispatch({ type: 'Bowl_Done' }), totalRoundTime);
    return () => clearTimeout(id);
  }, [dispatch, isBowling, round, rounds, totalRoundTime]);

  const disableShuffle = isBowling || isGameOver || showAnswer || round === 1;
  const disablePlay = isBowling || isGameOver || showAnswer;

  return (
    <SeoWrapper title={title} description={description}>
      <div className={ContainerCSS.className}>
        {/* CONTROLS */}
        <div className={Styles.ControlsCSS.className}>
          <Popup
            owner={
              <Button
                rounded
                size="xl"
                Icon={FaRandom}
                color="rgba(0, 0, 0, 0.6)"
                bgColor="#e0e1e2"
                style={{ margin: '5px' }}
                onClick={() => dispatch({ type: 'Shuffle_Letters' })}
                disabled={disableShuffle}
              />
            }
            placement="left"
            content="Shuffle the letters"
            hideTooltip={disableShuffle}
          />

          <Popup
            owner={
              <Button
                rounded
                size="xl"
                Icon={FaPlay}
                color={!disablePlay ? 'white' : 'rgba(0, 0, 0, 0.6)'}
                bgColor={!disablePlay ? '#2185d0' : '#e0e1e2'}
                style={{ margin: '5px' }}
                onClick={() => {
                  // if (round === 1) googleEvent(title);
                  dispatch({ type: 'Bowl_Start' });
                }}
                disabled={disablePlay}
              />
            }
            placement="bottom"
            content="Start the round"
            hideTooltip={disablePlay}
          />

          <Popup
            owner={
              <Button
                rounded
                size="xl"
                Icon={FaSyncAlt}
                color={showAnswer ? 'white' : 'rgba(0, 0, 0, 0.6)'}
                bgColor={showAnswer ? '#2185d0' : '#e0e1e2'}
                style={{ margin: '5px' }}
                onClick={handleGame}
              />
            }
            placement="right"
            content="Get a new word and reset"
          />
        </div>

        {/* ROUND COUNTER */}
        <p className={Styles.RoundCounterCSS.className}>
          {round}/{rounds}
        </p>

        {/* INFO TEXT */}
        <animated.p
          style={{ ...textStyles, cursor: isGameOver ? 'pointer' : 'default' }}
          className={Styles.TextCSS.className}
          onClick={() => {
            if (!isGameOver) return;
            dispatch({ type: 'Show_Answer' });
          }}
        >
          {showAnswer ? text : isGameOver ? '?????' : 'Ready?'}
        </animated.p>

        {/* LETTERS */}
        {letterSprings.map((style, i) => (
          <animated.span
            key={`bowling-letter-${text}-${i}-${splitText[i]}`}
            className={Styles.LetterCSS.className}
            style={{
              ...style,
              backgroundColor:
                bowlColors[i] || bowlColors[i - bowlColors.length],
            }}
          >
            {splitText[i]}
          </animated.span>
        ))}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.ControlsCSS.styles}
        {Styles.RoundCounterCSS.styles}
        {Styles.TextCSS.styles}
        {Styles.LetterCSS.styles}
      </div>
    </SeoWrapper>
  );
}
