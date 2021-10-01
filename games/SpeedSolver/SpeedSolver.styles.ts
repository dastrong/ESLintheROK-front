import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    background-position: bottom;
    background-size: cover;
    position: absolute;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    user-select: none;
    cursor: pointer;
  }

  :after {
    content: '';
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 1;
  }
`;

export const InfoCSS = css.resolve`
   {
    position: absolute;
    width: 100%;
    top: 37.5vh;
    height: 25vh;
    line-height: 100%;
    font-size: 23vh;
    text-align: center;
    z-index: 2;
  }
`;

export const LettersCSS = css.resolve`
   {
    position: absolute;
    /* if sizes are changed, update the value in getSideValues  */
    height: 20vh;
    font-size: 18vh;
    line-height: 100%;
    text-align: center;
    z-index: 2;
  }
`;
