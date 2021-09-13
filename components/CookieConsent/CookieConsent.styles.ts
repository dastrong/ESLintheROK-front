import css from 'styled-jsx/css';

export const ContainerCSS = css.resolve`
  div {
    --padding: 3rem;
    position: fixed;
    bottom: calc(var(--padding) / 2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    z-index: 11111111;
    padding: var(--padding);
    width: calc(100% - var(--padding));
    max-width: 1000px;
    margin: 0 auto;
    left: 0;
    right: 0;
    border-radius: calc(var(--padding) * 2);
    box-shadow: -1px 1px 7px 0px #676767;
  }
`;

export const TextCSS = css.resolve`
  span {
    width: 70%;
    padding: 0 1rem;
    line-height: 1.5;
  }
`;

export const ButtonsCSS = css.resolve`
  div {
    display: flex;
    align-items: center;
    width: 30%;
  }
`;
