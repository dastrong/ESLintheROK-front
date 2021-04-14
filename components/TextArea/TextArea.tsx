import React, { TextareaHTMLAttributes } from 'react';

export default function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <>
      <textarea {...props}>This is a TextArea</textarea>
      <style jsx>{`
        textarea {
          /*  */
        }
      `}</style>
    </>
  );
}
