import { css } from 'styled-jsx/css';

export const MenuContainerCSS = css.resolve`
  div {
    position: fixed;
    z-index: 11111;
    top: calc((var(--navHeight) - var(--btnHeight)) / 2);
    right: 2vw;
    filter: url('#goo');
    -webkit-filter: url('#goo');

    --btnHeight: calc(var(--navHeight) * 0.85 * 0.94);
  }
`;

export const MenuTogglerCSS = css.resolve`
  .menu_toggler {
    height: var(--btnHeight);
    width: var(--btnHeight);
    font-size: 1.85vw;
    line-height: 1.85vw;
    z-index: 1;
    opacity: 1;
  }
`;

export const MenuTogglerHideCSS = css.resolve`
  .menu_toggler {
    opacity: 0;
  }
`;

export const MenuItemCSS = css.resolve`
  .menu_item {
    position: absolute;
    z-index: -1;
    top: calc(var(--btnHeight) - 60px);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: min-content;
  }
`;

export const MenuItemHideCSS = css.resolve`
  .menu_item {
    pointer-events: none;
  }
`;

export const MenuItemPopupCSS = css.resolve`
  .tooltip-container {
    width: max-content;
    box-shadow: none;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    color: white;
  }
`;

export const MenuItemPopupArrowCSS = css.resolve`
  .tooltip-arrow {
    display: none;
  }
`;

export const MenuOverlayCSS = css.resolve`
   {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11111;
    background-color: var(--siteBgColor);
    opacity: 0.85;
  }
`;
