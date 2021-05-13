import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    overflow: hidden;
    height: 100vh;
  }
`;

export const FlipperContainerCSS = css.resolve`
   {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
  }
`;
export const CardHolderCSS = css.resolve`
   {
    box-sizing: border-box;
    height: 32.33vh;
    width: 32.33vw;
    margin: 0.5vh 0.5vw;
    color: #fff;
    text-shadow: 3px 3px 1px black;
    user-select: none;
  }
`;

export const CardCSS = css.resolve`
   {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
`;

export const CardNumCSS = css.resolve`
   {
    position: absolute;
    text-shadow: none;
    font-size: 9vw;
    width: 100%;
    height: 100%;
    border: 6px solid #111;
    z-index: 2;
  }
`;

export const CardTextCSS = css.resolve`
   {
    width: 100%;
    height: 100%;
    border: 4px solid #111;
    background-color: #676767;
  }
`;
