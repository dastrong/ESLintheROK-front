import React, { useCallback, useEffect } from 'react';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './WordShark.state';
import type { GameStore } from './WordShark.types';
import * as Styles from './WordShark.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
import background from './images/word-shark_background.jpg';
import img0 from './images/0.svg';
import img1 from './images/1.svg';
import img2 from './images/2.svg';
import img3 from './images/3.svg';
import img4 from './images/4.svg';
import img5 from './images/5.svg';
import img6 from './images/6.svg';
import img7 from './images/7.svg';
import img8 from './images/8.svg';
const maxWrong = 8;
const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8];
const letters = 'abcdefghijklmnopqrstuvwxyz';
// const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

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
  const { data, isVocab, answer, guessed, nWrong } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [[ref]] = useFitText(answer);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData, true);
    dispatch({ type: 'New_Round', data: nex, answer: cur });
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      // can remove the following if there's only one data source
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
      // can remove the following if there's only one data source
      dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    //
  }, []);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className}>
        <div className="Hangman-imgContainer">
          <div className="Hangman-imgs">
            <img
              className="Hangman-WordSharkBackgroundImg"
              src={background}
              alt="background for Word Shark, showing stickman and shark"
            />
            <img
              className="Hangman-WordSharkOverlayImgs"
              src={images[nWrong]}
              alt={altText}
            />
          </div>
        </div>
        <div className="Hangman-guessContainer">
          <p className="Hangman-guessesLeft">{`${maxWrong - nWrong} guess${
            nWrong === maxWrong - 1 ? '' : 'es'
          } left`}</p>
          <p className="Hangman-word-holder">
            <FitText text={_guessedWord()} ref={ref} cx="Hangman-word" />
          </p>
        </div>
        <div className="letter-buttons">
          {gameState}
          <button className="Hangman-restartBtn" onClick={_handleNewRound}>
            New Round
          </button>
        </div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {/* Add any other style elements here */}
      </div>
    </GameWrapper>
  );
}
