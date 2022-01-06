import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    width: 100%;
    user-select: none;
    cursor: pointer;
    position: relative;
  }
`;

export const InfoCSS = css.resolve`
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    top: 15vh;
    width: 75vw;
    left: 12.5vw;
    border-radius: 50% 50% 0 0;
    padding: 1rem;
    color: #fff;
    background-color: rgb(21, 255, 0);
    box-shadow: 0 0 12px 4px rgb(9, 115, 0);
  }
`;

export const InfoFitTextCSS = css.resolve`
  span {
    text-shadow: 0px 0px 1px #333, 0px 0px 4px #555, 0px 0px 7px #777,
      0px 0px 10px #777777b4, 0px 0px 14px #7777772f;
  }
`;

export const CardContainerCSS = css.resolve`
  div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CardCSS = css.resolve`
  div {
    height: 25vh;
    width: 25vw;
    margin: 2.5vh 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px 3px #171717;
    overflow: hidden;
  }
`;
