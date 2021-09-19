import React from 'react';
import classNames from 'classnames';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import * as Styles from './Modal.styles';

ReactModal.setAppElement('#__next');

type Props = ReactModalProps & {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

function Modal({ children, isOpen, closeModal, ...modalProps }: Props) {
  const cx = classNames(Styles.ModalContentCSS.className, {
    [modalProps.className as string]: modalProps.className,
  });

  return (
    <ReactModal
      {...modalProps}
      isOpen={isOpen}
      className={cx}
      overlayClassName={Styles.ModalOverlayCSS.className}
      onRequestClose={closeModal}
      closeTimeoutMS={500}
    >
      {children}

      {Styles.ModalOverlayCSS.styles}
      {Styles.ModalContentCSS.styles}
      <style jsx global>{`
        .ReactModal__Body--open {
          overflow: hidden;
        }
      `}</style>
    </ReactModal>
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;
