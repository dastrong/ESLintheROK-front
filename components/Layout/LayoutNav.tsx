import React from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import LayoutLogo from './LayoutLogo';

export default function LayoutNav() {
  // const router = useRouter();

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
        }

        a {
          text-decoration: none;
          margin: 1.5rem;
          font-size: 1.1rem;
          text-transform: uppercase;
          color: rgb(33, 133, 208);
        }

        svg {
          margin: 0 1.5rem;
        }
      `}</style>
    </nav>
  );
}
