import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { animated, config, useTransition } from 'react-spring';

import type { GameInstructions } from 'games/types';
import { useEventListener, useFirstRun, useScroll } from 'hooks';
import SeoWrapper from 'components/SeoWrapper';
import Button from 'components/Button';
import FitText, { useFitText } from 'components/FitText';
import Modal from 'components/Modals';
import * as Styles from './GameInstructions.styles';

type Direction = 'prev' | 'next';

type Props = {
  isOpen: boolean;
  instructions: GameInstructions;
  seoTitle: string;
};

export default function GameInstructionsModal({
  isOpen,
  instructions,
  seoTitle,
}: Props) {
  const isFirstRun = useFirstRun();
  const { push, query } = useRouter();

  // capture a couple variables for use later
  const version = query.instructions as string;
  const capitalizedVersion = version[0].toUpperCase() + version.substring(1);
  const language = query.language as 'korean' | 'english';
  const defaultIndex = query.item || 0;
  const chosenInstructions = instructions[language];
  const isEnglish = language === 'english';
  const isTeacher = version === 'teacher';

  // keeps track of which instruction we show and the direction we take
  const [{ activeIndex, direction }, setActive] = useState<{
    activeIndex: number;
    direction: Direction;
  }>({ activeIndex: Number(defaultIndex), direction: 'next' });

  // automatically scales the text when the index changes
  const [[ref]] = useFitText(String(activeIndex + language), true);

  //this is our transition spring for animating it in
  const transitions = useTransition(activeIndex, {
    from: {
      opacity: 0,
      y: direction === 'next' ? '-80%' : '80%',
      x: isTeacher ? '0%' : direction === 'next' ? '-15%' : '15%',
      rotate: isTeacher ? 0 : -27.5,
      scale: isTeacher ? 0.9 : 0.7,
    },
    enter: { opacity: 1, y: '0%', x: '0%', rotate: 0, scale: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
    default: { immediate: isFirstRun },
  });

  // helper function that cycles the instructions correctly
  const handleSlide = (direction: Direction) => {
    setActive(state => {
      const currentIndex = state.activeIndex;
      const lastPossibleIndex = chosenInstructions.length - 1;
      if (direction === 'prev') {
        if (currentIndex === 0) {
          return { activeIndex: lastPossibleIndex, direction };
        } else {
          return { activeIndex: currentIndex - 1, direction };
        }
      }
      if (direction === 'next') {
        if (currentIndex === lastPossibleIndex) {
          return { activeIndex: 0, direction };
        } else {
          return { activeIndex: currentIndex + 1, direction };
        }
      }
    });
  };

  useScroll((scrolledUp: boolean) => handleSlide(scrolledUp ? 'prev' : 'next'));
  useEventListener('keydown', ({ key }: KeyboardEvent) => {
    if (key === 'ArrowLeft') return handleSlide('prev');
    if (key === 'ArrowRight') return handleSlide('next');
    if (key === ' ') return handleSlide('next');
  });

  // to close the modal, we simply remove the query string - the game page will handle removing it
  const closeModal = () => {
    push(`/game/${query.gameName}`, undefined, { shallow: true });
  };

  // we can switch languages
  const changeLanguage = (language: 'english' | 'korean') => {
    push(
      {
        query: {
          ...query,
          instructions: version,
          language,
          item: activeIndex,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className={Styles.ModalOverlayCSS.className}
    >
      <SeoWrapper title={`${capitalizedVersion} Instructions | ${seoTitle}`}>
        <Modal.Header
          closeModal={closeModal}
          className={Styles.ModalHeaderCSS.className}
          style={{ padding: 0, paddingRight: '1rem' }}
        >
          <Button
            rounded
            color="white"
            bgColor="#cc4d8a"
            text={isEnglish ? '한' : '영'}
            onClick={() => changeLanguage(isEnglish ? 'korean' : 'english')}
            style={{ marginRight: '0.5rem' }}
          />
          {capitalizedVersion} Instructions
        </Modal.Header>

        <Modal.Content className={Styles.ContentContainerCSS.className}>
          {transitions(
            (styles, index) =>
              activeIndex === index && (
                <animated.div
                  key={chosenInstructions[index].slice(20)}
                  style={{
                    ...styles,
                    transformOrigin: isTeacher
                      ? 'center'
                      : direction === 'next'
                      ? 'bottom left'
                      : 'top right',
                  }}
                  className={Styles.TextContainerCSS.className}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSlide('next')}
                  onKeyPress={() => handleSlide('next')}
                >
                  <FitText
                    ref={ref}
                    text={chosenInstructions[index]}
                    cx={Styles.FitTextCSS.className}
                  />
                </animated.div>
              )
          )}
        </Modal.Content>

        <Modal.Actions hideActions style={{ height: 92 }}>
          {chosenInstructions?.map((_, i) => (
            <Button
              rounded
              key={i + 'instruction-button'}
              size="lg"
              color="white"
              bgColor="#3C9AF0"
              text={String(i + 1)}
              style={{ width: 62, marginInline: '0.25rem' }}
              disabled={activeIndex === i}
              onClick={() => setActive({ direction, activeIndex: i })}
            />
          ))}
        </Modal.Actions>

        {Styles.ModalOverlayCSS.styles}
        {Styles.ModalHeaderCSS.styles}
        {Styles.ContentContainerCSS.styles}
        {Styles.TextContainerCSS.styles}
        {Styles.FitTextCSS.styles}
      </SeoWrapper>
    </Modal>
  );
}
