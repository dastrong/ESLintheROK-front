import React from 'react';
import Button from 'components/Button';

type Props = {
  cancelText: string;
  cancelColor?: string;
  cancelBgColor?: string;
  cancelClick: () => void;
  confirmText: string;
  confirmColor?: string;
  confirmBgColor?: string;
  confirmClick: () => void;
};

export default function Actions({
  cancelText = 'Cancel',
  cancelColor = 'white',
  cancelBgColor = '#db2828',
  cancelClick,
  confirmText = 'Confirm',
  confirmColor = 'white',
  confirmBgColor = '#2185d0',
  confirmClick,
}: Props) {
  return (
    <div className="modal_actions">
      {/* Cancel Button */}
      <Button
        size="md"
        text={cancelText}
        color={cancelColor}
        bgColor={cancelBgColor}
        onClick={cancelClick}
        style={{ marginRight: '0.5rem' }}
      />

      {/* Confirm Button */}
      <Button
        size="md"
        text={confirmText}
        color={confirmColor}
        bgColor={confirmBgColor}
        onClick={confirmClick}
      />

      <style jsx>{`
        .modal_actions {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}
