import React, { useCallback, useEffect } from 'react';

import { useStore } from 'contexts/store';
import {
  // useAudio,
  useData,
  useHandleGame,
  useFirstRun,
  // useFitText,
  useKeys,
  useScroll,
  // useSplit2Rows,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './RedAndBlue.styles';

// IMPORT COMPONENTS/UTILITIES HERE
//

// CONSTANTS - img, audio, function, etc.
//

export default function RedAndBlue() {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // AUDIO - useAudio
  // can remove if your game doesn't use any audio

  // STATE - useData
  const primary = store.vocabulary; // vocabulary or expressions
  const secondary = store.expressions; // only expressions - can remove you only use one data source
  const gameStore: GameStore = useData(reducer, init, primary, secondary); // remove secondary from here too if above is true
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab } = state; // destructure your state array here - should be fully typed

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    dispatch({ type: 'New_Round' }); // put whatever else you need to start a new round
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
    <div className={ContainerCSS.className}>
      {/* ADD YOUR ELEMENTS/COMPONENTS HERE */}

      {/* STYLES */}
      {ContainerCSS.styles}
      {/* Add any other style elements here */}
    </div>
  );
}
