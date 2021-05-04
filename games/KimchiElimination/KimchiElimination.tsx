/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import shuffle from 'lodash.shuffle';

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
    noClick,
  } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const textSlideStyles = useSpring({
    from: { x: !showPic ? '0' : '-100%', opacity: !showPic ? 1 : 0 },
    to: { x: !showPic ? '100%' : '0', opacity: !showPic ? 0 : 1 },
    config: { duration: 1000 },
  });
  const picSlideStyles = useSpring({
    from: { x: showPic ? '0' : '-100%', opacity: showPic ? 1 : 0 },
    to: { x: showPic ? '100%' : '0', opacity: showPic ? 0 : 1 },
    config: { duration: 1000 },
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    if (noClick) return;
    if (showPic) {
      // googleEvent(title);
      const [text, ...rest] = data;
      const newData = rest.length < 1 ? shuffle(store.expressions) : rest;
      const isKimchi = getRandoNum(100) < kimchiFrequency;
      dispatch({ type: 'New_Round', text, data: newData, isKimchi });
    } else {
      dispatch({ type: 'Show_Pic' });
    }
  }, [data, showPic, kimchiFrequency, noClick]);
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
  // hide the kimchi frequency after adjusting it
  useEffect(() => {
    if (!showKimchiFrequency) return;
    dispatch({ type: 'Hide_Kimchi_Frequency' });
  }, [dispatch, showKimchiFrequency]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'No_Click' }), 750);
    return () => clearTimeout(id);
  }, [dispatch, showPic]);

  return (
    <div className={ContainerCSS.className} onClick={handleGame}>
      <animated.div
        className={Styles.SlideCSS.className}
        style={{ ...textSlideStyles, backgroundColor: 'pink' }}
      >
        <FitText text={text} ref={ref} />
      </animated.div>

      <animated.div
        className={Styles.SlideCSS.className}
        style={picSlideStyles}
      >
        {isKimchi ? (
          <img
            alt="kimchi; disable your adblock?"
            className="kim-img"
            src="https://res.cloudinary.com/dastrong/image/upload/v1570941137/TeacherSite/Games/Kimchi.svg"
          />
        ) : (
          <span className="poo-img" role="img" aria-label="poo emoji">
            💩
          </span>
        )}
      </animated.div>

      {/* <ShowUpdatedSetting
        isIn={showKimchiFrequency}
        text={kimchiFrequency}
        symbol="%"
      /> */}

      {/* STYLES */}
      {ContainerCSS.styles}
      {Styles.SlideCSS.styles}
      <style jsx>{`
        .slide_text {
          background-color: violet;
        }

        .slide_pic {
        }

        .kim-img,
        .poo-img {
          user-select: none;
          width: 50%;
          min-width: 500px;
          max-width: 800px;
          margin: auto;
        }

        .poo-img {
          line-height: 100%;
          height: 350px;
          font-size: 300px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
