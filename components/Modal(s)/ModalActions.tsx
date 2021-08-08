import React, { CSSProperties } from 'react';
import Button from 'components/Button';

type Props = {
  cancelText?: string;
  cancelColor?: string;
  cancelBgColor?: string;
  cancelClick?: () => void;
  confirmText?: string;
  confirmColor?: string;
  confirmBgColor?: string;
  confirmClick?: () => void;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
  hideActions?: boolean;
  style?: CSSProperties;
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
  hideActions = false,
  style,
}: Props) {
  return (
    <div className="modal_actions" style={style}>
      {children}

      {!hideActions && (
        <div>
          {/* Cancel Button */}
          {cancelClick && (
            <Button
              size="md"
              text={cancelText}
              color={cancelColor}
              bgColor={cancelBgColor}
              onClick={cancelClick}
              style={{ marginRight: confirmClick ? '0.5rem' : '0' }}
            />
          )}

          {/* Confirm Button */}
          {confirmClick && (
            <Button
              size="md"
              text={confirmText}
              color={confirmColor}
              bgColor={confirmBgColor}
              onClick={confirmClick}
              disabled={confirmDisabled}
            />
          )}
        </div>
      )}

      <style jsx>{`
        .modal_actions {
          padding: 1rem;
          display: flex;
          justify-content: ${hideActions
            ? 'center'
            : children
            ? 'space-between'
            : 'flex-end'};
          align-items: center;
          min-height: 74px;
        }
      `}</style>
    </div>
  );
}
