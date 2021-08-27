/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { animated, config, useSpring, useTransition } from 'react-spring';

import { useStore } from 'contexts/store';
import { useData, useHandleGame, useFitText, useKeys } from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './Nunchi.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

export default function Nunchi({ title, description }: GameSEOProps) {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // STATE - useData
  const primary = store.expressions;
  const secondary = null;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, text, showReady } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const readyTransition = useTransition(showReady, {
    from: { opacity: 0, translateY: '-300px' },
    enter: { opacity: 1, translateY: '0px' },
    leave: { opacity: 0, translateY: '700px' },
  });
  const textStyles = useSpring({
    opacity: !showReady ? 1 : 0,
    config: config.wobbly,
    immediate: showReady,
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (showReady) {
      // googleEvent(title);
      dispatch({ type: 'Show_Ready_False' });
    } else {
      const [[cur], nex] = nextRoundData(1, data, store.expressions);
      dispatch({ type: 'New_Round', text: cur, data: nex });
    }
  }, [data, showReady]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  useKeys(handleGame); // no specific in game events

  return (
    <GameWrapper title={title} description={description}>
      <div className={ContainerCSS.className} onClick={handleGame}>
        <div className={Styles.TextContainerCSS.className}>
          {readyTransition(
            (style, item) =>
              item && (
                <animated.p
                  style={style}
                  className={Styles.ReadyTextCSS.className}
                >
                  Ready?
                </animated.p>
              )
          )}

          <animated.div style={textStyles} className={Styles.TextCSS.className}>
            <FitText text={text} ref={ref} />
          </animated.div>
        </div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.TextContainerCSS.styles}
        {Styles.ReadyTextCSS.styles}
        {Styles.TextCSS.styles}
      </div>
    </GameWrapper>
  );
}
