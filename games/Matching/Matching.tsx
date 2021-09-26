/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { animated, useSprings } from 'react-spring';
import classNames from 'classnames';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import {
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './Matching.state';
import type { GameStore } from './Matching.types';
import * as Styles from './Matching.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { getRandoGrad, nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

// CONSTANTS - img, audio, function, etc.
const boxSettings = [
  { height: '32vh', width: '48vw', poo: 0, words: 6 },
  { height: '32vh', width: '32vw', poo: 1, words: 8 },
  { height: '24vh', width: '32vw', poo: 0, words: 12 }, // default
  { height: '19vh', width: '32vw', poo: 1, words: 14 },
  { height: '24vh', width: '24vw', poo: 0, words: 16 },
];

export default function Matching({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = null;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, gameData, clicked, matched, settingsNum, background } = state;
  const { words, poo, ...boxDimensions } = boxSettings[settingsNum];

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [refs] = useFitText(gameData);
  const frontBoxStyles = useSprings(
    gameData.length,
    gameData.map((_, i) => {
      const show = clicked.includes(i) || matched.includes(i);
      return {
        opacity: !show ? 1 : 0,
        scale: !show ? 1 : 0,
      };
    })
  );
  const backBoxStyles = useSprings(
    gameData.length,
    gameData.map((_, i) => {
      const show = clicked.includes(i) || matched.includes(i);
      console.log(!!clicked.length);
      return {
        opacity: show ? 1 : 0,
        immediate: !clicked.length && !show,
      };
    })
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const num = words / 2;
    const [cur, nex] = nextRoundData(num, data, store.vocabulary);
    const round = shuffle(poo ? [...cur, ...cur, 'poo'] : [...cur, ...cur]);
    const background = getRandoGrad();
    dispatch({ type: 'New_Round', data: nex, gameData: round, background });
  }, [data, words, poo]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Box_Setting_Decrease' });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Box_Setting_Increase' });
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      dispatch({
        type: scrolledUp ? 'Box_Setting_Increase' : 'Box_Setting_Decrease',
      }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (isFirstRun) return;
    handleGame();
  }, [settingsNum]);

  useEffect(() => {
    if (matched.length !== words) return;
    track.newRound(title);
    const id = setTimeout(handleGame, 500);
    return () => clearTimeout(id);
    // }, [matched, handleGame, words, title]);
  }, [matched, handleGame, words]);

  useEffect(() => {
    if (isFirstRun) return;
    if (clicked.length === 0) return;
    const id =
      // check if user found poo on first click; reset if true
      gameData[clicked[0]] === 'poo'
        ? setTimeout(() => dispatch({ type: 'Match_No' }), 900)
        : clicked.length === 2
        ? setTimeout(() => {
            // compare the two clicked words
            gameData[clicked[0]] === gameData[clicked[1]]
              ? dispatch({ type: 'Match_Yes' })
              : dispatch({ type: 'Match_No' });
          }, 1500)
        : null;
    return () => clearTimeout(id);
  }, [clicked, gameData]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleClick = useCallback(
    e => dispatch({ type: 'Handle_Click', id: Number(e.target.id) }),
    [dispatch]
  );

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div className={ContainerCSS.className} style={{ background }}>
        {gameData.map((text, i) => (
          <div
            key={i}
            className={Styles.CardHolderCSS.className}
            style={{ ...boxDimensions }}
          >
            <animated.div
              id={String(i)}
              onClick={_handleClick}
              style={frontBoxStyles[i]}
              className={classNames(
                Styles.CardCSS.className,
                Styles.CardFrontCSS.className
              )}
            >
              {i + 1}
            </animated.div>

            <animated.div
              style={backBoxStyles[i]}
              className={classNames(
                Styles.CardCSS.className,
                Styles.CardBackCSS.className
              )}
            >
              <FitText text={text !== 'poo' ? text : '💩'} ref={refs[i]} />
            </animated.div>
          </div>
        ))}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.CardHolderCSS.styles}
        {Styles.CardCSS.styles}
        {Styles.CardFrontCSS.styles}
        {Styles.CardBackCSS.styles}
      </div>
    </GameWrapper>
  );
}
