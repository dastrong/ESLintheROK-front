/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';
import { a, useTransition } from 'react-spring';
import { css } from 'styled-jsx/css';
import { VisibleNav } from './types';

const { className, styles } = css.resolve`
  div {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    top: 0;
    left: 0;
  }
`;

// children will be whatever page you're rendering
export default function LayoutContent({
  children,
  visibleNav,
}: {
  children: React.ReactNode;
  visibleNav: VisibleNav;
}) {
  // need the path name to know when to do page transitions
  const { pathname } = useRouter();

  // page animations
  const transition = useTransition(pathname, {
    from: { opacity: 1 } as any,
    enter: { opacity: 1 } as any,
    leave: { opacity: 0, position: 'absolute' } as any,
    config: { duration: 1000 },
  });

  const fragment = transition(style => (
    <a.div className={className} style={style}>
      {children}
    </a.div>
  ));

  return (
    <>
      {fragment}
      {styles}
    </>
  );
}
