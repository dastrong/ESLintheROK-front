import React from 'react';
import Link from 'next/link';
import LayoutLogo from './LayoutLogo';
import useNavPageCheck from './useNavPageCheck';

export default function LayoutNav() {
  const isNavVisible = useNavPageCheck();

  return (
    <nav>
      <Link href="/games">
        <a>Games</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <LayoutLogo />

      <Link href="/faqs">
        <a>Help</a>
      </Link>

      <Link href="/contact">
        <a>Contact</a>
      </Link>

      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 86px;
          width: 100%;
          margin: 0px;
          padding: 0.5rem 0.75rem;
          text-align: center;
          text-transform: none;
          background-color: rgb(246, 245, 245);
          box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 7px 0px;
          box-sizing: border-box;
          z-index: 11;
          transition: transform 0.5s 0.5s;
          /* we'll overshoot the translate because of our box-shadow */
          transform: translateY(${isNavVisible ? 0 : -120}%);
          z-index: 99;
          transition: transform 125ms ${isNavVisible ? '0s' : '250ms'};

          /* 110% because we need to account for the box-shadow effect */
          transform: translateY(${isNavVisible ? 0 : '-110'}%);
        }

        a {
          text-decoration: none;
          margin: 1.3rem;
          font-size: 1.1rem;
          text-transform: uppercase;
          color: #565656;
        }

        svg {
          margin: 0 1.5rem;
        }
      `}</style>
    </nav>
  );
}
