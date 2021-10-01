import classNames from 'classnames';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import type { ArrowProps } from 'react-multi-carousel';
import * as Styles from './Carousel.styles';

export const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        Styles.CarouselArrow.className,
        Styles.CarouselArrowLeft.className
      )}
    >
      <FaAngleLeft />
    </button>
  );
};

export const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        Styles.CarouselArrow.className,
        Styles.CarouselArrowRight.className
      )}
    >
      <FaAngleRight />
    </button>
  );
};
