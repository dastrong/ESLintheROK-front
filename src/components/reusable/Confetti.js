import React from 'react'
import Confetti from 'react-confetti';

const style = {
  position: 'absolute', 
  top: 0, 
  left: 0, 
  width: '100vw', 
  height: '100vh', 
  pointerEvents: 'none'
}

export default props => (
  <div style={style}>
    <Confetti {...props} />
  </div>
);