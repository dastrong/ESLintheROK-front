import React from "react";
import ReactFitText from "react-fittext";
import "./CardBlock.css";

const CardBlock = ({
  text,
  compressor,
  boxClass,
  backColor,
  handleClick,
  id,
  timeout,
}) => (
  <ReactFitText compressor={compressor} minFontSize={0} maxFontSize={500}>
    <div
      id={id}
      onClick={handleClick}
      className={boxClass}
      style={{
        backgroundColor: backColor,
        transitionDelay: `${timeout}ms`,
      }}
    >
      {text}
    </div>
  </ReactFitText>
);

export default CardBlock;
