import { css } from 'styled-jsx/css';

export const ContainerCSS = css.resolve`
  .tooltip-container {
    --tooltipBackground: #fff;
    --tooltipBorder: #d4d4d5;

    background-color: var(--tooltipBackground);
    border: 1px solid var(--tooltipBorder);
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
    transition: opacity 0.3s;
    z-index: 9999;

    padding: 0.833em 1em;
    font-size: 0.9rem;
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.3rem;
    box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%),
      0 2px 10px 0 rgb(34 36 38 / 15%);
  }

  .tooltip-container[data-popper-interactive='false'] {
    pointer-events: none;
  }
`;

export const ArrowCSS = css.resolve`
  .tooltip-arrow {
    height: 1rem;
    position: absolute;
    width: 1rem;
    pointer-events: none;
  }

  .tooltip-arrow::before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  .tooltip-arrow::after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }
`;

export const ArrowBottomCSS = css.resolve`
  .tooltip-arrow {
    left: 0;
    margin-top: -0.4rem;
    top: 0;
  }

  .tooltip-arrow::before {
    border-color: transparent transparent var(--tooltipBorder) transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
    position: absolute;
    top: -1px;
  }

  .tooltip-arrow::after {
    border-color: transparent transparent var(--tooltipBackground) transparent;
    border-width: 0 0.5rem 0.4rem 0.5rem;
  }
`;

export const ArrowTopCSS = css.resolve`
  .tooltip-arrow {
    bottom: 0;
    left: 0;
    margin-bottom: -1rem;
  }

  .tooltip-arrow::before {
    border-color: var(--tooltipBorder) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
    position: absolute;
    top: 1px;
  }

  .tooltip-arrow::after {
    border-color: var(--tooltipBackground) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
  }
`;

export const ArrowRightCSS = css.resolve`
  .tooltip-arrow {
    left: 0;
    margin-left: -0.7rem;
  }

  .tooltip-arrow::before {
    border-color: transparent var(--tooltipBorder) transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
  }

  .tooltip-arrow::after {
    border-color: transparent var(--tooltipBackground) transparent transparent;
    border-width: 0.5rem 0.4rem 0.5rem 0;
    left: 6px;
    top: 0;
  }
`;

export const ArrowLeftCSS = css.resolve`
  .tooltip-arrow {
    margin-right: -0.7rem;
    right: 0;
  }

  .tooltip-arrow::before {
    border-color: transparent transparent transparent var(--tooltipBorder);
    border-width: 0.5rem 0 0.5rem 0.4em;
  }

  .tooltip-arrow::after {
    border-color: transparent transparent transparent var(--tooltipBackground);
    border-width: 0.5rem 0 0.5rem 0.4em;
    left: 3px;
    top: 0;
  }
`;
