import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CardCSS = css.resolve`
  div {
    transition: 1s transform;
  }
`;

export const FitTextCSS = css.resolve`
  span {
    transition: 0.125s transform;
  }
`;
