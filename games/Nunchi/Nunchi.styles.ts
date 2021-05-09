import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    height: 100vh;
    background-image: url('https://res.cloudinary.com/dastrong/image/upload/f_auto,q_40/v1540623063/TeacherSite/Misc/NunchiBack.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
  }
`;

export const TextContainerCSS = css.resolve`
   {
    width: 90%;
    height: 80vh;
    background-color: rgba(255, 237, 221, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 20px #000;
    position: relative;
    overflow: hidden;
    text-shadow: 1px 1px 4px #000;
    border-radius: 10px;
    position: relative;
  }
`;

export const ReadyTextCSS = css.resolve`
   {
    position: absolute;
    font-size: 200px;
  }
`;

export const TextCSS = css.resolve`
   {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
