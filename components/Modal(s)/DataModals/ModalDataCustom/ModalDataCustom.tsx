import React from 'react';
import { css } from 'styled-jsx/css';
import { FaTimes } from 'react-icons/fa';

import type { DataModalProps } from '../types';
import Modal from '../../Modal';

const contentCSS = css.resolve`
  .ReactModal__Content {
    width: 600px;
  }
`;

export default function ModalDataCustom({
  closeModal,
  dataModalName,
}: DataModalProps) {
  return (
    <Modal
      isOpen={dataModalName === 'custom'}
      closeModal={closeModal}
      className={contentCSS.className}
      styles={contentCSS.styles}
    >
      {/* HEADER */}
      <div className="modal_header">
        Lessons Modal
        <button onClick={closeModal}>
          <FaTimes style={{ fontSize: '1.25rem' }} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="modal_content">
        <span>Custom Data Content</span>
      </div>

      {/* ACTIONS */}
      <div className="modal_actions"></div>

      <style jsx>{`
        div {
          padding: 1rem;
        }

        div:not(:last-child) {
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
        }

        .modal_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .modal_header button {
          background: transparent;
          height: 1.25rem;
          padding: 0;
          outline: 1px solid auto;
        }

        .modal_header button:hover {
          opacity: 0.9;
        }

        .modal_content {
        }
        .modal_actions {
        }
      `}</style>
    </Modal>
  );
}
