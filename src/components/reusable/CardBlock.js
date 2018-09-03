import React from 'react';
import ReactFitText from 'react-fittext';
import '../../styles/reusable/CardBlock.css'

const CardBlock = ({text, compressor, boxClass, backColor, handleClick, id}) => (
  <ReactFitText 
    compressor={compressor}
    minFontSize={0}
    maxFontSize={500}
  >
    <div
      id={id}
      onClick={handleClick}
      className={boxClass}
      style={{backgroundColor: backColor}}
    >
      {text}
    </div>
  </ReactFitText>
)

export default CardBlock;