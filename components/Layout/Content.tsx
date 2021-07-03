import React from 'react';
import { a, useTransition } from 'react-spring';
import { css } from 'styled-jsx/css';
import useNavPageCheck from './useNavPageCheck';

const { className, styles } = css.resolve`
  section {
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--navHeight));
    overflow-x: hidden;
    background-color: var(--siteBgColor);
    padding: 1rem;
  }
`;

export default function Content({ children }: { children: React.ReactNode }) {
  const isNavVisible = useNavPageCheck();

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
      height: 'calc(100vh - var(--navHeight))',
      left: 0,
    },
    config: {
      duration: 200,
    },
  });

  const fragment = transition((style, child) => (
    <a.section className={className} style={style}>
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
