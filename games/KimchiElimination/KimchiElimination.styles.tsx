import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }
`;

export const SlideCSS = css.resolve`
  div {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    text-shadow: 0 -1px 3px #fff;
  }
`;

export const KimchiCSS = css.resolve`
  img,
  span {
    width: 50%;
    min-width: 500px;
    max-width: 800px;
    margin: auto;
  }
`;

export const PooCSS = css.resolve`
  span {
    line-height: 100%;
    height: 350px;
    font-size: 300px;
    text-align: center;
  }
`;

export const FrequencyCSS = css.resolve`
  div {
    position: absolute;
    bottom: 3vh;
    left: 3vw;
    font-size: 10vw;
    line-height: 10vw;
    color: #7b7b7b;
  }
`;
