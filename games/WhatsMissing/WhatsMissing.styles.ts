import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
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
   {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    top: 20vh;
    width: 75vw;
    left: 12.5vw;
    border-radius: 35%;
    color: #fff;
    background-color: rgb(21, 255, 0);
    box-shadow: 0 0 12px 4px rgb(9, 115, 0);
  }
`;

export const InfoFitTextCSS = css.resolve`
   {
    text-shadow: 1px 1px 5px rgb(9, 115, 0);
  }
`;

export const CardContainerCSS = css.resolve`
   {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CardCSS = css.resolve`
   {
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
