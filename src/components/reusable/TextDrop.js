import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../styles/reusable/TextDrop.css';

const TextDrop = ({styles, text, isIn, timeout}) => (
  <CSSTransition
    classNames='letterDrop'
    in={isIn}
    timeout={Number(timeout)}
  >
    <span 
      className='letterDrop'
      style={{...styles}} >
        {text}
    </span>
  </CSSTransition>
);

export default TextDrop;