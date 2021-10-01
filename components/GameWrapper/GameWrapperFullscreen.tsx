import React, { useState } from 'react';
import fscreen from 'fscreen';
import Cookies from 'js-cookie';
import Modal from 'components/Modals';
import Switch from 'components/Switch';

export default function GameWrapperFullscreen() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);

  const hideModal = !!Number(Cookies.get('hide_fullscreen_popup'));

  return (
    <Modal isOpen={isModalOpen && !hideModal} closeModal={closeModal}>
      <Modal.Header closeModal={closeModal}>Fullscreen?</Modal.Header>
      <Modal.Content style={{ marginInline: 16 }}>
        <p>
          When playing any game you should use "presentation" mode, just like
          with PowerPoint.
        </p>
        <p>
          You can use this popup to go fullscreen before playing or by using F11
          to toggle entering and exiting yourself.
        </p>
        <p>Want to go fullscreen now?</p>
      </Modal.Content>
      <Modal.Actions
        cancelColor="white"
        cancelBgColor="orangered"
        cancelText="Not now."
        cancelClick={closeModal}
        confirmColor="white"
        confirmBgColor="#2185d0"
        confirmText="Yes, go fullscreen!"
        confirmClick={() => {
          setIsModalOpen(false);
          fscreen.requestFullscreen(document.documentElement);
        }}
      >
        <Switch
          defaultChecked={hideModal}
          onChange={e => {
            Cookies.set(
              'hide_fullscreen_popup',
              String(e.target.checked ? 1 : 0),
              {
                expires: 365,
                secure: !!(process.env.NODE_ENV === 'production'),
                sameSite: 'strict',
              }
            );
          }}
        >
          Don't show again?
        </Switch>
      </Modal.Actions>
    </Modal>
  );
}