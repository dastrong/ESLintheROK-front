import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    height: 100vh;
    width: 100%;
    overflow: hidden;
    user-select: none;
  }
`;

export const NotebookHeadCSS = css.resolve`
   {
    position: absolute;
    left: 14vw;
    height: 13vw;
    width: 86vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const NotebookHeadFitTextCSS = css.resolve`
   {
    position: default;
    text-decoration: underline #28a8d4;
  }
`;

export const NotebookBodyCSS = css.resolve`
   {
    background-image: linear-gradient(
        0deg,
        transparent 5em,
        rgba(255, 0, 0, 0.2) 0,
        transparent 5.1em
      ),
      linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
    background-size: 100% 2em;
    margin-top: 13vw;
    height: calc(100vh - 13vw);
    display: flex;
    justify-content: space-between;
  }
`;

export const NotebookSideCSS = css.resolve`
   {
    height: 100vh;
    margin-top: -13vw;
    width: 13vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

export const NotebookSideHoleCSS = css.resolve`
   {
    border-radius: 50%;
    background-color: #fff;
    height: 3vw;
    width: 3vw;
    border: 1px solid #d4cdcd;
    box-shadow: 1px 1px 4px 0px #b5b59e inset;
    cursor: pointer;
  }
`;

export const NotebookSideHoleActiveCSS = css.resolve`
   {
    border: 1px solid #e5e6e5;
    background-color: #e6e6e6;
    box-shadow: 1px 1px 4px 0px #aab1aa inset;
    cursor: default;
  }
`;

export const NotebookTextCSS = css.resolve`
   {
    height: calc(100vh - 13vw);
    width: 86vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

export const NotebookTextFitTextCSS = css.resolve`
   {
    overflow: hidden;
  }
`;

export const NotebookVertLineCSS = css.resolve`
   {
    position: absolute;
    top: 0;
    left: 13vw;
    height: 100vh;
    width: 0.99vw;
    border-right: 1px solid #e0c9c9;
    border-left: 1px solid #e0c9c9;
  }
`;
