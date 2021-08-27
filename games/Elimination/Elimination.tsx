import React, { useCallback, useEffect } from 'react';

import { useStore } from 'contexts/store';
import {
  useAudio,
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
  useSplit2Rows,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './Elimination.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { RowOfTwoSidedCards } from 'games/_components';
import GameWrapper from 'components/GameWrapper';
import { nextRoundData, arrOfRandoNum } from 'games/_utils';
import { getGameFileUrl } from 'utils/getCloudUrls';
// import { googleEvent } from 'helpers/ga';

// CONSTANTS
const gameOverAudioURL = getGameFileUrl('Elimination/game-over.wav');
const ohYeahAudioURL = getGameFileUrl('Elimination/oh-yeah.mp3');
const getBackCard = (isX: boolean) => (isX ? ['X', 'red'] : ['O', 'lime']);
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

export default function Elimination({ title, description }: GameSEOProps) {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // AUDIO
  const [GameOverAudio, resetGameOverAudio] = useAudio(gameOverAudioURL);
  const [OhYeahAudio, resetOhYeahAudio] = useAudio(ohYeahAudioURL);

  // STATE
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, gameData, isVocab, Xs, xCount, clickedIDs, clickedID } = state;

  // REFS
  const isFirstRun = useFirstRun();
  const [refs, resizeText] = useFitText(gameData);
  const splitRows = useSplit2Rows(refs, gameData);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    const boxCount = getBoxCount(isVocab);
    // get a unique array of indexes for our 'chosen' blocks
    const Xs = arrOfRandoNum(boxCount - 1, 0, xCount, true);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [nex, rest] = nextRoundData(boxCount, data, fullData);
    dispatch({ type: 'New_Round', data: rest, gameData: nex, Xs });
  }, [data, isVocab, xCount]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      dispatch({ type: 'xCount_Changed', xCount: Number(key) });
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

  // after a card is spun
  useEffect(() => {
    if (clickedID === null) return;
    const id = setTimeout(() => dispatch({ type: 'Animate_Done' }), 1550);
    return () => clearTimeout(id);
  }, [clickedID, dispatch]);

  // handles sound effects
  useEffect(() => {
    if (isFirstRun) return;
    if (clickedID === null) {
      resetGameOverAudio();
      resetOhYeahAudio();
      return;
    }
    if (Xs.includes(clickedID)) {
      GameOverAudio.current.play();
    } else {
      OhYeahAudio.current.play();
    }
  }, [clickedID, Xs]);

  // after cards are done animating, resize the text
  useEffect(() => {
    if (isFirstRun) return;
    const id = setTimeout(resizeText, 1550);
    return () => clearTimeout(id);
  }, [resizeText, clickedIDs.length]);

  // all cards are clicked, reset the game
  useEffect(() => {
    if (clickedIDs.length !== gameData.length) return;
    const id = setTimeout(handleGame, 1000);
    return () => clearTimeout(id);
  }, [clickedIDs.length, gameData.length]);

  // resets game if xCount changes
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
  }, [xCount]);

  // GAME FUNCTIONS HERE
  const _handleClick = useCallback(
    e => dispatch({ type: 'Card_Clicked', id: Number(e.currentTarget.id) }),
    [dispatch]
  );

  return (
    <GameWrapper title={title} description={description}>
      <div className={ContainerCSS.className}>
        {splitRows.map((row, i) => (
          <RowOfTwoSidedCards
            flipY
            key={'row' + i}
            rowIdx={i * 2}
            rowArr={row}
            targets={Xs}
            colors={colors}
            clickedID={clickedID}
            clickedIDs={clickedIDs}
            handleClick={_handleClick}
            getBackCard={getBackCard}
            cardClass={Styles.CardCSS.className}
            fitTextClass={Styles.FitTextCSS.className}
          />
        ))}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.FitTextCSS.styles}
        {Styles.CardCSS.styles}
      </div>
    </GameWrapper>
  );
}
