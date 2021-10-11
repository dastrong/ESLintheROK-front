import css from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

export const GradientCSS = css.resolve`
   {
    position: absolute;
    height: 200vh;
    width: 100vw;
    top: 0;
  }
`;

export const TextContainerCSS = css.resolve`
   {
    width: 100%;
    height: 100%;
  }
`;

export const OuterTextContainerCSS = css.resolve`
   {
    height: 50vh;
    width: 100vw;
    margin: 0;
    position: absolute;
    font-size: 20vw;
  }
`;

export const InnerTextContainerCSS = css.resolve`
   {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-shadow: 0px 0px 2px #efefef;
  }
`;

export const TopTextContainerCSS = css.resolve`
   {
    top: 0;
  }
`;

export const BottomTextContainerCSS = css.resolve`
   {
    bottom: 0;
  }
`;

export const BlinkingCursorCSS = css.resolve`
   {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0.05;
    }
    to {
      opacity: 1;
    }
  }
`;

export const HiddenInputCSS = css.resolve`
  input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
  }
`;

export const TotalWordsCSS = css.resolve`
  div {
    position: absolute;
    right: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0px 0px 2px #efefef;
  }
`;

export const TotalWordsNumberCSS = css.resolve`
  span {
    writing-mode: horizontal-tb;
  }
`;
