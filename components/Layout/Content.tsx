import React from 'react';
import { a } from 'react-spring';
import { css } from 'styled-jsx/css';
import useNavPageCheck from './useNavPageCheck';
import usePageAnimation from './usePageAnimation';

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

  const transition = usePageAnimation(children, isNavVisible);

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
