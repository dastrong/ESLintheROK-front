/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from 'react';
import { animated, useSpring } from 'react-spring';
import FitText from 'components/FitText';

const SleepingBearsCard = forwardRef(
  (
    {
      src,
      text,
      showText,
      cxCard,
      cxContent,
    }: {
      src: string;
      text: string;
      showText: boolean;
      cxCard: string;
      cxContent: string;
    },
    ref: React.ForwardedRef<HTMLSpanElement>
  ) => {
    const imgSpring = useSpring({ opacity: showText ? 0 : 1 });
    const textSpring = useSpring({ opacity: showText ? 1 : 0 });

    return (
      <div className={cxCard}>
        <animated.div className={cxContent} style={imgSpring}>
          <img src={src} alt="bear" />
        </animated.div>
        <animated.div className={cxContent} style={textSpring}>
          <FitText ref={ref} text={text} />
        </animated.div>

        <style jsx>{`
          img {
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
);

export default SleepingBearsCard;
