import React from 'react';
import { GifOverlayProps } from '@giphy/react-components';
import { FaBan } from 'react-icons/fa';
import Button from 'components/Button';

type Props = GifOverlayProps & {
  isBlocked: boolean;
  blockGif: () => void;
};

export default function GifOverlay({ isBlocked, blockGif }: Props) {
  return (
    <div>
      <Button
        rounded
        color="white"
        bgColor="red"
        text={isBlocked ? 'Blocked' : 'Block Gif'}
        Icon={FaBan}
        disabled={isBlocked}
        onClick={blockGif}
      />

      <style jsx>{`
        div {
          background: rgba(255, 255, 255, ${isBlocked ? 0.99 : 0.59});
          opacity: ${isBlocked ? 1 : 0};
        }
      `}</style>

      <style jsx>{`
        div {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
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
