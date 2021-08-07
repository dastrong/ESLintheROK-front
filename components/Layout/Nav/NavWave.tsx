import React from 'react';

export default function NavWave() {
  return (
    <svg
      viewBox="0 0 2560 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <path
        d="M2560-.72s-149.17-15.73-246.79 35.52c-97.61 51.24-79.59 134.97-499.08 134.97-419.5 0-446.13-35.06-667.13-35.06s-245 37.09-516.76 35.06c-271.76-2.03-229.77 2.03-362.43 2.03C135.16 171.8 0 194 0 194V-.72h2560z"
        fill="#F8F8F8"
        filter="url(#a)"
      />
      <filter
        id="a"
        x="-16"
        y="-10"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-6" dy="3" />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </svg>
  );
}
