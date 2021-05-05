/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import shuffle from 'lodash.shuffle';
import classNames from 'classnames';

import { useStore } from 'contexts/store';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './KimchiElimination.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import FitText from 'components/FitText';
import { getRandoNum } from 'games/_utils';

export default function KimchiElimination() {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

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
      // googleEvent(title);
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(store.expressions) : rest;
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
                src="https://res.cloudinary.com/dastrong/image/upload/v1570941137/TeacherSite/Games/Kimchi.svg"
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
