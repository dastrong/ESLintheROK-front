import React, { forwardRef } from 'react';
import classNames from 'classnames';
import ButtonSpinner from './ButtonSpinner';
import type { Props, AnchorEl, ButtonEl } from './ButtonTypes';

const sizes = {
  xs: 0.675,
  sm: 0.85,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

const Button = forwardRef<HTMLAnchorElement, Props & (AnchorEl & ButtonEl)>(
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

    if (ref && rest.onClick && !rest.href) {
      throw new Error(
        'When you wrap `Button` with a Next.js `Link`, you must add the passHref prop to the Link`'
      );
    }

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
          <button {...(rest as ButtonEl)} className={cx}>
            {buttonContent}
          </button>
        ) : (
          <a {...(rest as AnchorEl)} className={cx} ref={ref}>
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
          }
        `}</style>
      </>
    );
  }
);

export default Button;
