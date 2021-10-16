import React, { useCallback } from 'react';
import { animated, useTransition } from 'react-spring';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './WordShark.state';
import type { GameStore } from './WordShark.types';
import * as Styles from './WordShark.styles';
import WordSharkSharks from './WordSharkSharks';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import { getGameFileUrl } from 'utils/getCloudUrls';
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';
import Button from 'components/Button';

// CONSTANTS - img, audio, function, etc.
const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '123456789';
const specialChars = ".,?!':; ";
const StickmanHelpURL = getGameFileUrl('WordShark/Stickman-Help.svg');
const StickmanThanksURL = getGameFileUrl('WordShark/Stickman-Thanks.svg');
const StickmanNoURL = getGameFileUrl('WordShark/Stickman-No.svg');
const HelicopterURL = getGameFileUrl('WordShark/Helicopter.svg');

export default function WordShark({
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
  const {
    data,
    isVocab,
    answer,
    guessed,
    numWrong,
    maxWrong,
    failed,
    success,
    showAnswer,
  } = state;
  const textToShow = showAnswer
    ? answer
    : answer
        .split('')
        .map(letter => {
          if (specialChars.includes(letter)) return letter;
          return guessed.has(letter.toLowerCase()) ? letter : '_';
        })
        .join('');
  const speechBubbleText = failed
    ? 'NOOOO!'
    : success
    ? 'THANK YOU!'
    : 'HELP ME!';

  // REFS - useFitText, useSplit2Rows, etc..
  const [[answerRef]] = useFitText(textToShow);
  const [[speechBubbleRef]] = useFitText(speechBubbleText);

  const playAgainShowAnswerTransition = useTransition(success || failed, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    track.newRound(title);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData, true);
    dispatch({ type: 'New_Round', data: nex, answer: cur });
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      // change isVocab
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      // change maxWrong
      if (key === 'ArrowUp') return dispatch({ type: 'Increase_Max_Wrong' });
      if (key === 'ArrowDown') return dispatch({ type: 'Decrease_Max_Wrong' });
      if (numbers.includes(key)) {
        return dispatch({ type: 'Set_Max_Wrong', maxWrong: Number(key) });
      }
      if (letters.includes(key.toLowerCase())) {
        // check if letter was pushed, if it was previously guessed and dispatch it
        return dispatch({ type: 'Handle_Guess', letter: key });
      }
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      // can remove the following if there's only one data source
      dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(scrollCB);

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className}>
        {/* ALPHABET BOXES */}
        <div className={Styles.AlphabetButtonContainerCSS.className}>
          {letters.split('').map(letter => {
            const isClicked = guessed.has(letter);
            return (
              <Button
                key={letter}
                size="xl"
                color="white"
                bgColor="darkgray"
                text={isClicked ? '' : `${letter.toUpperCase()}${letter}`}
                className={Styles.AlphabetButtonCSS.className}
                disabled={isClicked}
                onClick={() =>
                  dispatch({ type: 'Handle_Guess', letter: letter })
                }
              />
            );
          })}
        </div>

        {/* CONTENT CONTAINER*/}
        <div className={Styles.ContentOuterContainerCSS.className}>
          <div className={Styles.ContentInnerContainerCSS.className}>
            {/* PLATFORM */}
            <div
              className={Styles.PlatformCSS.className}
              style={{
                transform: `scale(${1 - Math.min(numWrong / maxWrong, 0.8)})`,
                opacity: failed ? 0 : 1,
              }}
            />
            <div
              className={Styles.StickmanContainerCSS.className}
              style={{ transform: `translateY(${failed ? '15vh' : '0vh'})` }}
            >
              {/* SPEECH BUBBLE */}
              <div className={Styles.SpeechBubbleCSS.className}>
                <FitText
                  ref={speechBubbleRef}
                  text={speechBubbleText}
                  cx={Styles.SpeechBubbleTextCSS.className}
                />
              </div>
              {/* STICKMEN */}
              {failed ? (
                <img
                  src={StickmanNoURL}
                  alt="stickman saying no"
                  className={Styles.StickmanCSS.className}
                />
              ) : success ? (
                <img
                  src={StickmanThanksURL}
                  alt="stickman saying thanks"
                  className={Styles.StickmanCSS.className}
                  style={{ marginLeft: 6 }}
                />
              ) : (
                <img
                  src={StickmanHelpURL}
                  alt="stickman saying help"
                  className={Styles.StickmanCSS.className}
                />
              )}
            </div>

            {/* HELICOPTER */}
            <img
              src={HelicopterURL}
              alt="helicopter"
              className={Styles.HelicopterCSS.className}
            />

            {/* SHARKS */}
            <WordSharkSharks />
          </div>
        </div>

        {/* BLANK CONTAINER */}
        <div className={Styles.OuterBlankContainerCSS.className}>
          <div className={Styles.InnerBlankContainerCSS.className}>
            <FitText
              ref={answerRef}
              text={textToShow}
              cx={Styles.AnswerTextCSS.className}
            />
          </div>
        </div>

        {/* NUM/MAX WRONG CONTAINER */}
        <div className={Styles.WrongContainerCSS.className}>
          {numWrong}
          <br />
          /
          <br />
          {maxWrong}
        </div>

        {/* PLAY AGAIN / SHOW ANSWER BUTTONS */}
        {playAgainShowAnswerTransition(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                className={Styles.ButtonsContainerCSS.className}
              >
                <Button
                  color="white"
                  bgColor="#178a09"
                  text="New Round"
                  onClick={handleGame}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button
                  color="white"
                  bgColor="#629e12"
                  text="Show Answer"
                  onClick={() => dispatch({ type: 'Show_Answer' })}
                  style={{ flex: 1 }}
                  disabled={showAnswer}
                />
              </animated.div>
            )
        )}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.ContentOuterContainerCSS.styles}
        {Styles.ContentInnerContainerCSS.styles}
        {Styles.StickmanContainerCSS.styles}
        {Styles.StickmanCSS.styles}
        {Styles.PlatformCSS.styles}
        {Styles.SpeechBubbleCSS.styles}
        {Styles.SpeechBubbleTextCSS.styles}
        {Styles.HelicopterCSS.styles}
        {Styles.AlphabetButtonContainerCSS.styles}
        {Styles.AlphabetButtonCSS.styles}
        {Styles.OuterBlankContainerCSS.styles}
        {Styles.InnerBlankContainerCSS.styles}
        {Styles.ButtonsContainerCSS.styles}
        {Styles.WrongContainerCSS.styles}
        {Styles.AnswerTextCSS.styles}
      </div>
    </GameWrapper>
  );
}
