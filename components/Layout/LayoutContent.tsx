import React from 'react';
import { a } from 'react-spring';
import { css } from 'styled-jsx/css';
import useNavPageCheck from './useNavPageCheck';
import usePageAnimation from './usePageAnimation.';

const { className, styles } = css.resolve`
  div {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
`;

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const isNavVisible = useNavPageCheck();

  const transition = usePageAnimation(children, isNavVisible);

  const fragment = transition((style, child) => (
    <a.div className={className} style={style}>
      {child}
    </a.div>
  ));

  return (
    <>
      {fragment}
      {styles}
    </>
  );
}
