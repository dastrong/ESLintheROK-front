import { css } from 'styled-jsx/css';

export const getContainerCSS = (fontFamily: string) => css.resolve`
   {
    font: ${fontFamily};
    /* rest of your container styles here */
  }
`;

// put any other game top-level CSS here
