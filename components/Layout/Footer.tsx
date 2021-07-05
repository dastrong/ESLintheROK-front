import React from 'react';
import Link from 'next/link';
import FooterSvgs from './FooterSvgs';
import FooterCornerTexts from './FooterCornerTexts';

export default function Footer({ maxSVGWidth }: { maxSVGWidth: number }) {
  return (
    <footer>
      <FooterSvgs maxWidth={maxSVGWidth} />
      <FooterCornerTexts />

      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/games">
        <a>Games</a>
      </Link>
      <Link href="/faqs">
        <a>Help</a>
      </Link>

      <Link href="/guide">
        <a>Guide</a>
      </Link>
      <Link href="/changelog">
        <a>Changelog</a>
      </Link>
      <span>Contribute</span>
      {/* <ul>
            <li>As teacher</li>
            <li>As developer</li>
          </ul> */}
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      <Link href="/admin">
        <a>Admin</a>
      </Link>

      <style jsx>{`
        footer {
          position: relative;
          height: 300px;
          width: 100%;
          background-color: var(--siteBgColor);
          display: flex;
          justify-content: center;
        }

        ul {
          z-index: 1;
          padding: 0;
          margin: 3rem;
          list-style-type: none;
          display: flex;
          display: none;
        }

        li {
          padding: 1rem;
          font-size: 1.5vw;
          text-transform: uppercase;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
}
