import css from 'styled-jsx/css';

export const ModalOverlayCSS = css.resolve`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 11111111;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

export const ModalContentCSS = css.resolve`
  .ReactModal__Content {
    outline: none;
    background: #fff;
    border: none;
    box-shadow: 1px 3px 3px 0 rgb(0 0 0 / 20%),
      1px 3px 15px 2px rgb(0 0 0 / 20%);
    border-radius: 0.25rem;
    user-select: text;
  }
`;
