/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { animated, config, useSpring } from 'react-spring';

import { useStore } from 'contexts/store';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
} from 'hooks';

import { init, reducer } from './state_manager';
import type {
  GameStore,
  NumOfMissing,
  NumOfWords,
  StageNames,
} from './state_types';
import * as Styles from './WhatsMissing.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { arrOfRandoNum, nextRoundData } from 'games/_utils';
import SeoWrapper from 'components/SeoWrapper';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
const stages: StageNames[] = [
  'SHOW_INFO',
  'SHOW_ALL',
  'SHOW_SOME',
  'SHOW_MISSING',
];
const widthsAndHeights = [95, 45, 28];
const maxAngle = 5;
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

export default function WhatsMissing({ title, description }: GameSEOProps) {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = null;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const {
    data,
    allText,
    missingText,
    otherText,
    numOfMissing,
    numOfWords,
    stage,
  } = state;
  const curStage = stages[stage - 1];

  // get the correct set words to show the user; based off their stage
  const words = ((currentStage: StageNames) => {
    switch (currentStage) {
      case 'SHOW_INFO':
        return [];
      case 'SHOW_ALL':
        return allText;
      case 'SHOW_SOME':
        return otherText;
      default:
        return missingText;
    }
  })(curStage);

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [[infoTextRef]] = useFitText([numOfMissing]);
  const infoTextStyles = useSpring({
    scale: curStage === 'SHOW_INFO' ? 1 : 0,
    config: config[curStage === 'SHOW_INFO' ? 'wobbly' : 'default'],
  });
  const [wordRefs] = useFitText(words);
  const wordsContainerStyles = useSpring({
    scale: curStage !== 'SHOW_INFO' ? 1 : 0,
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const missingTextIndexes = arrOfRandoNum(
      numOfWords - 1,
      0,
      numOfMissing,
      true
    );
    const [cur, nex] = nextRoundData(numOfWords, data, store.vocabulary);
    const { missingText, otherText } = cur.reduce(
      (acc, cVal, i) => {
        if (missingTextIndexes.includes(i)) {
          acc.missingText.push(cVal);
        } else {
          acc.otherText.push(cVal);
        }
        return acc;
      },
      { otherText: [], missingText: [] }
    );
    const allText = shuffle(cur);

    dispatch({ type: 'New_Round', data: nex, allText, otherText, missingText });
  }, [data, numOfWords, numOfMissing]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      const keyNum = Number(key);
      if (!keyNum) return;
      if (keyNum <= 3) {
        // 1-3 changes the number of missing
        dispatch({
          type: 'Change_NumOfMissing',
          numOfMissing: keyNum as NumOfMissing,
        });
      } else {
        // 4-9 changes the number of words allowed
        dispatch({
          type: 'Change_NumOfWords',
          numOfWords: keyNum as NumOfWords,
        });
      }
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
  }, [numOfMissing, numOfWords]);

  useEffect(() => {
    if (stage !== stages.length) return;
    // googleEvent(title);
    // }, [stage, title]);
  }, [stage]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  function _handleClick() {
    if (stage === stages.length) {
      handleGame();
    } else {
      dispatch({ type: 'Change_Stage' });
    }
  }

  const [widths, heightVal] = getWandH(words.length);
  const shuffledColors = shuffle(colors);
  const transforms = arrOfRandoNum(maxAngle, -maxAngle, words.length, false);

  return (
    <SeoWrapper title={title} description={description}>
      <div className={ContainerCSS.className} onClick={_handleClick}>
        {/* TELLS THE USER HOW MANY WORDS WILL BE MISSING */}
        <animated.div
          style={infoTextStyles}
          className={Styles.InfoCSS.className}
        >
          <FitText
            ref={infoTextRef}
            text={`${numOfMissing} Missing!`}
            cx={Styles.InfoFitTextCSS.className}
          />
        </animated.div>

        {/* SHOW ALL THE WORDS, SO THE USER CAN QUICKLY MEMORIZE THEM */}
        {/* THEN ... SHOW ONLY THE REMAINING WORDS, USER MUST GUESS WHAT'S MISSING */}
        {/* THEN ... SHOW THE MISSING WORDS */}
        <animated.div
          style={wordsContainerStyles}
          className={Styles.CardContainerCSS.className}
        >
          {words.map((word, i) => {
            const color = shuffledColors[i];
            const height = `${heightVal}vh`;
            const width = `${widths[i]}vw`;
            const transform = `rotate(${transforms[i]}deg)`;
            return (
              <div
                className={Styles.CardCSS.className}
                style={{ color, transform, height, width }}
              >
                <FitText text={word} ref={wordRefs[i]} />
              </div>
            );
          })}
        </animated.div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.InfoCSS.styles}
        {Styles.InfoFitTextCSS.styles}
        {Styles.CardContainerCSS.styles}
        {Styles.CardCSS.styles}
      </div>
    </SeoWrapper>
  );
}

// OTHER FUNCTIONS
// returns an array of widths dependant on the number of words and their heights
function getWandH(numOfWords: number): [string[], number] {
  if (!numOfWords) return [[], 0];

  const columns = getColumns(numOfWords);
  const rows = getRows(numOfWords, columns);
  const height = getValue(rows);

  const rowIndexes = Array.from(Array(rows), (_, i) => i);
  const numOfRowsAffected = getNumOfRowsToExpand(numOfWords, columns);
  const targetRowIndexes = arrOfRandoNum(rows - 1, 0, numOfRowsAffected, true);
  const sortedTargets = targetRowIndexes.sort((a, b) => a - b);

  const widths = rowIndexes.reduce((acc, cVal) => {
    const columnsUsed = sortedTargets.includes(cVal) ? columns - 1 : columns;
    const tempArr = Array.from(Array(columnsUsed), () => getValue(columnsUsed));
    return [...acc, ...tempArr];
  }, []);

  return [widths, height];
}

// gets the number of columns needed
function getColumns(numOfWords: number) {
  if (numOfWords <= 3) return 1;
  if (numOfWords <= 6) return 2;
  return 3;
}

// gets the number of rows needed
function getRows(numOfWords: number, columns: number) {
  return Math.ceil(numOfWords / columns);
}

// how many rows will need expanded cards
function getNumOfRowsToExpand(numOfWords: number, columns: number) {
  const rem = numOfWords % columns;
  return !rem ? 0 : columns - rem;
}

// gets the height/width for a card
function getValue(length: number) {
  return widthsAndHeights[length - 1];
}
