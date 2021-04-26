import React from 'react';
import classNames from 'classnames';
import ReactModal, { Props } from 'react-modal';
import { css } from 'styled-jsx/css';

ReactModal.setAppElement('#__next');

const overlayCSS = css.resolve`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 11111;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

const contentCSS = css.resolve`
  .ReactModal__Content {
    outline: none;
    background: #fff;
    border: none;
    box-shadow: 1px 3px 3px 0 rgb(0 0 0 / 20%),
      1px 3px 15px 2px rgb(0 0 0 / 20%);
    border-radius: 0.25rem;
    user-select: text;
  }
`;

export default function Modal({
  children,
  isOpen,
  closeModal,
  className,
  styles,
  ...modalProps
}: Props & {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  styles?: JSX.Element;
}) {
  const cx = classNames(className, contentCSS.className);
  return (
    <ReactModal
      isOpen={isOpen}
      className={cx}
      overlayClassName={overlayCSS.className}
      onRequestClose={closeModal}
      closeTimeoutMS={500}
      {...modalProps}
    >
      {children}

      {overlayCSS.styles}
      {contentCSS.styles}
      {styles}
    </ReactModal>
  );
}
