import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { VarColorTypes } from 'utils/theme';
import ButtonSpinner from './ButtonSpinner';

type Rounded = boolean;
type Icon = IconType;
type Text = string;
type Color = string;
type BgColor = VarColorTypes | 'green' | 'yellow';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Spinner = boolean;

type RoundedButton = {
  text?: never;
  rounded: Rounded;
  Icon: Icon;
};

type TextButton = {
  text: Text;
  rounded?: never;
  Icon?: never;
};

type TextWithIconButton = {
  text: Text;
  rounded?: never;
  Icon: Icon;
};

type Button = (RoundedButton | TextButton | TextWithIconButton) & {
  color: Color;
  bgColor: BgColor;
  size?: Size;
  spinner?: Spinner;
};

const sizes = {
  xs: 0.675,
  sm: 0.85,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

export default function Button({
  text,
  rounded,
  Icon,
  color,
  bgColor,
  size = 'md',
  spinner,
  ...props
}: Button & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizeMultiplier = sizes[size];

  return (
    <button {...props} className={classNames('styled-button', props.className)}>
      {rounded ? (
        spinner ? (
          <ButtonSpinner />
        ) : (
          <Icon />
        )
      ) : (
        <>
          {spinner ? (
            <ButtonSpinner style={{ marginRight: '0.25rem' }} />
          ) : Icon ? (
            <Icon style={{ marginRight: '0.25rem' }} />
          ) : null}
          {text}
        </>
      )}

      <style jsx>{`
        .styled-button {
          margin: 0;
          padding: ${rounded
            ? `${sizeMultiplier}rem`
            : `${sizeMultiplier * 0.75}rem ${sizeMultiplier * 1}rem`};
          border-radius: ${rounded ? '50%' : '5px'};
          color: ${color};
          background-color: ${bgColor};
          font-size: ${sizeMultiplier}rem;
          line-height: ${sizeMultiplier}rem;
        }

        .icon-with-text {
          margin-right: 0.25rem;
        }
      `}</style>
    </button>
  );
}
