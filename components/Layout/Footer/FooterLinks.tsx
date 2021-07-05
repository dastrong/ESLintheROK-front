import React from 'react';
import Link from 'next/link';
import { css } from 'styled-jsx/css';
import Logo from '../Logo';

const maxWidth = 1200;
const maxLeftBlobWidth = 509;
const maxRightBlobWidth = 259;

const LogoCSS = css.resolve`
  svg {
    position: absolute;
    top: calc(-75px - 1rem);
    height: 75px;
    width: 75px;
    margin: 0 0.5rem;
  }

  @media screen and (min-width: 1440px) {
    svg {
      position: relative;
      top: 0;
      height: calc(62px + 1rem);
      width: calc(62px + 1rem);
    }
  }
`;

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
      <Logo className={LogoCSS.className} />
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

      {LogoCSS.styles}
      <style jsx>{`
        .links {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          left: calc(${maxLeftBlobWidth} / ${maxWidth} * 100%);
          right: calc(${maxRightBlobWidth} / ${maxWidth} * 100%);
          bottom: 2rem;
          font-size: min(1.5vw, 1.35rem);
          margin: 0 0.5rem;
        }

        a,
        span {
          color: inherit;
          text-decoration: none;
          text-transform: uppercase;
          padding: 0.25rem;
        }

        @media screen and (min-width: ${maxWidth}px) {
          .links {
            left: ${maxLeftBlobWidth}px;
            right: ${maxRightBlobWidth}px;
          }
        }

        @media screen and (min-width: 1440px) {
          .links {
            bottom: 1.5rem;
            justify-content: space-evenly;
          }

          a,
          span {
            padding: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}
