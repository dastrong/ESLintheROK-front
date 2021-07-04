import React from 'react';
import Link from 'next/link';
import FooterSvgs from './FooterSvgs';
import FooterInfo from './FooterInfo';

export default function Footer({ maxSVGWidth }: { maxSVGWidth: number }) {
  return (
    <footer>
      <FooterSvgs maxWidth={maxSVGWidth} />
      <FooterInfo />

      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/games">
            <a>Games</a>
          </Link>
        </li>
        <li>
          <Link href="/faqs">
            <a>Help</a>
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link href="/guide">
            <a>Guide</a>
          </Link>
        </li>
        <li>
          <Link href="/changelog">
            <a>Changelog</a>
          </Link>
        </li>
        <li>
          Contribute
          <ul>
            <li>As teacher</li>
            <li>As developer</li>
          </ul>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/admin">
            <a>Admin</a>
          </Link>
        </li>
      </ul>

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
