import css from 'styled-jsx/css';

export const InputCSS = css.resolve`
  input,
  textarea {
    margin: 0;
    outline: 0;
    line-height: 1.25rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    box-shadow: 0 0.25rem 0.25rem 0 rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.5rem;
    transition: color 0.1s ease, border-color 0.1s ease;
    width: inherit;
  }

  input:focus,
  textarea:focus {
    color: rgba(0, 0, 0, 0.95);
    border-color: #85b7d9;
  }

  textarea {
    resize: vertical;
    min-height: calc((1.25rem + 0.75rem + 2px) * 3);
  }
`;
