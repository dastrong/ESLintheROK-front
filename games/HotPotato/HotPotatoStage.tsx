/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { animated, useTransition } from 'react-spring';

export default function HotPotatoStage({
  children,
  isIn,
  bgColor,
  cxImg,
  cxDiv,
  src,
  alt,
}: {
  children?: React.ReactNode;
  isIn: boolean;
  bgColor: string;
  cxImg: string;
  cxDiv: string;
  src: string;
  alt: string;
}) {
  const transition = useTransition(isIn, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 550,
  });

  return transition(
    (style, item) =>
      item && (
        <animated.div
          style={{ ...style, backgroundColor: bgColor }}
          className={cxDiv}
        >
          <img src={src} alt={alt} className={cxImg} />
          {children}
        </animated.div>
      )
  );
}
