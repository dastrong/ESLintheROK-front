import React from 'react';

export default function NavWave() {
  return (
    <svg viewBox="0 0 2560 192" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path fill="#F8F8F8" d="M2560 0H0v194h2560z" />
        <path
          d="M2560 .243645S2410.83-15.4082 2313.21 35.5865C2215.6 86.5813 2233.62 169.89 1814.13 169.89 1394.63 169.89 1368 135 1147 135s-245 36.909-516.761 34.89c-271.762-2.02-229.77 2.019-362.425 2.019C135.158 171.909 0 194 0 194h2560V.243645z"
          fill="var(--siteBgColor)"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path
            fill="#fff"
            transform="matrix(-1 0 0 1 2560 0)"
            d="M0 0h2560v194H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
