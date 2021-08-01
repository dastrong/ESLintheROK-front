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
          font-size: 1.3rem;
          line-height: 150%;
          margin: 0 auto;
          max-width: 600px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
