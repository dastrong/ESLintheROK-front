import React from 'react';
import ReactFitText from 'react-fittext';
import '../../styles/reusable/TextBox.css';

const TextBox = ({text, compressor, width, height}) => (
  <ReactFitText
    compressor={compressor}
    minFontSize={0}
    maxFontSize={500} >
    <div className='textbox'
        style={{width, height}}>
      {text}
    </div>
  </ReactFitText>
)

export default TextBox;