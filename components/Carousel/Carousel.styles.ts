import { css } from 'styled-jsx/css';

export const CarouselListCSS = css.resolve`
   {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
`;

export const CarouselTrackCSS = css.resolve`
   {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, transition;
  }
`;

export const CarouselItemCSS = css.resolve`
   {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    padding: 0.25rem;
  }

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

export const CarouselArrow = css.resolve`
  button {
    position: absolute;
    outline: 0;
    transition: all 0.5s;
    border-radius: 35px;
    z-index: 1000;
    border: 0;
    background: rgba(0, 0, 0, 0.5);
    min-width: 43px;
    min-height: 43px;
    opacity: 1;
    cursor: pointer;
    color: #fff;
  }
`;
