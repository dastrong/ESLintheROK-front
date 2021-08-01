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
          margin: 1.25rem auto;
          text-align: center;
          color: #414141;
          font-size: 3.5rem;
          font-weight: normal;
        }
      `}</style>
    </h1>
  );
}
