import React, { InputHTMLAttributes } from 'react';

export default function Range(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input {...props} type="range" />

      <style jsx>{`
        input[type='range'] {
          /*  */
        }
      `}</style>
    </>
  );
}
