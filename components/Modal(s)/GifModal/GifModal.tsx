import React, { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Modal from '../Modal';
import GifPicker from './GifPicker';
import * as Styles from './GifModal.styles';

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY);
const searchTerm = 'funny, fail';
const fetchOneGif = (offset: number) =>
  gf.random({ tag: searchTerm, offset, limit: 10, rating: 'g' });

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  showGifPicker?: boolean;
};

export default function GifModal({ isOpen, closeModal, showGifPicker }: Props) {
  const { width, height } = useWindowSize();
  const [currentGif, setCurrentGif] = useState(null);

  useEffect(() => {
    const getGif = async () => {
      const { data } = await fetchOneGif(1);
      console.log(data);
      setCurrentGif(data);
    };

    getGif();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className={Styles.ContainerCSS.className}
      styles={Styles.ContainerCSS.styles}
    >
      <Modal.Header closeModal={closeModal}>Random Gif</Modal.Header>
      <Modal.Content
        style={{ height: 'calc(100% - 56px - 74px)', overflowY: 'scroll' }}
      >
        {showGifPicker ? (
          <GifPicker />
        ) : currentGif ? (
          <Gif
            gif={currentGif}
            width={width * 0.95 - 32}
            height={height * 0.95 - 56 - 74 - 32 - 2}
          />
        ) : null}
      </Modal.Content>
      <Modal.Actions
        cancelColor="white"
        cancelBgColor="orangered"
        cancelText={showGifPicker ? 'Hide Grid' : 'Show Grid'}
        cancelClick={console.log}
        confirmText="Next Round"
        confirmClick={closeModal}
      />
    </Modal>
  );
}
