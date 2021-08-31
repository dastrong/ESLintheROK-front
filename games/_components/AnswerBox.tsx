import React from 'react';
import css from 'styled-jsx/css';
import { animated, useSpring, config } from 'react-spring';
import useFitText from 'hooks/useFitText';
import FitText from 'components/FitText';

const HeaderCSS = css.resolve`
   {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1vh;
    height: 18vh;
    width: 100%;
    z-index: 4;
  }
`;

const TextContainerCSS = css.resolve`
   {
    position: absolute;
    border: 7px solid rgb(239, 239, 239);
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.73);
    box-shadow: inset 0 0 4px 1px rgb(65, 65, 65);
    height: 73vh;
    top: 20vh;
    width: 94%;
    left: 3%;
    z-index: 2;
  }
`;

const TextHolderCSS = css.resolve`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export default function AnswerBox({
  showBox,
  showText,
  answer,
}: {
  showBox: boolean;
  showText: boolean;
  answer: string;
}) {
  const [[textRef]] = useFitText(answer);
  const [[headerRef]] = useFitText('');

  const headerStyles = useSpring({ translateY: showBox ? '0vh' : '-19vh' });
  const textContainerStyles = useSpring({
    opacity: showBox || showText ? 1 : 0,
    translateX: showBox || showText ? '0vw' : '100vw',
    config: config.wobbly,
  });
  const textStyles = useSpring({ opacity: showText ? 1 : 0, immediate: true });

  return (
    <>
      <animated.div style={headerStyles} className={HeaderCSS.className}>
        <FitText text="Show your answers" ref={headerRef} />
      </animated.div>

      <animated.div
        style={textContainerStyles}
        className={TextContainerCSS.className}
      >
        <animated.div style={textStyles} className={TextHolderCSS.className}>
          <FitText text={answer} ref={textRef} />
        </animated.div>
      </animated.div>

      {HeaderCSS.styles}
      {TextContainerCSS.styles}
      {TextHolderCSS.styles}
    </>
  );
}
