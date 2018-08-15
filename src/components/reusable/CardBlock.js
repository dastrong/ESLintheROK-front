import React from 'react';
import ReactFitText from 'react-fittext';
import { CSSTransition } from 'react-transition-group';
import '../../styles/reusable/CardBlock.css'

const CardBlock = ({text, compressor, shouldAnimate, timeout, boxClass, backColor}) => (
  <ReactFitText 
    compressor={compressor}
    minFontSize={0}
    maxFontSize={500}
  >
    <CSSTransition
      in={shouldAnimate}
      timeout={timeout}
      classNames='box'
    >
      <div 
        className={boxClass}
        style={{backgroundColor: backColor}}>
        {text}
      </div>
    </CSSTransition>
  </ReactFitText>
)

export default CardBlock;