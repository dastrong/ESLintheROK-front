import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    background-color: #275f69;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
`;

export const CardHolderCSS = css.resolve`
   {
    text-align: center;
    overflow: hidden;
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CardCSS = css.resolve`
   {
    height: 50vh;
    width: 50vw;
    z-index: 4;
    line-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-shadow: 1px 1px 7px #000;
    box-shadow: inset 0 0 1px 2px #000;
    opacity: 0;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    font-size: 250px;
    text-shadow: 1px 1px 7px #000;
  }
`;
