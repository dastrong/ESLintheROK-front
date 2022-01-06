import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    overflow: hidden;
    height: 100vh;
  }
`;

export const FlipperContainerCSS = css.resolve`
  div {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
  }
`;

export const CardHolderCSS = css.resolve`
  div {
    box-sizing: border-box;
    height: 32.33vh;
    width: 32.33vw;
    margin: 0.5vh 0.5vw;
    color: #fff;
    user-select: none;
    text-shadow: 3px 3px 1px black;
    border: 3px solid #111;
  }
`;

export const CardCSS = css.resolve`
  div {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
`;

export const CardNumCSS = css.resolve`
  div {
    position: absolute;
    font-size: 9vw;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
`;

export const CardTextCSS = css.resolve`
  div {
    width: 100%;
    height: 100%;
    background-color: #676767;
  }
`;
