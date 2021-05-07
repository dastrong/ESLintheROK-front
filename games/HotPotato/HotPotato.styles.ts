import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    overflow: hidden;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #eee;
  }
`;

export const StageContainerCSS = css.resolve`
   {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export const ImgCSS = css.resolve`
   {
    height: 100vh;
  }
`;

export const CountdownTimerCSS = css.resolve`
   {
    position: absolute;
    bottom: 30px;
    right: 45px;
    height: 150px;
    font-size: 150px;
    line-height: 100%;
    z-index: 5;
    color: #000;
    text-shadow: 1px 1px 7px #dfdffd;
  }
`;
