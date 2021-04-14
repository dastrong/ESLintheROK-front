import React, { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      This is a Button
      <style jsx>{`
        button {
          /*  */
        }
      `}</style>
    </button>
  );
}
