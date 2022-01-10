import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { animated, useSprings, useSpring } from 'react-spring';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
} from 'hooks';

import { init, reducer } from './FirstAndLastLetter.state';
import type { GameStore } from './FirstAndLastLetter.types';
import * as Styles from './FirstAndLastLetter.styles';
import FirstAndLastLetterNotice from './FirstAndLastLetterNotice';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import { getRandoNum } from 'games/_utils';
import type { GameSEOProps } from 'games/types';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
const letters = 'abcdefghijklmnopqrstuvwxyz';
const duration = 500;

export default function FirstAndLastLetter({ title }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const gameStore: GameStore = useData(reducer, init, primary);
  const [state, dispatch, didUpdate] = gameStore;
  const { oldWord, newWord, startingLetter, error, stage, colors, words } =
    state;

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [[topTextTop]] = useFitText(oldWord);
  const [[bottomTextTop]] = useFitText(newWord);
  const hiddenInput = useRef(null);

  const gradientSpring = useSpring({
    y: stage !== 0 ? '-50%' : '0%',
    config: { duration: stage === 0 ? 0 : duration },
    delay: stage === 0 ? 0 : duration,
  });

  const containerSpring = useSpring({
    y: stage !== 0 ? '-50%' : '0%',
    config: { duration: stage === 0 ? 0 : duration },
    delay: stage === 0 ? 0 : duration,
  });

  const oldTextContainerSpring = useSpring({
    opacity: stage === 1 ? 0 : 1,
    config: { duration: stage !== 2 ? 0 : duration },
    delay: stage !== 2 ? 0 : duration,
  });

  const newTextSprings = useSprings(
    newWord.length,
    newWord.split('').map((_, i, letters) => ({
      color:
        (stage === 2 && i === letters.length - 1) || stage === 1
          ? 'red'
          : 'black',
      delay: i * (duration / newWord.length),
      onRest: () => {
        // if we're on the last letter in the string, we'll change the stage
        // unless we're on stage 2
        if (i === letters.length - 1 && stage !== 2) {
          dispatch({ type: 'Animation_Completed' });
        }
      },
    }))
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // get a random starting character as a backup for each round
    const newStartingLetter = letters[getRandoNum(25)];
    const oldColor = colors.shift();
    const newColors = [...colors, oldColor];
    dispatch({ type: 'New_Round', newStartingLetter, newColors });
    hiddenInput.current.focus(); // focus the hidden input
  }, [colors]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    (e: KeyboardEvent) => {
      // holding control and hitting space or enter, starts a new round
      if (e.ctrlKey) {
        if (e.code === 'Space' || e.key === 'Enter') {
          return handleGame();
        }
      }
      // if there's an error or we're in the middle of animations, do nothing on enter click
      if (error || stage !== 0) return;
      // Enter was clicked, either start a new round or submit the current word
      if (e.key === 'Enter') {
        if (!newWord.length) {
          return handleGame();
        } else {
          track.newRound(title);
          return dispatch({ type: 'Submit_And_Check' });
        }
      }
    },
    [dispatch, newWord, stage, error]
  );
  useKeys(handleGame, keysCB, ['Enter', 'Space']);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  // once an animation is done, reset the game
  useEffect(() => {
    if (isFirstRun) return;
    let id: NodeJS.Timeout;
    if (stage === 2) id = setTimeout(handleGame, duration);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div className={ContainerCSS.className}>
      <animated.div
        className={Styles.GradientCSS.className}
        style={{
          ...gradientSpring,
          background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        }}
      />

      <animated.div
        className={Styles.TextContainerCSS.className}
        style={containerSpring}
      >
        <div
          className={classNames(
            Styles.OuterTextContainerCSS.className,
            Styles.TopTextContainerCSS.className
          )}
        >
          <div className={Styles.InnerTextContainerCSS.className}>
            <FitText ref={topTextTop}>
              {(oldWord || startingLetter).split('').map((letter, i, arr) => (
                <animated.span
                  key={letter + i}
                  style={{
                    ...oldTextContainerSpring,
                    color: i !== arr.length - 1 ? 'inherit' : 'red',
                  }}
                >
                  {letter}
                </animated.span>
              ))}
              <span
                className={Styles.BlinkingCursorCSS.className}
                style={{ visibility: 'hidden' }}
              >
                |
              </span>
            </FitText>
          </div>
        </div>

        <div
          className={classNames(
            Styles.OuterTextContainerCSS.className,
            Styles.BottomTextContainerCSS.className
          )}
        >
          <div className={Styles.InnerTextContainerCSS.className}>
            <FitText ref={bottomTextTop}>
              {newWord.split('').map((letter, i) => (
                <animated.span key={letter + i} style={newTextSprings[i]}>
                  {letter}
                </animated.span>
              ))}
              <span
                className={Styles.BlinkingCursorCSS.className}
                style={{ visibility: stage !== 0 ? 'hidden' : 'visible' }}
              >
                |
              </span>
            </FitText>
          </div>
        </div>
      </animated.div>

      <div className={Styles.TotalWordsCSS.className}>
        TOTAL WORDS{' '}
        <span className={Styles.TotalWordsNumberCSS.className}>
          {words.length}
        </span>
      </div>

      <input
        type="text"
        ref={hiddenInput}
        className={Styles.HiddenInputCSS.className}
        value={newWord}
        onChange={e => {
          if (stage !== 0 || error) return;
          dispatch({ type: 'Update_Word', newWord: e.target.value });
        }}
      />

      <FirstAndLastLetterNotice error={error} />

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.GradientCSS.styles}
      {Styles.TextContainerCSS.styles}
      {Styles.OuterTextContainerCSS.styles}
      {Styles.InnerTextContainerCSS.styles}
      {Styles.TopTextContainerCSS.styles}
      {Styles.BottomTextContainerCSS.styles}
      {Styles.BlinkingCursorCSS.styles}
      {Styles.HiddenInputCSS.styles}
      {Styles.TotalWordsCSS.styles}
      {Styles.TotalWordsNumberCSS.styles}
    </div>
  );
}
