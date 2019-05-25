import React from "react";
import ReactFitText from "react-fittext";
import "./Card.css";

const Card = ({
  handleClick,
  index,
  classNames,
  frontColor,
  frontText,
  backColor,
  backText,
  compressor,
}) => (
  <div className={classNames}>
    <ReactFitText compressor={compressor} minFontSize={0} maxFontSize={500}>
      <div
        className="front"
        id={index}
        style={{ backgroundColor: frontColor }}
        onClick={handleClick}
      >
        {frontText}
      </div>
    </ReactFitText>
    <div className="back" style={{ backgroundColor: backColor }} onClick={handleClick}>
      {backText}
    </div>
  </div>
);

export default Card;
