import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TextDrop = ({styles, text, isIn, timeout}) => (
  <CSSTransition
    classNames='letterDrop'
    in={isIn}
    timeout={timeout}
  >
    <span 
      className='letterDrop'
      style={{...styles}}>
        {text}
    </span>
  </CSSTransition>
);

export default TextDrop;