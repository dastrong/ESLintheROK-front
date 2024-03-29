import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';

const maxWidth = 1200;
const maxLeftBlobWidth = 509;
const maxRightBlobWidth = 259;

export default function FooterLinks() {
  return (
    <div className="links">
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
      <Link href="/">
        <a className="logo_link" aria-label="Go Home">
          <Logo style={{ height: '65px', width: '65px' }} />
        </a>
      </Link>
      <Link href="/changelog">
        <a>Changelog</a>
      </Link>
      <Link href="/contribute">
        <a>Contribute</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      <Link href="/admin">
        <a>Admin</a>
      </Link>

      <style jsx>{`
        .links {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          left: calc(${maxLeftBlobWidth} / ${maxWidth} * 100%);
          right: calc(${maxRightBlobWidth} / ${maxWidth} * 100%);
          bottom: 2.5rem;
          font-size: min(1.75vw, 1.35rem);
          margin: 0 0.5rem;
        }

        a:not(.logo_link) {
          color: inherit;
          text-decoration: none;
          padding: 1.2rem 0.25rem 0rem;
        }

        .logo_link {
          padding: 0;
          position: absolute;
          top: calc(-65px - 1rem);
          margin: 0 0.5rem;
        }

        @media screen and (min-width: ${maxWidth}px) {
          .links {
            left: ${maxLeftBlobWidth}px;
            right: ${maxRightBlobWidth}px;
          }

          a:not(.logo_link) {
            padding: 1.2rem 0.6rem 0rem;
          }
        }

        @media screen and (min-width: 1440px) {
          a:not(.logo_link) {
            padding: 1.2rem 1.25rem 0rem;
          }
        }

        @media screen and (min-width: 1700px) {
          .links {
            bottom: 2.5rem;
            justify-content: space-evenly;
            align-items: baseline;
            max-width: 1200px;
            margin-inline: auto;
          }

          a:not(.logo_link) {
            padding: 1.2rem 0.5rem 0rem;
          }

          .logo_link {
            position: relative;
            line-height: 0;
            top: calc(min(1.75vw, 1.35rem) / 2);
          }
        }
      `}</style>
    </div>
  );
}
