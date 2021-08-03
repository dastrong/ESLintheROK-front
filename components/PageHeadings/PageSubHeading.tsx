import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

export default function PageSubHeading({ children, style }: Props) {
  return (
    <div style={style}>
      {children}

      <style jsx>{`
        div {
          color: #5a5c62;
          font-size: 2vw;
          line-height: 150%;
          margin: 0 auto 2rem;
          max-width: 45%;
          min-width: 600px;
          text-align: center;
        }

        @media screen and (min-width: 1440px) {
          div {
            font-size: 1.8vw;
          }
        }

        @media screen and (min-width: 1700px) {
          div {
            font-size: 1.6vw;
          }
        }
      `}</style>
    </div>
  );
}
