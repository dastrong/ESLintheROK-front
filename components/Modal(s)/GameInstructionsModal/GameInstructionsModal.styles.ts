import { css } from 'styled-jsx/css';

export const ModalOverlayCSS = css.resolve`
   {
    height: 90vh;
    width: 90vw;
    display: flex;
    flex-direction: column;
  }
`;

export const TextContainerCSS = css.resolve`
  div {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    outline: none;
    opacity: 0;
  }
`;
