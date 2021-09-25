import React, { useCallback, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useGifs } from 'contexts/gifs';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
  useSplit2Rows,
} from 'hooks';

// IMPORT GAME SPECIFIC THINGS HERE
import { init, reducer } from './WhatsBehind.state';
import type { GameStore } from './WhatsBehind.types';
import * as Styles from './WhatsBehind.styles';
import WhatsBehindConfetti from './WhatsBehindConfetti';

// IMPORT REUSABLE COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { RowOfTwoSidedCards } from 'games/_components';
import { nextRoundData, getRandoNum } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';

// DECLARE CONSTANT VARIABLES HERE - img, audio, function, etc.
const getBackCard = (isTarget: boolean) =>
  isTarget
    ? [<FaTrophy style={{ height: '80%', width: 'auto' }} />, 'gold']
    : ['', 'white'];
const getBoxCount = (isVocab: boolean) => (isVocab ? 8 : 6);
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

export default function WhatsBehind({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const { show: showGif, gifDispatch } = useGifs();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, gameData, isVocab, clickedIDs, clickedID, target } = state;
  const foundTarget = target.includes(clickedID);

  // REFS
  const isFirstRun = useFirstRun();
  const [refs, resizeText] = useFitText(gameData);
  const splitRows = useSplit2Rows(refs, gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    const boxCount = getBoxCount(isVocab);
    // choose the target box
    const target = [getRandoNum(boxCount - 1)];
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [nex, rest] = nextRoundData(boxCount, data, fullData);
    dispatch({ type: 'New_Round', data: rest, gameData: nex, target });
  }, [data, isVocab]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
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
      dispatch({ type: 'Change_isVocab', isVocab: !scrolledUp }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS
  // after a card is spun
  useEffect(() => {
    if (clickedID === null) return;
    if (target.includes(clickedID)) return;
    const id = setTimeout(() => dispatch({ type: 'Animate_Done' }), 1050);
    return () => clearTimeout(id);
  }, [clickedID, dispatch, target]);

  // after cards are done animating, resize the text
  useEffect(() => {
    if (isFirstRun) return;
    const id = setTimeout(resizeText, 1050);
    return () => clearTimeout(id);
  }, [resizeText, clickedIDs.length]);

  // once we've found the target we want to show a GIF, but on a delay
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (foundTarget) {
      id = setTimeout(
        () => gifDispatch({ type: 'Open_Gif', show: 'single' }),
        3000
      );
    }
    return () => {
      clearTimeout(id);
    };
  }, [foundTarget]);

  // when the GIF modal is closed we'll start a new round
  useEffect(() => {
    if (!showGif) handleGame();
  }, [showGif]);

  // GAME FUNCTIONS
  const _handleClick = useCallback(
    e => dispatch({ type: 'Card_Clicked', id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className}>
        {splitRows.map((row, i) => (
          <RowOfTwoSidedCards
            flipY
            key={'row' + i}
            rowIdx={i * 2}
            rowArr={row}
            targets={target}
            colors={colors}
            clickedID={clickedID}
            clickedIDs={clickedIDs}
            handleClick={_handleClick}
            getBackCard={getBackCard}
            cardClass={Styles.CardCSS.className}
            fitTextClass={Styles.FitTextCSS.className}
          />
        ))}

        {/* Found the targeted card; rain down the confetti */}
        {foundTarget && <WhatsBehindConfetti />}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.FitTextCSS.styles}
        {Styles.CardCSS.styles}
      </div>
    </GameWrapper>
  );
}
