import React, { useRef, useEffect } from 'react';
import { default as ReactCarousel } from 'react-multi-carousel';
import { getScale } from 'color2k';

import Button from 'components/Button';
import type { Size as ButtonSize } from 'components/Button/Button.types';
import { CustomLeftArrow, CustomRightArrow } from './CarouselArrows';
import * as Styles from './Carousel.styles';

type Props = {
  width: string;
  items: {
    text: string;
    id: string;
  }[];
  activeItem?: string | string[];
  handleClick: (chosenGrade: string) => void;
  buttonSize?: ButtonSize;
  numOfItemsToShow?: number;
  numOfItemsToSlide?: number;
  itemColorScale: string[];
  toggleable?: boolean;
};

export default function Carousel({
  width,
  items,
  activeItem,
  handleClick,
  buttonSize = 'md',
  numOfItemsToShow = 4,
  numOfItemsToSlide = 2,
  itemColorScale,
  toggleable = false,
}: Props) {
  const carouselRef = useRef<ReactCarousel>();
  const getColor = getScale(...itemColorScale);

  useEffect(() => {
    if (!activeItem || typeof activeItem !== 'string') return;

    const getOptimalSlide = (activeItem: string): number => {
      // get the index of the currently clicked item
      const activeIndex = items.findIndex(({ id }) => id === activeItem);

      const lastItemIndex = items.length - 1;
      const midPoint = numOfItemsToShow / 2;
      const midPointFloored = Math.floor(midPoint);
      const midPointRounded = Math.round(midPoint);

      // override the slide index for the items before the midway point
      if (activeIndex < midPointRounded) return 0;
      // override the slide index for the last couple items
      if (activeIndex > lastItemIndex - midPointRounded) {
        return lastItemIndex - midPointRounded - midPointFloored + 1;
      }
      // center the rest of the items
      return activeIndex - midPointRounded + 1;
    };

    const optimalSlide = getOptimalSlide(activeItem);
    carouselRef.current.goToSlide(optimalSlide);
  }, [activeItem, items, numOfItemsToShow]);

  return (
    <div style={{ width, lineHeight: 1, fontSize: '1rem' }}>
      <ReactCarousel
        ref={carouselRef}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 767 },
            items: numOfItemsToShow,
            slidesToSlide: numOfItemsToSlide,
          },
        }}
        containerClass={Styles.CarouselListCSS.className}
        sliderClass={Styles.CarouselTrackCSS.className}
        itemClass={Styles.CarouselItemCSS.className}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {items.map(({ text, id }, i, arr) => {
          const isActive =
            activeItem &&
            (typeof activeItem === 'string'
              ? activeItem === id
              : activeItem.includes(id));
          const x = (i / (arr.length - 1)) * 100;
          const bgColor = getColor(x / 100);
          return (
            <Button
              key={id}
              rounded
              color="white"
              bgColor={bgColor}
              text={text}
              size={buttonSize}
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
                transform: `scale(${isActive ? 1.05 : 1})`,
                textDecoration: isActive ? 'underline' : 'none',
              }}
              onClick={() => handleClick(id)}
              disabled={isActive && !toggleable}
            />
          );
        })}
      </ReactCarousel>

      {Styles.CarouselListCSS.styles}
      {Styles.CarouselTrackCSS.styles}
      {Styles.CarouselItemCSS.styles}
      {Styles.CarouselArrow.styles}
      {Styles.CarouselArrowLeft.styles}
      {Styles.CarouselArrowRight.styles}
    </div>
  );
}
