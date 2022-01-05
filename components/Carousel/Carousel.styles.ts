import css from 'styled-jsx/css';

export const CarouselListCSS = css.resolve`
  div {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
`;

export const CarouselTrackCSS = css.resolve`
  ul {
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
  li {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    padding: 0.25rem;
  }
  li:first-child {
    margin-left: 0;
  }

  li:last-child {
    margin-right: 0;
  }
`;

export const CarouselArrow = css.resolve`
  button {
    position: absolute;
    outline: 0;
    transition: opacity 250ms;
    border-radius: 35px;
    z-index: 1000;
    border: 0;
    opacity: 0.25;
    cursor: pointer;
    color: #fff;
    aspect-ratio: 1 / 1;
    height: 100%;
  }

  button:hover {
    opacity: 1;
  }
`;

export const CarouselArrowLeft = css.resolve`
  button {
    left: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  }
`;

export const CarouselArrowRight = css.resolve`
  button {
    right: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  }
`;
