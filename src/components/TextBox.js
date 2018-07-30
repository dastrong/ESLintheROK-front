import React from 'react';
import ReactFitText from 'react-fittext';
import '../styles/TextBox.css';

const TextBox = ({text, compressor}) => (
  <ReactFitText
    compressor={compressor}
    minFontSize={0}
    maxFontSize={500} >
    <div className='textbox'>
      {text}
    </div>
  </ReactFitText>
)

export default TextBox;