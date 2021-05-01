import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font: ${fontFamily};
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CardCSS = css.resolve`
   {
    transition: 1s transform;
  }
`;

export const FitTextCSS = css.resolve`
   {
    transition: 0.125s transform;
  }
`;
