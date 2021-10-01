import React from 'react';
import { CSSProperties } from 'react';

type Props = {
  colorBody?: string;
  colorHat?: string;
  style?: CSSProperties;
};

export default function UserCharacter({
  colorBody = '#2F2E41',
  colorHat = '#E6E6E6',
  style,
}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 138" style={style}>
      <path
        d="M118.95 46.13c4.25-11.09 4.86-21.17 1.36-22.51-3.51-1.35-9.8 6.55-14.06 17.63-4.25 11.09-4.86 21.16-1.36 22.51 3.51 1.35 9.8-6.55 14.06-17.63z"
        fill={colorBody}
      />
      <path
        d="M73 119.5a43.1 43.1 0 100-86.2 43.1 43.1 0 000 86.2z"
        fill={colorBody}
      />
      <path d="M53 110h13v24H53v-24zm27 0h13v24H80v-24z" fill={colorBody} />
      <path
        d="M64.2 138c6.02 0 10.9-1.84 10.9-4.1 0-2.27-4.88-4.1-10.9-4.1-6.02 0-10.9 1.83-10.9 4.1 0 2.26 4.88 4.1 10.9 4.1zM90.4 137.4c6.02 0 10.9-1.84 10.9-4.1s-4.88-4.1-10.9-4.1c-6.02 0-10.9 1.84-10.9 4.1s4.88 4.1 10.9 4.1z"
        fill={colorBody}
      />
      <path
        d="M74 80.1a14.7 14.7 0 100-29.4 14.7 14.7 0 000 29.4z"
        fill="#fff"
      />
      <path d="M74 70.3a4.9 4.9 0 100-9.8 4.9 4.9 0 000 9.8z" fill="#3F3D56" />
      <path
        d="M31 36C28 21 39 5 56 1s34 6 37 21-7 22-25 26-33 4-37-12z"
        fill={colorHat}
      />
      <path
        d="M42.3 65.76c1.59-3.4-5.85-10.23-16.6-15.25C14.92 45.5 4.91 44.18 3.32 47.6c-1.59 3.4 5.85 10.23 16.61 15.25s20.78 6.32 22.36 2.92z"
        fill={colorBody}
      />
      <path
        d="M52 92c0 4 11 12 23 12s23-11 23-16-11 1-23 1-23-1-23 3z"
        fill="#fff"
      />
    </svg>
  );
}
