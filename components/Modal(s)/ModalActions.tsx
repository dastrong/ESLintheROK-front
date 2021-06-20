import React from 'react';
import Button from 'components/Button';

type Props = {
  cancelText?: string;
  cancelColor?: string;
  cancelBgColor?: string;
  cancelClick?: () => void;
  confirmText: string;
  confirmColor?: string;
  confirmBgColor?: string;
  confirmClick: () => void;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
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
  confirmDisabled = false,
  children,
}: Props) {
  return (
    <div className="modal_actions">
      {children}

      <div>
        {/* Cancel Button */}
        {cancelClick && (
          <Button
            size="md"
            text={cancelText}
            color={cancelColor}
            bgColor={cancelBgColor}
            onClick={cancelClick}
            style={{ marginRight: '0.5rem' }}
          />
        )}

        {/* Confirm Button */}
        <Button
          size="md"
          text={confirmText}
          color={confirmColor}
          bgColor={confirmBgColor}
          onClick={confirmClick}
          disabled={confirmDisabled}
        />
      </div>

      <style jsx>{`
        .modal_actions {
          padding: 1rem;
          display: flex;
          justify-content: ${children ? 'space-between' : 'flex-end'};
          align-items: center;
        }
      `}</style>
    </div>
  );
}
