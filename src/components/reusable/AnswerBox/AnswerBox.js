import React from "react";
import { animated, useSpring, config } from "react-spring";
import useFitText from "hooks/useFitText";
import FitText from "@Reusable/FitText";
import "./AnswerBox.css";

export default function Answer({ showBox, showText, answer, font }) {
  const [[textRef]] = useFitText(1, answer, font);
  const [[headerRef]] = useFitText(1, null, font);

  const boxOpts =
    showBox || showText
      ? { opacity: 1, transform: "translateX(0vw)" }
      : { opacity: 0, transform: "translateX(100vw)" };
  const boxSpring = useSpring({ config: config.wobbly, ...boxOpts });
  const headerSpring = useSpring({
    transform: showBox ? "translateY(0)" : "translateY(-19vh)",
  });

  return (
    <>
      <animated.div className="answerBox-header" style={headerSpring}>
        <FitText text="Show your answers" ref={headerRef} />
      </animated.div>
      <animated.div className="answerBox-box" style={boxSpring}>
        <animated.div style={{ opacity: showText ? 1 : 0 }}>
          <FitText text={answer} ref={textRef} />
        </animated.div>
      </animated.div>
    </>
  );
}
