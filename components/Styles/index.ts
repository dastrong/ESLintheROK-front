import { css } from 'styled-jsx/css';

export const InputCSS = css.resolve`
   {
    margin: 0;
    outline: 0;
    line-height: 1rem;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.2rem;
    transition: color 0.1s ease, border-color 0.1s ease;
  }

  :focus {
    color: rgba(0, 0, 0, 0.95);
    border-color: #85b7d9;
  }
`;
