import React, { TextareaHTMLAttributes } from 'react';

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <>
      <textarea {...props} />
      <style jsx>{`
        textarea {
          /*  */
        }
      `}</style>
    </>
  );
}
