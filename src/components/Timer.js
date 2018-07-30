import React from 'react';
import '../styles/Timer.css';

const Timer = ({timeRemaining}) => (
  <div className='timer'>
    {timeRemaining}
  </div>
)

export default Timer;