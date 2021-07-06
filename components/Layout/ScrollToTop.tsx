import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import useScrollPosition from '@react-hook/window-scroll';
import Button from 'components/Button';

const rightSvgWidthToHeight = 369 / 1200;

export default function ScrollToTop({ maxWidth }: { maxWidth: number }) {
  const scrollY = useScrollPosition();

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  return (
    <div>
      <Button
        rounded
        size="lg"
        Icon={FaAngleDoubleUp}
        color="white"
        bgColor="#02a9ff87"
        onClick={scrollToTop}
      />

      <style jsx>{`
        div {
          position: sticky;
          z-index: 1111;
          height: 0;
          bottom: calc(1rem + 60px);
          right: 1rem;
          float: right;
          margin-top: calc(250px - ${rightSvgWidthToHeight} * 100vw - 60px);
          opacity: ${scrollY > 0 ? 1 : 0};
          transition: opacity 200ms;
        }

        @media screen and (min-width: ${maxWidth}px) {
          div {
            margin-top: -169px;
          }
        }
      `}</style>
    </div>
  );
}
