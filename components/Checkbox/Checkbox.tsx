import React, { InputHTMLAttributes } from 'react';

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input {...props} type="checkbox" />

      <style jsx>{`
        input[type='checkbox'] {
          /*  */
        }
      `}</style>
    </>
  );
}
