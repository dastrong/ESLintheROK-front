import React from 'react';
import Link from 'next/link';
import Popup from 'components/Popup';

export default function NavLinks() {
  return (
    <>
      <div className="links_primary">
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/games">
          <a>Games</a>
        </Link>

        <Link href="/faqs">
          <a>Help</a>
        </Link>
      </div>

      <div className="links_secondary">
        <Link href="/guide">
          <a>Guide</a>
        </Link>

        <Popup interactive delayHide={100} owner={<a>Contribute</a>}>
          <div>
            <p>As teacher</p>
            <p>As developer</p>
          </div>
        </Popup>

        <Link href="/changelog">
          <a>Changelog</a>
        </Link>

        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>

      <style jsx>{`
        a {
          text-decoration: none;
          text-transform: uppercase;
          color: #565656;
          font-weight: bold;
        }

        .links_primary {
          position: absolute;
          left: 10%;
          margin: 1rem;
        }

        .links_secondary {
          position: absolute;
          left: 50%;
          margin: 1rem 0.5rem;
        }

        .links_primary a {
          margin: 1.5rem;
        }

        .links_secondary a {
          margin: 1.25rem;
        }

        @media screen and (max-width: 2560px) {
          a {
            font-size: 2rem;
          }
        }

        @media screen and (max-width: 1920px) {
          a {
            font-size: 1.75rem;
          }
        }

        @media screen and (max-width: 1440px) {
          a {
            font-size: 1.25rem;
          }
        }

        @media screen and (max-width: 1024px) {
          a {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
