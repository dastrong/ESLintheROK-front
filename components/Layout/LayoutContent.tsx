/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';
import { a, useTransition } from 'react-spring';
import { css } from 'styled-jsx/css';

const { className, styles } = css.resolve`
  section {
    position: relative;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
  }
`;

// children will be whatever page you're rendering
export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
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
