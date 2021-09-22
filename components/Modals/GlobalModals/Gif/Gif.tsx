import React from 'react';

import { useGifs } from 'contexts/gifs';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import GifGrid from './GifGrid';
import GifView from './GifView';

export default function GifModal() {
  const { view } = useGifs();
  const { showGif, storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Gif' });

  return (
    <Modal
      isOpen={showGif}
      closeModal={closeModal}
      style={{ content: { height: '95vh', width: '95vw' } }}
    >
      {view === 'grid' ? <GifGrid /> : <GifView />}
    </Modal>
  );
}
