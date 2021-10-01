import css from 'styled-jsx/css';
import { getGameFileUrl } from 'utils/getCloudUrls';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    background-image: url(${getGameFileUrl(
      'LetterBowling/bowling-alley.jpg',
      '/f_auto,q_80'
    )});
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
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
