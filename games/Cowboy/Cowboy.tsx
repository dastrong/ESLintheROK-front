/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { animated, useSpring, useTransition, config } from 'react-spring';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import {
  useAudio,
  useData,
  useHandleGame,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './Cowboy.state';
import type { GameStore } from './Cowboy.types';
import * as Styles from './Cowboy.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
const ReloadAudioURL = getGameFileUrl('Cowboy/GunReload.mp3');
const ShotAudioURL = getGameFileUrl('Cowboy/GunShot.mp3');

export default function Cowboy({ title, description, keyCuts }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // AUDIO - useAudio
  const [ReloadAudio] = useAudio(ReloadAudioURL);
  const [ShotAudio] = useAudio(ShotAudioURL);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, text, showReady } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const textStyles = useSpring({
    opacity: showReady ? 0 : 1,
    immediate: true,
  });
  const transition = useTransition(showReady, {
    from: { opacity: 0, translateY: '-400px' },
    enter: { opacity: 1, translateY: '0px' },
    leave: { opacity: 0, translateY: '200px' },
    config: config.wobbly,
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (!ShotAudio.current || !ReloadAudio.current) return;
    if (showReady) {
      // googleEvent(title);
      ShotAudio.current.play();
      dispatch({ type: 'Show_Ready_False' });
    } else {
      // don't play the audio on mounting
      if (showReady !== null) ReloadAudio.current.play();
      const fullData = isVocab ? store.vocabulary : store.expressions;
      const [[cur], nex] = nextRoundData(1, data, fullData);
      dispatch({ type: 'New_Round', text: cur, data: nex });
    }
  }, [data, isVocab, showReady]);
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

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className} onClick={handleGame}>
        <div className={Styles.TextHolderCSS.className}>
          {transition(
            (style, item) =>
              item && (
                <animated.div
                  style={{ ...style, fontSize: '12vw' }}
                  className={Styles.TextCSS.className}
                >
                  <span>On your marks...</span>
                </animated.div>
              )
          )}

          <animated.div style={textStyles} className={Styles.TextCSS.className}>
            <FitText text={text} ref={ref} />
          </animated.div>
        </div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.TextHolderCSS.styles}
        {Styles.TextCSS.styles}
      </div>
    </GameWrapper>
  );
}
