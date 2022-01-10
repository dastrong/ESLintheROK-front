/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import classNames from 'classnames';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './KimchiElimination.state';
import type { GameStore } from './KimchiElimination.types';
import * as Styles from './KimchiElimination.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { getRandoNum, nextRoundData } from 'games/_utils';
import FitText from 'components/FitText';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
const KimchiURL = getGameFileUrl('KimchiElimination/GameCover.svg');

export default function KimchiElimination({ title }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.expressions;
  const secondary = null;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const {
    data,
    text,
    showPic,
    isKimchi,
    kimchiFrequency,
    showKimchiFrequency,
    isAnimating,
  } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const transitions = useTransition(showPic, {
    from: { translateX: '100%', opacity: 0 },
    enter: { translateX: '0%', opacity: 1 },
    leave: { translateX: '-100%', opacity: 0 },
  });
  const [imgStyles] = useSpring({ opacity: showPic ? 1 : 0, immediate: true }, [
    showPic,
  ]);
  const [kimchiFrequencyStyles] = useSpring(
    {
      opacity: showKimchiFrequency ? 1 : 0,
      onRest: () => dispatch({ type: 'Hide_Kimchi_Frequency' }),
    },
    [showKimchiFrequency]
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (isAnimating) return;
    if (showPic) {
      track.newRound(title);
      const [[text], newData] = nextRoundData(1, data, store.expressions);
      const isKimchi = getRandoNum(100) < kimchiFrequency;
      dispatch({ type: 'New_Round', text, data: newData, isKimchi });
    } else {
      dispatch({ type: 'Show_Pic' });
    }
  }, [data, showPic, kimchiFrequency, isAnimating]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Kimchi_Frequency_Decrease' });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Kimchi_Frequency_Increase' });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      dispatch({
        type: scrolledUp
          ? 'Kimchi_Frequency_Increase'
          : 'Kimchi_Frequency_Decrease',
      }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  // don't allow clicks until the animation is complete
  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'Animation_Done' }), 750);
    return () => clearTimeout(id);
  }, [dispatch, showPic]);

  return (
    <div className={ContainerCSS.className} onClick={handleGame}>
      {transitions((style, item) =>
        item ? (
          <animated.div className={Styles.SlideCSS.className} style={style}>
            {isKimchi ? (
              <animated.img
                style={imgStyles}
                className={Styles.KimchiCSS.className}
                alt="kimchi; disable your adblock?"
                src={KimchiURL}
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/accessible-emoji
              <animated.span
                style={imgStyles}
                className={classNames(
                  Styles.KimchiCSS.className,
                  Styles.PooCSS.className
                )}
                aria-label="poo emoji"
              >
                💩
              </animated.span>
            )}
          </animated.div>
        ) : (
          <animated.div
            className={Styles.SlideCSS.className}
            style={{ ...style, backgroundColor: 'violet' }}
          >
            <FitText text={text} ref={ref} />
          </animated.div>
        )
      )}

      <animated.div
        style={kimchiFrequencyStyles}
        className={Styles.FrequencyCSS.className}
      >
        {kimchiFrequency}%
      </animated.div>

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.SlideCSS.styles}
      {Styles.KimchiCSS.styles}
      {Styles.PooCSS.styles}
      {Styles.FrequencyCSS.styles}
    </div>
  );
}
