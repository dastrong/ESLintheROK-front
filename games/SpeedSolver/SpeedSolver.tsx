/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect } from 'react';
import shuffle from 'lodash.shuffle';

import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import {
  useAudio,
  useData,
  useHandleGame,
  useFirstRun,
  useKeys,
  useScroll,
} from 'hooks';

import { init, reducer } from './SpeedSolver.state';
import type { GameStore, StageNames } from './SpeedSolver.types';
import * as Styles from './SpeedSolver.styles';
import SpeedSolverLetters from './SpeedSolverLetters';
import SpeedSolverInfo from './SpeedSolverInfo';

// IMPORT COMPONENTS/UTILITIES HERE
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { nextRoundData, resetAllAudio } from 'games/_utils';
import { AnswerBox } from 'games/_components';
import GameWrapper from 'components/GameWrapper';
import { getGameFileUrl } from 'utils/getCloudUrls';

// CONSTANTS - img, audio, function, etc.
// IMAGES URLs
const BlueBgURL = getGameFileUrl('SpeedSolver/BG_blu.jpg', '/f_auto');
const PinkBgURL = getGameFileUrl('SpeedSolver/BG_pnk.jpg', '/f_auto');
const BrownBgURL = getGameFileUrl('SpeedSolver/BG_bNr.jpg', '/f_auto');
const RainbowBgURL = getGameFileUrl('SpeedSolver/BG_rbw.jpg', '/f_auto');
const BG_images = [BlueBgURL, PinkBgURL, BrownBgURL, RainbowBgURL];
// AUDIO URLs
const flyByURL = getGameFileUrl('SpeedSolver/zoomBy.mp3');
const level1URL = getGameFileUrl('SpeedSolver/level1.mp3');
const level2URL = getGameFileUrl('SpeedSolver/level2.mp3');
const level3URL = getGameFileUrl('SpeedSolver/level3.mp3');
const level4URL = getGameFileUrl('SpeedSolver/level4.mp3');
const level5URL = getGameFileUrl('SpeedSolver/level5.mp3');
const level6URL = getGameFileUrl('SpeedSolver/level6.mp3');
const level7URL = getGameFileUrl('SpeedSolver/level7.mp3');
const level8URL = getGameFileUrl('SpeedSolver/level8.mp3');
const level9URL = getGameFileUrl('SpeedSolver/level9.mp3');
const level10URL = getGameFileUrl('SpeedSolver/level10.mp3');

// the different stages
const stages: StageNames[] = [
  'SHOW_LEVEL',
  'SHOW_READY',
  'ACTION',
  'SHOW_ANSWER_BOX',
  'SHOW_ANSWER_TEXT',
];

export default function SpeedSolver({
  title,
  description,
  keyCuts,
}: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // AUDIO - useAudio
  const [flyByAud, resetFlyBy] = useAudio(flyByURL);
  const [lvl1Aud, resetLvl1] = useAudio(level1URL, true);
  const [lvl2Aud, resetLvl2] = useAudio(level2URL, true);
  const [lvl3Aud, resetLvl3] = useAudio(level3URL, true);
  const [lvl4Aud, resetLvl4] = useAudio(level4URL, true);
  const [lvl5Aud, resetLvl5] = useAudio(level5URL, true);
  const [lvl6Aud, resetLvl6] = useAudio(level6URL, true);
  const [lvl7Aud, resetLvl7] = useAudio(level7URL, true);
  const [lvl8Aud, resetLvl8] = useAudio(level8URL, true);
  const [lvl9Aud, resetLvl9] = useAudio(level9URL, true);
  const [lvl10Aud, resetLvl10] = useAudio(level10URL, true);

  // array of the above audios for easier playing
  const audios = [
    { track: flyByAud, reset: resetFlyBy },
    { track: lvl1Aud, reset: resetLvl1 },
    { track: lvl2Aud, reset: resetLvl2 },
    { track: lvl3Aud, reset: resetLvl3 },
    { track: lvl4Aud, reset: resetLvl4 },
    { track: lvl5Aud, reset: resetLvl5 },
    { track: lvl6Aud, reset: resetLvl6 },
    { track: lvl7Aud, reset: resetLvl7 },
    { track: lvl8Aud, reset: resetLvl8 },
    { track: lvl9Aud, reset: resetLvl9 },
    { track: lvl10Aud, reset: resetLvl10 },
  ];

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, gameData, answer, level, stage } = state;
  const curStage = stages[stage];
  const backgroundImage = __getBGimg(level);

  // REFS - useFitText, useSplit2Rows, etc..
  const isFirstRun = useFirstRun();

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData, true);
    const splitData = __splitText(cur, isVocab);
    const gameData = shuffle(splitData);
    dispatch({ type: 'New_Round', gameData, data: nex, answer: cur });
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
      // handle the level changes
      const keyNum = Number(key);
      const level = keyNum !== 0 ? keyNum : 10; // if keyNum is 0, turn into 10
      if (!level) return;
      dispatch({ type: 'Level_Change', level });
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
  // want to show the level text on mounting (after handleGame runs) and load (cache) the images for later
  useEffect(() => {
    dispatch({ type: 'Level_Change', level: 1 }); // show level on load
    __preloadImgs(BG_images); // load and cache images for use later
  }, [dispatch]);

  // handles what audio plays during each stage
  useEffect(() => {
    if (isFirstRun) return;
    // we're gonna reset all audios whenever stage changes
    const resetAudios = audios.map(audio => audio.reset);
    resetAllAudio(...resetAudios);
    if (stage === 1) {
      flyByAud.current.volume = 0.1;
      flyByAud.current.play();
    } else if (stage === 2) {
      audios[level].track.current.play();
    }
  }, [stage]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  function _handleClick() {
    // when user starts a round, log that event
    if (stage === 1) {
      track.newRound(title);
    }
    // move onto the next stage in the game
    dispatch({ type: 'Stage_Change' });
    // if we're at the last stage, get new game data
    if (stage !== 4) return;
    handleGame();
  }

  return (
    <GameWrapper title={title} description={description} keyCuts={keyCuts}>
      <div
        className={ContainerCSS.className}
        style={{ backgroundImage }}
        onClick={_handleClick}
      >
        <SpeedSolverInfo
          show={curStage === 'SHOW_LEVEL'}
          text={`Level ${level}`}
          cx={Styles.InfoCSS.className}
        />
        <SpeedSolverInfo
          show={curStage === 'SHOW_READY'}
          text="Ready?"
          cx={Styles.InfoCSS.className}
        />

        <SpeedSolverLetters
          showLetters={curStage === 'ACTION'}
          gameData={gameData}
          level={level}
          isVocab={isVocab}
          cx={Styles.LettersCSS.className}
        />

        <AnswerBox
          answer={answer}
          showBox={curStage === 'SHOW_ANSWER_BOX'}
          showText={curStage === 'SHOW_ANSWER_TEXT'}
        />

        {/* STYLES */}
        {ContainerCSS.styles}
        {Styles.InfoCSS.styles}
        {Styles.LettersCSS.styles}
      </div>
    </GameWrapper>
  );
}

// OTHER FUNCTIONS HERE
function __preloadImgs(images: string[]) {
  images.forEach(src => {
    const image = new Image();
    image.src = src;
  });
}

function __getBGimg(level: number) {
  const img =
    level > 8
      ? RainbowBgURL
      : level > 5
      ? BrownBgURL
      : level > 2
      ? PinkBgURL
      : BlueBgURL;
  return `url(${img})`;
}

function __splitText(text: string, isVocab: boolean) {
  const splitter = isVocab ? '' : ' ';
  return text.split(splitter);
}
