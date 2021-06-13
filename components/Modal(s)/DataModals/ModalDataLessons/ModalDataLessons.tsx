import React from 'react';
import { css } from 'styled-jsx/css';
import type { DataModalProps } from '../types';
import Modal from '../../Modal';

const contentCSS = css.resolve`
  .ReactModal__Content {
    width: 600px;
  }
`;

export default function ModalDataLessons({
  closeModal,
  dataModalName,
}: DataModalProps) {
  return (
    <Modal
      isOpen={dataModalName === 'lessons'}
      closeModal={closeModal}
      className={contentCSS.className}
      styles={contentCSS.styles}
    >
      <Modal.Header closeModal={closeModal}>Choose a Lesson</Modal.Header>

      <Modal.Content>
        <span>Choose a Lesson</span>
      </Modal.Content>

      <Modal.Actions
        cancelText="Cancel"
        cancelClick={closeModal}
        confirmText="Confirm"
        confirmClick={console.log}
      />

      <style jsx>{``}</style>
    </Modal>
  );
}
