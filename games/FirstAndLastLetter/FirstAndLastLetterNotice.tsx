import React from 'react';
import { animated, useTransition } from 'react-spring';
import css from 'styled-jsx/css';
import type { Error } from './FirstAndLastLetter.types';

type Props = {
  error: Error;
};

const ContainerCSS = css.resolve`
  div {
    width: 90vw;
    height: 90vh;
    background: linear-gradient(45deg, purple, red);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 10vw;
    text-shadow: 3px 3px 9px black;
    color: white;
    border-radius: 10vw;
    box-shadow: 0px 0px 20px 3px #404040;
  }
`;

export default function FirstAndLastLetterAddedNotice({ error }: Props) {
  const transitions = useTransition(error, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    immediate: !error,
  });

  return transitions((style, errorItem) => {
    return (
      errorItem && (
        <animated.div style={style} className={ContainerCSS.className}>
          <h3>
            {error === 'duplicate'
              ? 'Word Repeated!'
              : error === 'invalid'
              ? 'Invalid Word!'
              : ''}
          </h3>
          <p>
            Hit <span>Ctrl+Space</span> or <span>Ctrl+Enter</span> to reset
          </p>

          {ContainerCSS.styles}
          <style jsx>{`
            h3 {
              margin: 0;
              margin-bottom: 3rem;
            }

            p {
              margin: 0;
              font-size: 0.25em;
            }

            span {
              text-decoration: 10px underline dotted pink;
              text-shadow: none;
            }
          `}</style>
        </animated.div>
      )
    );
  });
}
