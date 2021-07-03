import React from 'react';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href="/">
      <a>
        {/* <a href="https://www.vecteezy.com/free-vector/world-logo">World Logo Vectors by Vecteezy</a> */}
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 485 491"
        >
          <path
            d="M336 19c-7-4-14 6-8 12 22 22 65 52 75 48 2 0 2-2 3-3-19-3-61-42-66-53a7 7 0 00-3-4h-1"
            fill="#EDD86A"
          />
          <path
            d="M210 0c5 0 10 2 12 6 22 36 147 136 197 128 26-4 11-39-13-58l5 3c25 17 48 61 27 75-20 14-70-5-111-30-50-32-103-77-125-103a12 12 0 018-21"
            fill="#31AE48"
          />
          <path
            d="M143 17a15 15 0 00-6 22c46 60 264 224 324 170 20-18 11-62-23-109a140 140 0 00-10-11c38 45 53 106-8 101-85-6-231-128-259-168a14 14 0 00-17-5h-1z"
            fill="#55B5E9"
          />
          <path
            d="M85 52a15 15 0 0121 2c23 29 96 97 175 144 115 69 223 84 194-23l4 17 5 26c0 9 2 28-8 43-24 38-101 18-165-13A816 816 0 0182 74a15 15 0 012-21l1-1"
            fill="#2D358E"
          />
          <path
            d="M448 373l13-22 4-9C399 468 87 246 23 168c-6-8-18-5-20 4v8c32 65 363 309 445 193z"
            fill="#DD1C31"
          />
          <path
            d="M1 307v2c18 36 222 201 324 166l9-4 23-11C257 505 67 362 11 302c-4-5-11-1-10 5"
            fill="#F7BF0B"
          />
          <path
            d="M415 107c2-1 10-9-9-31 11 19-5 17-11 16-18-5-44-22-67-41a8 8 0 00-9-1 8 8 0 00-1 14c39 28 83 54 97 43z"
            fill="#80C43C"
          />
          <path
            d="M471 319c2-3 5-8 8-20l4-25 1-11c-14 114-197 26-325-70a16 16 0 00-22 4 16 16 0 003 23c116 83 286 168 331 99"
            fill="#961989"
          />
          <path
            d="M421 410c-70 65-221-21-323-99-7-6-18-2-20 7a13 13 0 004 14c99 74 249 154 312 103l19-17 8-8"
            fill="#F17021"
          />
          <path
            d="M28 367a4 4 0 000 4c30 38 138 119 216 119h12l25-3c-84 9-200-75-247-121a4 4 0 00-6 1z"
            fill="#8BC829"
          />
        </svg>

        <style jsx>{`
          a {
            height: 85%;
            margin-left: 2vw;
          }

          svg {
            height: 97%;
            padding-bottom: 3%;
          }
        `}</style>
      </a>
    </Link>
  );
}
