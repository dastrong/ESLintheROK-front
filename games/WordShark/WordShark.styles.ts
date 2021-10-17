import css from 'styled-jsx/css';
import { getGameFileUrl } from 'utils/getCloudUrls';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font-family: ${fontFamily};
    background-color: #fff;
    background-image: url(${getGameFileUrl('WordShark/Background.svg')});
    background-size: cover;
    background-attachment: fixed;
    background-position: bottom right;
    height: 100%;
    width: 100%;
    overflow: hidden;

    --buttonSize: calc(((100vh - 82px) / 9) - 0.25rem);
  }
`;

export const ContentOuterContainerCSS = css.resolve`
   {
    position: absolute;
    top: 0;
    left: calc(((var(--buttonSize) + 0.25rem) * 3) + 0.125rem);
    width: calc(100vw - ((var(--buttonSize) + 0.25rem) * 3 + 0.125rem));
    height: calc(100vh - ((var(--buttonSize) + 0.25rem) + 82px + 0.125rem));
    background-color: #ffffff1f;
    border-bottom-left-radius: 0.5rem;
  }
`;

export const ContentInnerContainerCSS = css.resolve`
   {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

export const StickmanContainerCSS = css.resolve`
   {
    position: absolute;
    left: calc(50% - 11vh / 2);
    bottom: 7.5vh;
    transition: transform 250ms;
    transform: translateY(15vh);
    z-index: 1;
    pointer-events: none;
  }
`;

export const SpeechBubbleCSS = css.resolve`
   {
    position: relative;
    height: 12vh;
    width: 24vw;
    background: #b94646;
    color: white;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: calc(11vh / 2);
    width: 0;
    height: 0;
    border: 1rem solid transparent;
    border-top-color: #b94646;
    border-bottom: 0;
    margin-left: -1rem;
    margin-bottom: -1rem;
  }
`;

export const SpeechBubbleTextCSS = css.resolve`
  span {
    font-size: 3vw;
  }
`;

export const AnswerTextCSS = css.resolve`
  span {
    font-size: 3vw;
    word-spacing: 3px;
    letter-spacing: 1px;
  }
`;

export const StickmanCSS = css.resolve`
   {
    height: 25vh;
    width: 11vh;
    margin-top: 1.1rem;
    display: flex;
  }
`;

export const HelicopterCSS = css.resolve`
   {
    width: 5vh;
    position: absolute;
    transform: translate(10vw, 15vh) scale(1);
  }
`;

export const PlatformCSS = css.resolve`
   {
    position: absolute;
    bottom: 2.5vh;
    left: calc(50% - 15vw);
    border-radius: 100%;
    background: linear-gradient(to bottom left, white, gray);
    width: 30vw;
    height: 10vh;
    box-shadow: 0px 3px 0px 0px lightgrey;
    transition: transform 500ms, opacity 250ms;
  }
`;

export const AlphabetButtonContainerCSS = css.resolve`
   {
    position: absolute;
    left: 0;
    top: 0;
    width: calc((var(--buttonSize) + 0.25rem) * 3);
    height: calc(100vh - 82px);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const AlphabetButtonCSS = css.resolve`
  .styled-button {
    width: var(--buttonSize);
    height: var(--buttonSize);
    margin: 0.125rem;
    padding: 0;
    font-size: calc(var(--buttonSize) / 2);
  }
`;

export const OuterBlankContainerCSS = css.resolve`
   {
    position: absolute;
    bottom: 0;
    left: calc(((var(--buttonSize) + 0.25rem) * 2) + 0.125rem);
    width: calc(100vw - (var(--buttonSize) + 0.25rem) * 2 + 0.125rem);
    height: calc((var(--buttonSize) + 0.25rem) + 82px - 0.125rem);
    background-color: rgb(72 39 72 / 38%);
    border-top-left-radius: 0.5rem;
    color: white;
    padding: 1rem;
  }
`;

export const InnerBlankContainerCSS = css.resolve`
   {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonsContainerCSS = css.resolve`
   {
    position: absolute;
    bottom: calc((var(--buttonSize) + 0.25rem) + 82px + 0.125rem);
    left: calc(
      50% - 15vw + (((var(--buttonSize) + 0.25rem) * 3) - 0.125rem) / 2
    );
    width: 30vw;
    display: flex;
  }
`;

export const WrongContainerCSS = css.resolve`
   {
    position: absolute;
    left: 82px;
    bottom: 0;
    width: calc((var(--buttonSize) + 0.125rem) * 2 - 82px);
    height: 82px;
    color: white;
    font-size: 22px;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
