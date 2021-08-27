/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { animated, useSprings } from 'react-spring';

import { useStore } from 'contexts/store';
import { useUser } from 'contexts/user';
import {
  useAudio,
  useData,
  useHandleGame,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './PubgBattleground.styles';
import { PubgBattlegroundItems } from './PubgBattlegroundItems';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { getRandoNum, nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
const CountdownAudioURL = getGameFileUrl('PubgBattleground/countdown.mp3');
const BackgroundURL = getGameFileUrl('PubgBattleground/pubgMap.jpg', '/f_auto');
const numOfText = 4;

export default function PubgBattleground({ title, description }: GameSEOProps) {
  const store = useStore();
  const { user } = useUser();
  const ContainerCSS = Styles.getContainerCSS(user.activeFont);

  // AUDIO - useAudio
  const [CountAudio, resetCountAudio] = useAudio(CountdownAudioURL);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, items, scaled, stage, countdown } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [refs] = useFitText(gameData);
  const textSprings = useSprings(
    gameData.length,
    gameData.map(() => ({ opacity: stage !== 3 ? 1 : 0 }))
  );
  const itemSprings = useSprings(
    gameData.length,
    items.map(() => ({
      opacity: stage === 3 ? 1 : 0,
      immediate: stage !== 3,
    }))
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    resetCountAudio();
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [cur, nex] = nextRoundData(numOfText, data, fullData);
    const newItems = shuffle([0, 1, 2, 3]).map(
      num =>
        PubgBattlegroundItems[num][
          getRandoNum(PubgBattlegroundItems[num].length - 1)
        ]
    );
    dispatch({ type: 'New_Round', data: nex, gameData: cur, items: newItems });
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

  // GAME EFFECTS - you can use multiple effects just comment what each means
  useEffect(() => {
    if (stage !== 1) return;
    const id = setTimeout(() => dispatch({ type: 'Countdown_Start' }), 4500);
    return () => clearTimeout(id);
  }, [stage, dispatch]);

  useEffect(() => {
    if (countdown < 1) return;
    const id =
      countdown > 1
        ? setTimeout(() => dispatch({ type: 'Countdown' }), 1000)
        : setTimeout(() => dispatch({ type: 'Countdown_Stop' }), 1000);
    return () => clearTimeout(id);
  }, [countdown, dispatch]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleClick = useCallback(() => {
    if (!CountAudio.current) return;
    if (stage === 0) {
      // googleEvent(title);
      CountAudio.current.currentTime = 0;
      CountAudio.current.play();
      return dispatch({ type: 'Countdown_Setup' });
    }
    if (stage === 1) return;
    if (stage === 2) return dispatch({ type: 'Show_Items' });
    if (stage === 3) return handleGame();
  }, [stage, handleGame, CountAudio, dispatch]);

  return (
    <GameWrapper title={title} description={description}>
      <div className={ContainerCSS.className} onClick={_handleClick}>
        <div className="blue-zone" />
        <img className="map" src={BackgroundURL} alt="pubg map background" />
        <div className="countdown-timer">{countdown}</div>

        {/* TEXT CARDS */}
        <div className={Styles.CardHolderCSS.className}>
          {textSprings.map((style, i) => (
            <animated.div
              key={`pubg-card-text-${i}`}
              style={style}
              className={Styles.CardCSS.className}
            >
              <FitText text={gameData[i]} ref={refs[i]} />
            </animated.div>
          ))}
        </div>

        {/* ITEM CARDS */}
        <div className={Styles.CardHolderCSS.className}>
          {itemSprings.map((style, i) => {
            const { points, name } = items[i];
            return (
              <animated.div
                key={`pubg-card-item-${i}`}
                style={{
                  ...style,
                  backgroundImage: `url(${getGameFileUrl(
                    `PubgBattleground/gameItems/${name}.png`,
                    '/f_auto'
                  )})`,
                  color: points.startsWith('-') ? 'red' : 'green',
                }}
                className={Styles.CardCSS.className}
              >
                {points}
              </animated.div>
            );
          })}
        </div>

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.CardHolderCSS.styles}
        {Styles.CardCSS.styles}
        <style jsx>{`
          div.blue-zone {
            position: fixed;
            height: 103vh;
            width: 103vw;
            z-index: 5;
            transform: scale(1);
            transition: transform 6s;
            border-width: 1.5vh 1.5vw;
            border-color: blue;
            border-style: solid;
            box-shadow: inset 0 0 3px 3px blue;
            top: -2.5vh;
            left: -2.5vw;
            transform: scale(${stage === 1 ? 0.97 : 1});
            transition-delay: ${stage === 1 ? 8 : 0}s;
          }

          img.map {
            position: fixed;
            height: 100%;
            width: 100%;
            transition: all 6s;
            transform: scale(${1 + scaled})
              translate(-${scaled * 12}vw, ${scaled}vh);
          }

          div.countdown-timer {
            color: #fff;
            z-index: 5;
            position: absolute;
            font-size: 150px;
            height: 200px;
            width: 200px;
            line-height: 200px;
            text-align: center;
            background-color: rgb(0, 0, 0);
            border-radius: 50%;
            opacity: ${countdown ? 1 : 0};
            transition: opacity 0.5s;
          }
        `}</style>
      </div>
    </GameWrapper>
  );
}
