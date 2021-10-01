import React from 'react';

import { useGifs } from 'contexts/gifs';
import Modal from 'components/Modals';
import GifGrid from './GifGrid';
import GifView from './GifView';

export default function GifModal() {
  const { show, gifDispatch } = useGifs();
  const closeModal = () => gifDispatch({ type: 'Close_Gif' });

  return (
    <Modal
      isOpen={!!show}
      closeModal={closeModal}
      style={{ content: { height: '95vh', width: '95vw' } }}
    >
      {show === 'grid' ? <GifGrid /> : show === 'single' ? <GifView /> : null}
    </Modal>
  );
}
