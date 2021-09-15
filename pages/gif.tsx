import React, { useState } from 'react';
import GifModal from 'components/Modal(s)/GifModal';

export default function Gif() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Show Gif Modal</button>
      <GifModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
}
