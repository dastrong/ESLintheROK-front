import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

export const CardCSS = css.resolve`
  div {
    transition: 1s transform, 0.5s flex;
  }
`;

export const FitTextCSS = css.resolve`
  span {
    transition: 0.35s transform;
  }
`;
