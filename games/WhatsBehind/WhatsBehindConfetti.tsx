import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default function WhatsBehindConfetti() {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        className="confetti"
        recycle={false}
        width={width}
        height={height}
      />

      <style jsx>{`
        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
