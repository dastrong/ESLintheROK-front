import React, { TextareaHTMLAttributes } from 'react';

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <>
      <textarea {...props} />
      <style jsx>{`
        textarea {
          margin: 0;
          outline: 0;
          line-height: 1rem;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          background: #fff;
          border: 1px solid rgba(34, 36, 38, 0.15);
          color: rgba(0, 0, 0, 0.87);
          border-radius: 0.2rem;
          box-shadow: inset 0 0 0 0 transparent;
          transition: color 0.1s ease, border-color 0.1s ease;
        }

        textarea:focus {
          color: rgba(0, 0, 0, 0.95);
          border-color: #85b7d9;
          box-shadow: inset 0 0 0 0 rgb(34 36 38 / 35%);
        }
      `}</style>
    </>
  );
}
