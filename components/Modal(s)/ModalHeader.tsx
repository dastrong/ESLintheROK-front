import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from 'components/Button';

export default function Header({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className="modal_header">
      <div className="modal_header_content">{children}</div>
      <Button
        rounded
        size="lg"
        Icon={FaTimes}
        color="rgba(0,0,0,1)"
        bgColor="rgba(255,255,255,1)"
        style={{ padding: '1rem' }}
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
