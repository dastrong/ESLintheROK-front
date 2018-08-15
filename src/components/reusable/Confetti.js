import React from 'react'
import Confetti from 'react-confetti';

export default () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
    <Confetti height={1000} 
              width={1000} 
              recycle={false}
              numberOfPieces={400}
              gravity={0.3} />
  </div>
);