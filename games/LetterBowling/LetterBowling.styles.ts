import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    background-image: url('https://res.cloudinary.com/dastrong/image/upload/f_auto,q_80/v1538223041/TeacherSite/Misc/bowling-alley.jpg');
    background-size: cover;
    background-position: center;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ControlsCSS = css.resolve`
   {
    position: absolute;
    top: 0;
    z-index: 111;
  }
`;

export const ButtonCSS = css.resolve`
   {
    margin: 5px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 0 rgb(34 36 38 / 15%);
    padding: 1.2rem;
    font-size: 1.4rem;
    line-height: 100%;
  }

  :hover {
    opacity: 0.8;
  }

  :disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ButtonGrayCSS = css.resolve`
   {
    background-color: #e0e1e2;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const ButtonBlueCSS = css.resolve`
   {
    background-color: #2185d0;
    color: #fff;
  }
`;

export const ButtonSVGCSS = css.resolve`
   {
    vertical-align: top;
  }
`;

export const RoundCounterCSS = css.resolve`
   {
    position: absolute;
    right: 5px;
    bottom: 0px;
    height: 100px;
    font-size: 80px;
    line-height: 100px;
    margin: 0;
    text-shadow: 1px 1px 10px #9e9e9e;
  }
`;

export const TextCSS = css.resolve`
   {
    color: #fff;
    font-size: 1.25em;
    text-align: center;
    text-shadow: black 1px 1px 200px;
    position: absolute;
    font-size: 10em;
    margin: 0;
  }
`;

export const LetterCSS = css.resolve`
   {
    box-sizing: border-box;
    position: absolute;
    padding: 20px;
    border-radius: 50%;
    text-shadow: 3px 3px 1px #000;
    color: #fff;
    width: 190px;
    height: 190px;
    text-align: center;
    font-size: 10em;
    line-height: 1;
    opacity: 1;
    left: 0;
    top: 0;
  }
`;
