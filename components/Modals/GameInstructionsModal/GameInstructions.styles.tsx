import css from 'styled-jsx/css';

export const ModalOverlayCSS = css.resolve`
  div {
    height: 90vh;
    width: 90vw;
    display: flex;
    flex-direction: column;
  }
`;

export const ModalHeaderCSS = css.resolve`
  .modal_header {
    padding: 1rem;
  }
`;

export const ContentContainerCSS = css.resolve`
  .modal_content {
    position: relative;
    flex-basis: 100%;
    overflow: hidden;
  }

  .modal_content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.93);
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

export const FitTextCSS = css.resolve`
  span {
    text-shadow: 2px 2px 2px #c7c7c7;
  }
`;
