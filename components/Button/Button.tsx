import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { darken, transparentize } from 'color2k';
import ButtonSpinner from './ButtonSpinner';
import type { Props, AnchorEl, ButtonEl } from './Button.types';

const sizes = {
  xs: 0.675,
  sm: 0.85,
  md: 1,
  lg: 1.25,
  xl: 1.5,
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
      full = false,
      inverted = false,
      iconPosition = 'left',
      ...rest
    },
    ref
  ) => {
    // helps scale the margin and font-sizes of the content
    const sizeMultiplier = sizes[size];

    // if we have an Icon and Text we needed spacing between
    const noMargin = !Icon || !text;
    // and we'd add the spacing to the Icon here
    const iconStyle = noMargin
      ? {}
      : iconPosition === 'right'
      ? { marginLeft: '0.5rem' }
      : { marginRight: '0.5rem' };

    // determine the hover and disable colors automatically based on the given bgColor prop
    const hoverBgColor = darken(bgColor, 0.05);
    const disabledBgColor = transparentize(bgColor, 0.4);

    // determine what the icon will be, if anything
    const iconContent = spinner ? (
      <ButtonSpinner style={iconStyle} />
    ) : Icon ? (
      <Icon style={iconStyle} />
    ) : null;

    // the inner part of the element
    const buttonContent = (
      <>
        {iconPosition === 'left' && iconContent}
        {!!text && text}
        {iconPosition === 'right' && iconContent}
      </>
    );

    // combine the static and dynamic classes
    const cx = classNames('styled-button', className, {
      disabled: rest.disabled,
    });

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
            border: 1px solid ${inverted ? bgColor : 'transparent'};
            text-decoration: none;
            user-select: none;
            margin: 0;
            padding: ${rounded
              ? `${sizeMultiplier}rem`
              : `${sizeMultiplier * 0.75}rem ${sizeMultiplier * 1}rem`};
            border-radius: ${!rounded ? '0.5rem' : text ? '50rem' : '50%'};
            color: ${inverted ? bgColor : color};
            background-color: ${inverted ? 'transparent' : bgColor};
            font-size: ${sizeMultiplier}rem;
            line-height: ${sizeMultiplier}rem;
            transition-duration: 150ms;
            transition-property: background-color, transform, opacity;
            width: ${full ? '100%' : 'initial'};
          }

          .styled-button:hover {
            opacity: 1;
            color: ${inverted ? hoverBgColor : color};
            background-color: ${inverted ? 'transparent' : hoverBgColor};
          }

          .styled-button:disabled,
          .styled-button.disabled {
            pointer-events: none;
            color: ${inverted ? hoverBgColor : color};
            border-color: ${inverted ? disabledBgColor : 'transparent'};
            background-color: ${inverted ? 'transparent' : disabledBgColor};
            cursor: default;
          }
        `}</style>
      </>
    );
  }
);

export default Button;
