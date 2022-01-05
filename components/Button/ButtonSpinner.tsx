import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import css from 'styled-jsx/css';

const ButtonSpinnerCSS = css.resolve`
  svg {
    animation: 1.5s spinner infinite linear;
  }

  @keyframes spinner {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

export default function ButtonSpinner({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return (
    <>
      <FaSpinner style={style} className={ButtonSpinnerCSS.className} />
      {ButtonSpinnerCSS.styles}
    </>
  );
}
