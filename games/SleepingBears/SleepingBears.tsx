/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { animated, useSpring } from 'react-spring';
import classNames from 'classnames';

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

import { init, reducer } from './SleepingBears.state';
import type { GameStore, NumOfBoxes } from './SleepingBears.types';
import * as Styles from './SleepingBears.styles';
import SleepingBearsCard from './SleepingBearsCard';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { nextRoundData, splitString } from 'games/_utils';
import { AnswerBox } from 'games/_components';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
const Bear1URL = getGameFileUrl('SleepingBears/Bear-1.png');
const Bear2URL = getGameFileUrl('SleepingBears/Bear-2.png');
const Bear3URL = getGameFileUrl('SleepingBears/Bear-3.png');
const Bear4URL = getGameFileUrl('SleepingBears/Bear-4.png');
const bearImgs = [Bear1URL, Bear2URL, Bear3URL, Bear4URL];

export default function SleepingBears({ title }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, answer, numOfBoxes, stage } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [refs] = useFitText(gameData);
  const containerStyles = useSpring({
    opacity: stage < gameData.length * 2 + 2 ? 1 : 0,
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData, true);
    const gameData = splitString(cur, numOfBoxes);
    dispatch({
      type: 'New_Round',
      data: nex,
      gameData: shuffle(gameData),
      answer: cur,
    });
  }, [data, isVocab, numOfBoxes]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      const keyNum = Number(key);
      if (!keyNum) return;
      if (keyNum < 2 || keyNum > 4) return;
      dispatch({ type: 'Box_Num_Change', numOfBoxes: keyNum as NumOfBoxes });
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
    if (isFirstRun) return;
    handleGame();
  }, [numOfBoxes]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  function _handleClick() {
    dispatch({ type: 'Stage_Change' });
    if (gameData.length * 2 + 3 === stage) {
      handleGame();
    }
    if (stage === 1) {
      track.newRound(title);
    }
  }

  return (
    <div className={ContainerCSS.className} onClick={_handleClick}>
      <AnswerBox
        showBox={gameData.length * 2 + 2 === stage}
        showText={gameData.length * 2 + 3 === stage}
        answer={answer}
      />

      <animated.div
        style={containerStyles}
        className={Styles.CardsContainerCSS.className}
      >
        {gameData.map((text, i) => (
          <SleepingBearsCard
            key={i + text}
            src={bearImgs[i]}
            text={text}
            ref={refs[i]}
            showText={(i + 1) * 2 === stage}
            cxCard={classNames(
              Styles.CardCSS.className,
              Styles.CardSharedCSS.className,
              { [Styles.CardExpanded.className]: numOfBoxes === 2 },
              { [Styles.CardExpanded.className]: numOfBoxes === 3 && i === 2 }
            )}
            cxContent={classNames(
              Styles.CardSharedCSS.className,
              Styles.CardContentCSS.className
            )}
          />
        ))}
      </animated.div>

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.CardsContainerCSS.styles}
      {Styles.CardCSS.styles}
      {Styles.CardSharedCSS.styles}
      {Styles.CardContentCSS.styles}
      {Styles.CardExpanded.styles}
    </div>
  );
}
