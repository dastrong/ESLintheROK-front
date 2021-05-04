import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    z-index: -1;
    cursor: pointer;
  }
`;

export const TextContainerCSS = css.resolve`
   {
    height: 85vh;
    width: 100%;
    background-color: violet;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    text-shadow: 0px -1px 3px #fff;
  }
`;

export const TimerContainerCSS = css.resolve`
   {
    background: linear-gradient(
      90deg,
      rgba(39, 255, 0, 1) 0%,
      rgba(14, 236, 117, 1) 13%,
      rgba(13, 186, 236, 1) 28%,
      rgba(65, 18, 232, 1) 42%,
      rgba(135, 18, 237, 1) 56%,
      rgba(231, 15, 233, 1) 72%,
      rgba(237, 16, 188, 1) 86%,
      rgba(255, 0, 0, 1) 100%
    );
    height: 15vh;
    width: 100%;
    text-align: center;
    line-height: 15vh;
    font-size: 10vh;
    user-select: none;
    z-index: 1;
    position: relative;
  }
`;

export const TimerBarCSS = css.resolve`
   {
    background-color: rgb(235, 235, 235);
    border-top: 1px solid #763aad;
    height: inherit;
    position: absolute;
    right: 0;
    width: 0;
    z-index: -1;
    width: 100%;
  }
`;

export const TimerTextCSS = css.resolve`
   {
    z-index: 3;
    color: #000;
    font-weight: bold;
    text-shadow: 0px 0px 14px #763aad;
  }
`;
