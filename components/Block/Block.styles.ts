import { css } from 'styled-jsx/css';

export const BlockCSS = css.resolve`
   {
    position: relative;
    margin: 1rem auto;
    width: 50%;
    min-width: 500px;
    max-width: 750px;
    border-radius: var(--radius);
    background-color: var(--bgColor);
    padding: var(--padding) var(--padding) var(--padding)
      calc(var(--padding) + var(--radius));
    box-shadow: 1px 0px 3px 2px #6f6f6f63, 2px 0px 4px 1px var(--shadeColor);

    --radius: 0.5rem;
    --padding: 0.75rem;
  }

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--accentColor);
    height: 100%;
    width: var(--radius);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }

  @media screen and (min-width: 1500px) {
     {
      max-width: 1000px;
      margin: 1.5rem auto;
    }
  }
`;

export const BlockHeaderCSS = css.resolve`
   {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: opacity 125ms;
    font-size: 1.2rem;
  }

  @media screen and (min-width: 1000px) {
     {
      font-size: 1.75vw;
    }
  }

  @media screen and (min-width: 1500px) {
     {
      font-size: 1.5vw;
    }
  }
`;

export const BlockHeaderIconCSS = css.resolve`
   {
    transition: transform 0.15s;
    font-size: 0.7em;
  }
`;

export const BlockHeaderTitleCSS = css.resolve`
   {
    margin: 1rem 0 1rem var(--padding);
    font-weight: bold;
  }
`;

export const BlockContentCSS = css.resolve`
   {
    padding-left: calc(1.2rem * 0.7 + var(--padding));
    font-size: 1rem;
  }

  @media screen and (min-width: 1000px) {
     {
      padding-left: calc(1.75vw * 0.7 + var(--padding));
      font-size: 1.5vw;
    }
  }

  @media screen and (min-width: 1500px) {
     {
      padding-left: calc(1.5vw * 0.7 + var(--padding));
      font-size: 1.25vw;
    }
  }
`;
