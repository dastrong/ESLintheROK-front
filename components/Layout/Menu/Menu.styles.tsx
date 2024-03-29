import css from 'styled-jsx/css';

export const MenuContainerCSS = css.resolve`
  div {
    position: fixed;
    z-index: 1111111;
    top: calc((var(--navHeight) - var(--btnHeight)) / 2);
    right: 2vw;
    filter: url('#goo');

    --btnHeight: calc(var(--navHeight) * 0.85 * 0.94);
  }
`;

export const MenuTogglerCSS = css.resolve`
  button.styled-button {
    height: var(--btnHeight);
    width: var(--btnHeight);
    font-size: 1.85vw;
    line-height: 1.85vw;
    padding: 0;
    z-index: 1;
    opacity: 1;
  }
`;

export const MenuTogglerHideCSS = css.resolve`
  button.styled-button {
    opacity: 0;
  }
`;

export const MenuItemCSS = css.resolve`
  div.menu_item {
    position: absolute;
    z-index: -1;
    top: calc(var(--btnHeight) - 60px);
    left: calc((var(--btnHeight) - 62px) / 2);
    width: min-content;
  }
`;

export const MenuItemHideCSS = css.resolve`
  div.menu_item {
    pointer-events: none;
  }
`;

export const MenuItemPopupCSS = css.resolve`
  div.tooltip-container {
    width: max-content;
    box-shadow: none;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    color: white;
  }
`;

export const MenuOverlayCSS = css.resolve`
  div {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1111111;
    background-color: var(--siteBgColor);
    opacity: 0.85;
  }
`;
