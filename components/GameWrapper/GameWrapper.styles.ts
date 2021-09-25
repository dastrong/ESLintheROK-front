import css from 'styled-jsx/css';

export const ButtonCSS = css.resolve`
  button {
    position: absolute;
    z-index: 111;
    bottom: 4px;
    left: 4px;
    border-radius: 11111px;
    opacity: 0;
    box-shadow: 0px 0px 10px darkslategrey;
  }
`;

export const TipsContainer = css.resolve`
  div {
    width: 250px;
    font-size: 1rem;
  }
`;

export const TipsHeader = css.resolve`
  h3 {
    text-align: center;
  }
`;

export const TipsListContainer = css.resolve`
  ul {
    padding-left: 1rem;
    margin: 1.5rem 0 0;
    list-style-type: none;
  }
`;

export const TipsListItem = css.resolve`
  li {
    margin-bottom: 1rem;
  }
`;
