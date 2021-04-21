import { css } from 'styled-jsx/css';

type shadeLevels = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type colorNames = 'blue' | 'red' | 'gray';

export type VarColorTypes = `var(--color-${colorNames}-${shadeLevels})`;

export const globalCSSVariables = css.global`
  :root {
    /* BLUE */
    --color-blue-100: #ccdaec;
    --color-blue-200: #b3c8e3;
    --color-blue-300: #6691c6;
    --color-blue-400: #336cb3;
    --color-blue-500: #0047a0;
    --color-blue-600: #003980;
    --color-blue-700: #002b60;
    --color-blue-800: #001c40;
    --color-blue-900: #000e20;
    /* RED */
    --color-red-100: #f5d5d8;
    --color-red-200: #ebabb0;
    --color-red-300: #e18289;
    --color-red-400: #d75861;
    --color-red-500: #cd2e3a;
    --color-red-600: #a4252e;
    --color-red-700: #7b1c23;
    --color-red-800: #521217;
    --color-red-900: #140506;
    /* GRAY */
    --color-gray-100: #f6f5f5;
    --color-gray-200: #eceaeb;
    --color-gray-300: #e3e0e1;
    --color-gray-400: #d9d5d7;
    --color-gray-500: #d0cbcd;
    --color-gray-600: #a6a2a4;
    --color-gray-700: #7d7a7b;
    --color-gray-800: #535152;
    --color-gray-900: #2a2929;
  }
`;
