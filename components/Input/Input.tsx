import React, { InputHTMLAttributes } from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input {...props} />

      <style jsx>{`
        input {
          /*  */
        }
      `}</style>
    </>
  );
}
