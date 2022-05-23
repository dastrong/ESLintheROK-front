import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    height: 100vh;
    background-image: linear-gradient(
        0deg,
        transparent 5em,
        rgba(0, 0, 0, 0.2) 0,
        transparent 5.1em
      ),
      linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
    background-size: 100% 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
  }
`;

export const TextHolderCSS = css.resolve`
  div {
    width: 70%;
    height: 90vh;
    background-color: rgba(205, 238, 255, 0.9);
    box-shadow: 2px 2px 20px rgb(170, 238, 255);
    position: relative;
    overflow: hidden;
    text-shadow: 1px 1px 4px rgb(170, 238, 255);
    border-radius: 10px;
  }
`;

export const TextCSS = css.resolve`
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
