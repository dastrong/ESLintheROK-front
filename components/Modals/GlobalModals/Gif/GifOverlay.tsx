import React from 'react';
import { GifOverlayProps } from '@giphy/react-components';
import { FaTrashAlt } from 'react-icons/fa';
import Button from 'components/Button';

type Props = GifOverlayProps & {
  removeGif: () => void;
};

export default function GifOverlay({ removeGif }: Props) {
  return (
    <div>
      <Button
        rounded
        color="white"
        bgColor="red"
        text="Remove Gif"
        Icon={FaTrashAlt}
        onClick={removeGif}
      />

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
          box-shadow: 0px 0px 12px 6px inset rgb(0 0 0 / 30%);
          background: rgba(255, 255, 255, 0.59);
          opacity: 0;
          transition: opacity 250ms;
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
