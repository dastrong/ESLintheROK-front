import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    background: linear-gradient(240deg, #ff0000, #fff200, #1e9600);
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;
  }
`;

export const CardHolderCSS = css.resolve`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-shadow: -1px -1px 2px #fff;
  }
`;

export const CardCSS = css.resolve`
  div {
    box-shadow: 1px 1px 3px #7d7d7d;
    border: 2px solid #141312;
    border-radius: 10px;
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

export const CardFrontCSS = css.resolve`
  div {
    background-color: rgba(255, 255, 255, 0.4);
    transform: scale(1, 1);
    position: absolute;
    opacity: 1;
    z-index: 1;
    font-size: 8vw;
  }
`;

export const CardBackCSS = css.resolve`
  div {
    background-color: rgba(241, 241, 241, 0.9);
    position: absolute;
    opacity: 0;
  }
`;
