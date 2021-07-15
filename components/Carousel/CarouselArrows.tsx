import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import type { ArrowProps } from 'react-multi-carousel';
import { CarouselArrow } from './Carousel.styles';

export const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={CarouselArrow.className}
      style={{ left: 5 }}
    >
      <FaAngleLeft />
    </button>
  );
};

export const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={CarouselArrow.className}
      style={{ right: 5 }}
    >
      <FaAngleRight />
    </button>
  );
};
