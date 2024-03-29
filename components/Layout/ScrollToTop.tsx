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

  if (scrollY < 10) return null;

  return (
    <div>
      <Button
        rounded
        aria-label="Scroll To Top"
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
          margin-top: calc(
            var(--footerHeight) - ${rightSvgWidthToHeight} * 100vw - 60px
          );
        }

        @media screen and (min-width: ${maxWidth}px) {
          div {
            margin-top: -125px;
          }
        }
      `}</style>
    </div>
  );
}
