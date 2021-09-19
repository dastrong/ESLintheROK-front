import React from 'react';
import { GifOverlayProps } from '@giphy/react-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
// import Button from 'components/Button';

export default function GifOverlay({ gif, isHovered }: GifOverlayProps) {
  console.log(gif, isHovered);
  return (
    <div>
      <button style={{ background: 'rgb(0 128 0 / 48%)' }}>
        <FaCheck />
      </button>
      <button style={{ background: 'rgb(255 0 0 / 48%)' }}>
        <FaTimes />
      </button>
      {/* <Button rounded Icon={FaCheck} color="white" bgColor="green" />
      <Button rounded Icon={FaTimes} color="white" bgColor="red" /> */}

      <style jsx>{`
        div {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.59);
          font-size: 1rem;
          opacity: 0;
          transition: opacity 250ms;
          box-shadow: 0px 0px 12px 6px inset rgb(0 0 0 / 30%);
        }

        div:hover {
          opacity: 1;
        }

        button {
          height: 100%;
          width: 50%;
          color: white;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}
