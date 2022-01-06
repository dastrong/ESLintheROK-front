import css from 'styled-jsx/css';
import { getGameFileUrl } from 'utils/getCloudUrls';

export const getContainerCSS = (fontFamily: string) => css.resolve`
  div {
    font-family: ${fontFamily};
    background-color: #fff;
    height: 100vh;
    background-image: url(${getGameFileUrl('Cowboy/CowboyStandoff.jpg')});
    background-size: cover;
    background-position: bottom;
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
    background-color: rgba(255, 210, 177, 0.43);
    box-shadow: 2px 2px 20px #422a00;
    position: relative;
    overflow: hidden;
    text-shadow: 1px 1px 4px #d4a679;
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
