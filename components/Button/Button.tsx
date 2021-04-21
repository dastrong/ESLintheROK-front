import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { VarColorTypes } from 'utils/theme';

type Button = {
  textColor: string;
  bgColor: string;
  icon?: boolean;
  text?: string;
  children?: React.ReactNode;
  spinner?: boolean;
};

export default function Button({
  textColor,
  bgColor,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  textColor: string;
  bgColor: VarColorTypes | 'green' | 'yellow';
}) {
  // apply global button styles
  const cx = classNames('btn', props.className);

  return (
    <button {...props} className={cx}>
      This is a Button
      <style jsx>{`
        button {
          margin: 0;
          padding: 0.75rem 1.2rem;
          border-radius: 5px;
          color: ${textColor};
          background-color: ${bgColor};
        }
      `}</style>
    </button>
  );
}
