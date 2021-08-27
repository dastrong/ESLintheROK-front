/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from 'react';

import { useStore } from 'contexts/store';
import { useUser } from 'contexts/user';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './state_manager';
import type { GameStore } from './state_types';
import * as Styles from './RedAndBlue.styles';

// IMPORT COMPONENTS/UTILITIES HERE
import type { GameSEOProps } from 'games/types';
import { nextRoundData } from 'games/_utils';
import GameWrapper from 'components/GameWrapper';
import FitText from 'components/FitText';

export default function RedAndBlue({ title, description }: GameSEOProps) {
  const store = useStore();
  const { user } = useUser();
  const ContainerCSS = Styles.getContainerCSS(user.activeFont);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, red, blue } = state;

  // REFS - useFitText, useSplit2Rows, etc..
  const [refs] = useFitText([red, blue]);

  // HANDLE GAME
  const handleGame = useCallback(() => {
    // googleEvent(title);
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[red, blue], nex] = nextRoundData(2, data, fullData);
    dispatch({ type: 'New_Round', red, blue, data: nex });
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

  return (
    <GameWrapper title={title} description={description}>
      <div className={ContainerCSS.className} onClick={handleGame}>
        {refs.map((ref, i) => (
          <div className={`outer-color ${!i ? 'red' : 'blue'}`}>
            <hr className="st-line" />
            <hr className="nd-line" />
            <hr className="rd-line" />
            <hr className="th-line" />
            <div className={`inner-color ${!i ? 'red' : 'blue'}`}>
              <FitText text={!i ? red : blue} ref={ref} />
            </div>
          </div>
        ))}

        {/* STYLES */}
        {ContainerCSS.styles}
        <style jsx>
          {`
            .outer-color {
              height: 50vh;
              width: 100vw;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: auto;
              position: relative;
              user-select: none;
            }

            .outer-color.red {
              background-color: #e82828;
              border: 2px solid #670303;
            }

            .outer-color.blue {
              background-color: #2352d0;
              border: 2px solid #04179c;
            }

            .inner-color {
              width: calc(100vw - 20px * 2 + 1px);
              height: calc(50vh - 34px * 2 + 3px);
              z-index: 2;
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
              text-shadow: 1px 1px 20px white;
            }

            .inner-color.red {
              background-color: #ff9090;
              border: 2px solid #670303;
              box-shadow: 0 0 25px #731111;
            }

            .inner-color.blue {
              background-color: #95adfd;
              border: 2px solid #04179c;
              box-shadow: 0 0 25px #0f204e;
            }

            hr {
              position: absolute;
              margin: 0;
              height: calc(20px * 2);
              border-radius: 50%;
            }

            .red hr {
              border: 1px solid #670303;
            }

            .blue hr {
              border: 1px solid #04179c;
            }

            .st-line {
              top: -2px;
              left: -2px;
              transform-origin: top;
              transform: rotate(330deg);
            }

            .nd-line {
              top: -2px;
              right: -2px;
              transform-origin: top;
              transform: rotate(30deg);
            }

            .rd-line {
              bottom: -2px;
              left: -2px;
              transform-origin: bottom;
              transform: rotate(30deg);
            }

            .th-line {
              bottom: -2px;
              right: -2px;
              transform-origin: bottom;
              transform: rotate(330deg);
            }
          `}
        </style>
      </div>
    </GameWrapper>
  );
}
