import React, { forwardRef } from 'react';
import classNames from 'classnames';
import chroma from 'chroma-js';
import ButtonSpinner from './ButtonSpinner';
import type { Props, AnchorEl, ButtonEl } from './ButtonTypes';

const sizes = {
  xs: 0.675,
  sm: 0.85,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

// gives different shades for the color given
const getBgColors = (bgColor: string) => {
  let hoverBgColor: chroma.Color;
  let disabledBgColor: chroma.Color;
  try {
    const color = chroma(bgColor);
    hoverBgColor = color.darken(0.2);
    disabledBgColor = color.brighten(2);
  } catch (err) {
    throw new Error(err.message);
  }
  return { hoverBgColor, disabledBgColor };
};

const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  Props & (AnchorEl & ButtonEl)
>(
  (
    {
      as = 'button',
      text,
      className,
      rounded,
      Icon,
      color,
      bgColor,
      size = 'md',
      spinner,
      ...rest
    },
    ref
  ) => {
    // helps scale the margin and font-sizes of the content
    const sizeMultiplier = sizes[size];
    const iconStyle = rounded ? {} : { marginRight: '0.25rem' };

    const { hoverBgColor, disabledBgColor } = getBgColors(bgColor);

    const iconContent = spinner ? (
      <ButtonSpinner style={iconStyle} />
    ) : Icon ? (
      <Icon style={iconStyle} />
    ) : null;

    // the inner part of the element
    const buttonContent = (
      <>
        {iconContent}
        {!rounded && text}
      </>
    );

    // combine the static and dynamic classes
    const cx = classNames('styled-button', className);

    return (
      <>
        {as === 'button' ? (
          <button
            {...(rest as ButtonEl)}
            className={cx}
            ref={ref as React.ForwardedRef<HTMLButtonElement>}
          >
            {buttonContent}
          </button>
        ) : (
          <a
            {...(rest as AnchorEl)}
            className={cx}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          >
            {buttonContent}
          </a>
        )}

        <style jsx>{`
          .styled-button {
            display: inline-block;
            cursor: pointer;
            outline: 0;
            border: none;
            text-decoration: none;
            user-select: none;
            margin: 0;
            padding: ${rounded
              ? `${sizeMultiplier}rem`
              : `${sizeMultiplier * 0.75}rem ${sizeMultiplier * 1}rem`};
            border-radius: ${rounded ? '50%' : '5px'};
            color: ${color};
            background-color: ${bgColor};
            font-size: ${sizeMultiplier}rem;
            line-height: ${sizeMultiplier}rem;
            transition: 100ms background-color;
          }

          .styled-button:hover {
            background-color: ${hoverBgColor};
          }

          .styled-button:disabled {
            background-color: ${disabledBgColor};
            cursor: default;
          }
        `}</style>
      </>
    );
  }
);

export default Button;
