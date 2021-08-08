import React, { CSSProperties } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from 'components/Button';

export default function Header({
  children,
  closeModal,
  style,
}: {
  children: React.ReactNode;
  closeModal: () => void;
  style?: CSSProperties;
}) {
  return (
    <div className="modal_header">
      <div className="modal_header_content" style={style}>
        {children}
      </div>

      <Button
        rounded
        size="lg"
        Icon={FaTimes}
        color="black"
        bgColor="white"
        style={{ padding: '1rem', marginRight: '1rem' }}
        onClick={closeModal}
      />

      <style jsx>{`
        .modal_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
        }

        .modal_header_content {
          padding: 1rem;
          font-size: 1.25rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
