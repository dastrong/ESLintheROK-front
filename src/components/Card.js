import React from 'react';
import ReactFitText from 'react-fittext';
import '../styles/Card.css';

const Card = ({handleClick, name, index, isX, classNames, frontColor, compressor}) => (
  <div className={classNames}>
    <ReactFitText 
      compressor={compressor}
      minFontSize={0}
      maxFontSize={500}
    >
      <div className='front'
           id={index}
           style={{backgroundColor: frontColor}}
           onClick={handleClick}>
        {name}
      </div>
    </ReactFitText>
    <div className='back'
         style={{backgroundColor: isX ? 'red' : 'lime'}} >
      {isX ? 'X' : 'O'}
    </div>
  </div>
);

export default Card;