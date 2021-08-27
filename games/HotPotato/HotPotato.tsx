/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { MutableRefObject, useCallback, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';

import { useStore } from 'contexts/store';
import {
  useAudio,
  useData,
  useHandleGame,
  useFirstRun,
  useFitText,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore, NumOfText } from './state_types';
import * as Styles from './HotPotato.styles';
import HotPotatoStage from './HotPotatoStage';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData, resetAllAudio } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
const BubblingAudioURL = getGameFileUrl('HotPotato/Bubbling.mp3');
const ScreamAudioURL = getGameFileUrl('HotPotato/Scream.mp3');
const SongAudioURL = getGameFileUrl('HotPotato/Song.mp3');
const SizzleAudioURL = getGameFileUrl('HotPotato/Sizzle.mp3');
const BoilingGifURL = getGameFileUrl('HotPotato/Boiling.gif', '/f_auto,q_50');
const DancingGifURL = getGameFileUrl('HotPotato/Dancing.gif', '/f_auto,q_50');
const CoolingGifURL = getGameFileUrl('HotPotato/Cooling.gif', '/f_auto,q_50');

export default function HotPotato({ title, description }: GameSEOProps) {
  const store = useStore();
  const ContainerCSS = Styles.getContainerCSS(store.font);

  // AUDIO - useAudio
  const [Bubbling, resetBubb] = useAudio(BubblingAudioURL);
  const [Scream, resetScream] = useAudio(ScreamAudioURL);
  const [Sizzle, resetSizzle] = useAudio(SizzleAudioURL);
  const [Song, resetSong] = useAudio(SongAudioURL, true);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, numOfText, stage, countdown } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();
  const [refs, updateFitText] = useFitText(gameData);
  const [textSprings] = useSprings(
    gameData.length,
    i => ({
      opacity: stage === 3 ? 1 : 0,
      translateY: stage === 3 ? '0px' : '-40px',
      delay: stage !== 3 ? 0 : i * 400,
      immediate: stage !== 3,
    }),
    [stage]
  );

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // google events are sent when user starts a round, not here
    // stop all sounds when game resets
    resetAllAudio(resetBubb, resetScream, resetSizzle, resetSong);
    const fullText = isVocab ? store.vocabulary : store.expressions;
    const [cur, nex] = nextRoundData(numOfText, data, fullText);
    dispatch({ type: 'New_Round', gameData: cur, data: nex });
  }, [data, isVocab, numOfText]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({ type: 'Change_isVocab', isVocab: true });
      if (key === 'ArrowRight')
        return dispatch({ type: 'Change_isVocab', isVocab: false });
      const num = Number(key);
      if (!num || num > 3 || !isVocab || num === numOfText) return;
      dispatch({ type: 'Change_NumOfText', numOfText: num as NumOfText });
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
  // updates game if numOfText changes
  useEffect(() => {
    if (isFirstRun) return;
    // avoid unnecessary call if we're switching to expressions
    // remember - there can only be one expression, but multiple vocabs
    if (!isVocab) return;
    handleGame();
  }, [numOfText]);

  useEffect(() => {
    if (countdown < 1) return;
    const id =
      countdown > 1
        ? setTimeout(() => dispatch({ type: 'Countdown' }), 1000)
        : setTimeout(() => dispatch({ type: 'Countdown_Stop' }), 1000);
    return () => clearTimeout(id);
  }, [dispatch, countdown]);

  useEffect(() => {
    if (countdown !== 1) return;
    Scream.current.currentTime = 0.3;
    Scream.current.play();
  }, [countdown, Scream]);

  useEffect(() => {
    if (stage !== 2) return;
    const id = __fadeIn(Song);
    return () => clearInterval(id);
  }, [stage, Song]);

  useEffect(() => {
    if (stage !== 3) return;
    updateFitText();
    const id = __fadeOut(Song, Sizzle);
    return () => clearInterval(id);
  }, [stage, Song, Sizzle]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  function _handleClick() {
    // wait for useAudio to add audio to ref
    if (!Bubbling.current) return;
    if (countdown > 0) return;
    if (stage === 1) {
      Bubbling.current.currentTime = 0.2;
      Bubbling.current.play();
      // googleEvent(title);
      return dispatch({ type: 'Countdown_Start' });
    }
    if (stage === 2) {
      Sizzle.current.play();
      return dispatch({ type: 'Show_Text' });
    }
    if (stage === 3) return handleGame();
  }

  return (
    <GameWrapper title={title} description={description}>
      <div className={ContainerCSS.className} onClick={_handleClick}>
        <HotPotatoStage
          isIn={stage === 1}
          bgColor="#ffcb04"
          cxDiv={Styles.StageContainerCSS.className}
          cxImg={Styles.ImgCSS.className}
          src={BoilingGifURL}
          alt="potatoes-boiling"
        />
        <HotPotatoStage
          isIn={stage === 2}
          bgColor="#fffbde"
          cxDiv={Styles.StageContainerCSS.className}
          cxImg={Styles.ImgCSS.className}
          src={DancingGifURL}
          alt="potato-dancing"
        />
        <HotPotatoStage
          isIn={stage === 3}
          bgColor="#a77c52"
          cxDiv={Styles.StageContainerCSS.className}
          cxImg={Styles.ImgCSS.className}
          src={CoolingGifURL}
          alt="potato-finished"
        >
          <div className={Styles.TextContainer.className}>
            {textSprings.map((styles, i) => (
              <animated.div
                key={`${gameData[i]}-text`}
                className={Styles.TextWrapper.className}
                style={{
                  ...styles,
                  height: isVocab ? `${96 / numOfText}vh` : '100vh',
                }}
              >
                <FitText text={gameData[i]} ref={refs[i]} />
              </animated.div>
            ))}
          </div>
        </HotPotatoStage>

        {!countdown ? null : (
          <span className={Styles.CountdownTimerCSS.className}>
            {countdown}
          </span>
        )}

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.StageContainerCSS.styles}
        {Styles.ImgCSS.styles}
        {Styles.CountdownTimerCSS.styles}
        {Styles.TextContainer.styles}
        {Styles.TextWrapper.styles}
      </div>
    </GameWrapper>
  );
}

function __fadeIn(Song: MutableRefObject<HTMLAudioElement>) {
  Song.current.volume = 0.05;
  Song.current.play();
  const id = setInterval(() => {
    if (Song.current.volume < 0.85) return (Song.current.volume += 0.15);
    clearInterval(id);
  }, 400);
  return id;
}

function __fadeOut(
  Song: MutableRefObject<HTMLAudioElement>,
  Sizzle: MutableRefObject<HTMLAudioElement>
) {
  Song.current.pause();
  Sizzle.current.play();
  const id = setInterval(() => {
    if (Sizzle.current.volume > 0.11) return (Sizzle.current.volume -= 0.1);
    clearInterval(id);
  }, 250);
  return id;
}
