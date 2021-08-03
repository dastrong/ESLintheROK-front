import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PageHeading({ children }: Props) {
  return (
    <h1>
      {children}

      <style jsx>{`
        h1 {
          margin: 1.5rem auto 0.75rem;
          text-align: center;
          color: #414141;
          font-size: 6vw;
          font-weight: normal;
        }

        @media screen and (min-width: 1440px) {
          h1 {
            font-size: 5vw;
          }
        }

        @media screen and (min-width: 1700px) {
          h1 {
            font-size: 4.5vw;
          }
        }
      `}</style>
    </h1>
  );
}
