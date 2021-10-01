import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Modal from 'components/Modals';
import Logo from 'components/Layout/Logo';

export default function MobileNotice() {
  const { width } = useWindowSize();

  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const closeModal = () => setShowMobileNotice(false);

  useEffect(() => {
    if (width < 768) {
      setShowMobileNotice(true);
    } else {
      setShowMobileNotice(false);
    }
  }, [width]);

  return (
    <Modal
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      isOpen={showMobileNotice}
      closeModal={closeModal}
      style={{
        overlay: {
          background: 'linear-gradient(189deg, #cdeeff, #6c63ff)',
        },
        content: {
          minWidth: 300,
          maxWidth: 500,
          width: '90%',
          maxHeight: '95vh',
          textAlign: 'center',
        },
      }}
    >
      <Modal.Header closeModal={closeModal}>
        <span role="img" aria-label="waving hand">
          👋
        </span>{' '}
        Hey!
      </Modal.Header>
      <Modal.Content
        style={{
          maxHeight: 'calc(95vh - 56px - 74px)',
          overflowY: 'auto',
          lineHeight: 1.5,
        }}
      >
        <Logo style={{ width: 60 }} />
        <h1>ESL in the ROK</h1>
        <h4>Sorry, we're not optimized for this screen size.</h4>
        <hr />
        <p>
          You may be asking yourself, <i>why?</i>
        </p>
        <p>
          Well this site was made to replace PowerPoint games in a classroom,
          which are played on large screens. Therefore, there was never a need
          to support a mobile version of the site.
        </p>
        <p>
          However, because this site is made for the community if there's demand
          for a mobile version, or anything else for that matter, we'll try to
          support/implement it. Visit us on a larger screen to get in touch with
          us.
        </p>
        <i>Sorry for the inconvenience.</i>
        <style jsx>{`
          h1 {
            margin: 0.5rem 0;
            color: #242424;
          }

          h4 {
            margin: 0.5rem 0 1rem;
            color: #3d3d3d;
          }

          p,
          i {
            color: #444444;
          }

          hr {
            background-color: #e4b1ec;
            margin: 0 auto;
            width: 80%;
            height: 2px;
            border: none;
          }
        `}</style>
      </Modal.Content>
      <Modal.Actions hideActions style={{ color: '#444444' }}>
        This message will self-destruct once the screen size increases
      </Modal.Actions>
    </Modal>
  );
}
