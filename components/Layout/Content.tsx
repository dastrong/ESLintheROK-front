import React from 'react';
import { useRouter } from 'next/router';
import { a, useTransition } from 'react-spring';
import css from 'styled-jsx/css';
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
  const router = useRouter();

  const transition = useTransition(router.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 },
  });

  const fragment = transition(
    (style, item) =>
      item === router.pathname && (
        <a.section
          key={item}
          className={className}
          style={{
            ...style,
            height: isPlayingGame ? '100vh' : 'inherit',
            padding: isPlayingGame ? '0' : 'inherit',
          }}
        >
          {children}
        </a.section>
      )
  );

  return (
    <>
      {fragment}
      {styles}
    </>
  );
}
