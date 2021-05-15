import React from 'react';
import { animated, useSpring, config } from 'react-spring';

export default function SpeedSolverInfo({
  show,
  text,
  cx,
}: {
  show: boolean;
  text: string;
  cx: string;
}) {
  const infoStyles = useSpring({
    opacity: show ? 1 : 0,
    translateX: show ? '0vw' : '-100vw',
    config: config.wobbly,
  });

  return (
    <animated.div className={cx} style={infoStyles}>
      {text}
    </animated.div>
  );
}
