import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    margin: auto;
  }
`;

export const CardCSS = css.resolve`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-shadow: 2px 2px 2px black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px #b9b9b9ad, 2px 2px 2px #b9b9b9ad,
      0px 0px 8px #4a4a4ae3 inset;
    user-select: none;
    margin: 0.5vh 0.5vw;
  }
`;
