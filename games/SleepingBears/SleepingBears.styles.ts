import css from 'styled-jsx/css';
import { getGameFileUrl } from 'utils/getCloudUrls';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    background-image: url(${getGameFileUrl(
      'SleepingBears/campBackground.jpg'
    )});
    background-size: cover;
    background-position: bottom;
    height: 100vh;
    width: 100%;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }
`;

export const CardsContainerCSS = css.resolve`
   {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export const CardCSS = css.resolve`
   {
    height: 47vh;
    width: 47vw;
    margin: 1vh 1vw;
    background-color: rgba(214, 239, 230, 0.69);
    box-shadow: 0 0 4px 3px rgba(11, 130, 106, 0.85);
    text-shadow: 1px 1px 2px rgb(255, 255, 255);
  }
`;

export const CardSharedCSS = css.resolve`
   {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CardContentCSS = css.resolve`
   {
    position: absolute;
    height: inherit;
    width: inherit;
    overflow: hidden;
  }
`;

export const CardExpanded = css.resolve`
   {
    width: 96.5vw;
  }
`;
