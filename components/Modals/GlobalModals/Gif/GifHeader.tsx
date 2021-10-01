import React from 'react';
import Modal from 'components/Modals';
import Image from 'components/Image';
import { getCloudImgBase } from 'utils/getCloudUrls';

export default function GifHeader({ closeModal }: { closeModal: () => void }) {
  return (
    <Modal.Header closeModal={closeModal}>
      <a href="https://giphy.com" target="_blank">
        <Image
          isTransparent
          src={getCloudImgBase() + '/PoweredBy_GIPHY.png'}
          alt="powered by giphy"
          width={200}
          height={22}
        />
      </a>
    </Modal.Header>
  );
}
