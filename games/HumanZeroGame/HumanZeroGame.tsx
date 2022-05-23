import React, { useCallback, useState, useEffect } from 'react';
import { animated, useSpring, useTransition, config } from 'react-spring';
import { useStore } from 'contexts/store';
import { useFont } from 'contexts/fonts';
import { useData, useHandleGame, useFitText, useKeys, useScroll } from 'hooks';

import { init, reducer } from './HumanZeroGame.state';
import type { GameStore } from './HumanZeroGame.types';
import * as Styles from './HumanZeroGame.styles';

// IMPORT COMPONENTS/UTILITIES
import { track } from 'utils/analytics';
import type { GameSEOProps } from 'games/types';
import { getRandoNum, nextRoundData } from 'games/_utils';
import FitText from 'components/FitText';
import Modal from 'components/Modals';
// CONSTANTS - img, audio, function, etc.

export default function HumanZeroGame({ title }: GameSEOProps) {
  const store = useStore();
  const { selectedFont } = useFont();
  const ContainerCSS = Styles.getContainerCSS(selectedFont.fontFamily);

  // STATE - useData
  const primary = store.vocabulary;
  const secondary = store.expressions;
  const gameStore: GameStore = useData(reducer, init, primary, secondary);
  const [state, dispatch, didUpdate] = gameStore;
  const { data, isVocab, text, stage, groupSize } = state;

  const [randomNum, setRandomNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputVal, setModalInputVal] = useState(4);
  const closeModal = () => setIsModalOpen(false);

  // REFS - useFitText, useSplit2Rows, etc..
  const [[ref]] = useFitText(text);
  const textStyles = useSpring({
    opacity: stage === 1 ? 0 : 1,
    immediate: true,
  });
  const transition = useTransition(stage === 1, {
    from: { opacity: 0, translateY: '-400px' },
    enter: { opacity: 1, translateY: '0px' },
    leave: { opacity: 0, translateY: '200px' },
    config: config.wobbly,
  });

  // HANDLE GAME
  const handleGame = useCallback(() => {
    const fullData = isVocab ? store.vocabulary : store.expressions;
    const [[cur], nex] = nextRoundData(1, data, fullData);
    dispatch({ type: 'New_Round', text: cur, data: nex });
  }, [data, isVocab, dispatch, store.vocabulary, store.expressions]);
  useHandleGame(handleGame, didUpdate);

  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft')
        return dispatch({
          type: 'Change_isVocab',
          isVocab: true,
        });
      if (key === 'ArrowRight')
        return dispatch({
          type: 'Change_isVocab',
          isVocab: false,
        });

      if (key === 'g') setIsModalOpen(true);
    },
    [dispatch]
  );
  useKeys(handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    (scrolledUp: boolean) =>
      dispatch({
        type: 'Change_isVocab',
        isVocab: !scrolledUp,
      }),
    [dispatch]
  );
  useScroll(scrollCB);

  // GAME EFFECTS
  useEffect(() => {
    if (stage === 1) {
      setRandomNum(getRandoNum(groupSize));
    }
  }, [stage, groupSize]);

  // GAME FUNCTIONS - start with an underscore ex) _handleClick
  const _handleClick = useCallback(() => {
    if (stage === 0) {
      track.newRound(title);
      return dispatch({ type: 'Show_Num' });
    }
    if (stage === 1) return handleGame();
  }, [stage, handleGame, dispatch, title]);

  const _handleModalInputChange = e => {
    const { value, min, max } = e.target;
    if (value.length === 0) return;
    const restrictedValue = Math.max(
      Number(min),
      Math.min(Number(max), parseInt(value))
    );
    setModalInputVal(restrictedValue);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <Modal.Header closeModal={closeModal}>Choose a group size</Modal.Header>
        <Modal.Content
          style={{ marginInline: 16, padding: '2rem 1rem', paddingTop: '1rem' }}
        >
          <pre>Choose the student group size: 1 to 40</pre>
          <input
            style={{ fontSize: '2rem', padding: '0.5rem' }}
            placeholder="Student group size"
            type="number"
            min="1"
            max="40"
            value={modalInputVal}
            onChange={_handleModalInputChange}
          />
        </Modal.Content>
        <Modal.Actions
          cancelColor="white"
          cancelBgColor="orangered"
          cancelText="cancel"
          cancelClick={closeModal}
          confirmColor="white"
          confirmBgColor="#2185d0"
          confirmText="Ok"
          confirmClick={() => {
            setIsModalOpen(false);
            dispatch({
              type: 'Group_Size_Change',
              groupSize: modalInputVal,
            });
          }}
        ></Modal.Actions>
      </Modal>
      {/* eslint-disable-next-line */}
      <div className={ContainerCSS.className} onClick={_handleClick}>
        <div className={Styles.TextHolderCSS.className}>
          {transition(
            (style, item) =>
              item && (
                <animated.div
                  style={{ ...style, fontSize: '12vw' }}
                  className={Styles.TextCSS.className}
                >
                  <span>{randomNum}</span>
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
    </>
  );
}
