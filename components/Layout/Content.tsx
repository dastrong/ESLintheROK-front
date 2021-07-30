import React from 'react';
import { a, useTransition } from 'react-spring';
import { css } from 'styled-jsx/css';
import usePlayCheck from './usePlayCheck';

const { className, styles } = css.resolve`
  section {
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--navHeight) - var(--footerHeight));
    overflow-x: hidden;
    background-color: var(--siteBgColor);
    padding: 1rem;
  }
`;

export default function Content({ children }: { children: React.ReactNode }) {
  const isPlayingGame = usePlayCheck();

  const transition = useTransition(children, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      delay: 200,
    },
    leave: {
      position: 'absolute',
      opacity: 0,
      top: 'calc(var(--navHeight) - 1)',
      height: 'calc(100vh - var(--navHeight) - var(--footerHeight))',
      left: 0,
    },
    config: {
      duration: 200,
    },
  });

  const fragment = transition((style, child) => (
    <a.section
      className={className}
      style={{
        ...style,
        height: isPlayingGame ? '100vh' : 'inherit',
        padding: isPlayingGame ? '0' : 'inherit',
      }}
    >
      {child}
    </a.section>
  ));

  return (
    <>
      {fragment}
      {styles}
    </>
  );
}
