import React, { useCallback, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

import { useStore } from 'contexts/store';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore, MinimumStars } from './state_types';
import * as Styles from './Stars.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { TwoSidedCard } from 'games/_components';
import { nextRoundData, arrOfRandoNum } from 'games/_utils';

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
const starColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
];
const getBoxCount = (isVocab: boolean) => (isVocab ? 8 : 6);
const maximumStars = 6;

export default function Stars() {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, clickedIDs, stars, minimumStars } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [refs] = useFitText(gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const boxCount = getBoxCount(isVocab);
    // how many 'stars' for each box
    const stars = arrOfRandoNum(maximumStars, minimumStars, boxCount);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [nex, rest] = nextRoundData(boxCount, data, fullData);
    dispatch({ type: 'New_Round', data: rest, gameData: nex, stars });
  }, [data, isVocab, minimumStars]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      const pressedNum = Number(key);
      if (!pressedNum || pressedNum > 5) return;
      dispatch({
        type: 'Change_Min_Stars',
        minNumOfStars: pressedNum as MinimumStars,
      });
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

  // GAME EFFECTS
  // if minStars are changed, reset the game
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
  }, [minimumStars]);

  // reset the game if all the cards have been clicked
  useEffect(() => {
    if (isFirstRun) return;
    if (clickedIDs.length !== gameData.length) return;
    const id = setTimeout(() => handleGame(), 5000);
    return () => clearInterval(id);
  }, [clickedIDs.length, gameData.length]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: 'Card_Clicked', id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  return (
    <div className={ContainerCSS.className}>
      {gameData.map((text, i) => {
        // generate an array of our stars icons
        const starIcons = [...Array(stars[i])].map((x, j) => (
          <FaStar
            key={starColors[i] + j}
            color={starColors[i]}
            style={{
              height: 'auto',
              width: '15%',
              transform: 'rotate(180deg)',
            }}
          />
        ));

        return (
          <TwoSidedCard
            id={i}
            key={text + i}
            ref={refs[i]}
            textFront={text}
            textBack={starIcons}
            colorFront={colors[i]}
            colorBack="white"
            width="50vw"
            height={isVocab ? '25vh' : '33.4vh'}
            handleClick={_handleClick}
            flipX={clickedIDs.includes(i)}
            cardClass={Styles.CardCSS.className}
            fitTextClass={Styles.FitTextCSS.className}
          />
        );
      })}

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.CardCSS.styles}
      {Styles.FitTextCSS.styles}
    </div>
  );
}