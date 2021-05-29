import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import classNames from 'classnames';
import { FaPlay, FaRandom, FaSyncAlt } from 'react-icons/fa';
import { animated, useSpring, useSprings } from 'react-spring';

import { useStore } from 'contexts/store';
import { useData, useHandleGame, useKeys } from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './LetterBowling.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { getRandoNum, nextRoundData } from 'games/_utils';
import Popup from 'components/Popup';

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

export default function LetterBowling() {
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
    <div className={ContainerCSS.className}>
      {/* CONTROLS */}
      <div className={Styles.ControlsCSS.className}>
        <Popup
          owner={
            <button
              className={classNames(
                Styles.ButtonCSS.className,
                Styles.ButtonGrayCSS.className
              )}
              onClick={() => dispatch({ type: 'Shuffle_Letters' })}
              disabled={disableShuffle}
            >
              <FaRandom className={Styles.ButtonSVGCSS.className} />
            </button>
          }
          placement="left"
          content="Shuffle the letters"
          hideTooltip={disableShuffle}
        />

        <Popup
          owner={
            <button
              className={classNames(
                Styles.ButtonCSS.className,
                !disablePlay
                  ? Styles.ButtonBlueCSS.className
                  : Styles.ButtonGrayCSS.className
              )}
              onClick={() => {
                // if (round === 1) googleEvent(title);
                dispatch({ type: 'Bowl_Start' });
              }}
              disabled={disablePlay}
            >
              <FaPlay className={Styles.ButtonSVGCSS.className} />
            </button>
          }
          placement="bottom"
          content="Start the round"
          hideTooltip={disablePlay}
        />

        <Popup
          owner={
            <button
              className={classNames(
                Styles.ButtonCSS.className,
                showAnswer
                  ? Styles.ButtonBlueCSS.className
                  : Styles.ButtonGrayCSS.className
              )}
              onClick={handleGame}
            >
              <FaSyncAlt className={Styles.ButtonSVGCSS.className} />
            </button>
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
            backgroundColor: bowlColors[i] || bowlColors[i - bowlColors.length],
          }}
        >
          {splitText[i]}
        </animated.span>
      ))}

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.ButtonCSS.styles}
      {Styles.ButtonGrayCSS.styles}
      {Styles.ButtonBlueCSS.styles}
      {Styles.ControlsCSS.styles}
      {Styles.ButtonSVGCSS.styles}
      {Styles.RoundCounterCSS.styles}
      {Styles.TextCSS.styles}
      {Styles.LetterCSS.styles}
    </div>
  );
}