import css from 'styled-jsx/css';

export const ListContainerCSS = css.resolve`
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }
`;

export const ListItemCSS = css.resolve`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #d6d6d6;
    width: 100%;
    margin: 0 auto;
    transition: 150ms transform;
  }

  li:first-child {
    padding-top: 0;
  }

  li:last-child {
    border: none;
    padding-bottom: 0;
  }
`;

export const LeftSideCSS = css.resolve`
   {
    display: flex;
    align-items: center;
  }
`;

export const ActionDivCSS = css.resolve`
   {
    position: absolute;
    display: flex;
    opacity: 1;
    width: 100%;
    padding: inherit;
    height: 100%;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
  }
`;
