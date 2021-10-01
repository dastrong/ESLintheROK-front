import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';
import Button from 'components/Button';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  closeModal: () => void;
};

export default function Header({
  children,
  style,
  className,
  closeModal,
}: Props) {
  const cx = classNames('modal_header', { [className]: className });

  return (
    <div className={cx}>
      <div className="modal_header_content" style={style}>
        {children}
      </div>

      <Button
        rounded
        size="lg"
        Icon={FaTimes}
        color="black"
        bgColor="transparent"
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
