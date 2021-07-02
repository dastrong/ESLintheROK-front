import React from 'react';
import Link from 'next/link';
import Popup from 'components/Popup';

export default function NavLinks() {
  return (
    <>
      <ul className="links_primary">
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

      <ul className="links_secondary">
        <li>
          <Link href="/guide">
            <a>Guide</a>
          </Link>
        </li>

        <Popup
          interactive
          delayHide={100}
          trigger={['hover', 'focus']}
          defaultVisible
          visible
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          owner={<li tabIndex={0}>Contribute</li>}
        >
          <ul className="contribute_menu">
            <li>
              <a>As teacher</a>
            </li>
            <li>
              <a>As developer</a>
            </li>
          </ul>
        </Popup>

        <li>
          <Link href="/changelog">
            <a>Changelog</a>
          </Link>
        </li>

        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        ul:not(.contribute_menu) {
          position: absolute;
          display: flex;
          align-items: center;
          font-variant: all-small-caps;
          bottom: 13%;
          height: 87%;
        }

        ul.contribute_menu {
          text-align: center;
        }

        ul.contribute_menu li:first-child {
          margin-bottom: 0.5rem;
        }

        li {
          color: #565656;
          font-weight: bold;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .links_primary {
          justify-content: space-around;
          left: 10%;
          width: 25%;
        }

        .links_secondary {
          justify-content: space-around;
          left: 50%;
          width: 35%;
        }

        .links_primary li {
          font-size: 2.7rem;
        }

        .links_secondary li {
          font-size: 2.1rem;
          font-weight: 400;
        }

        @media screen and (max-width: 1920px) {
          .links_primary li {
            font-size: 2.1rem;
          }

          .links_secondary li {
            font-size: 1.8rem;
          }
        }

        @media screen and (max-width: 1440px) {
          .links_primary li {
            font-size: 1.75rem;
          }

          .links_secondary li {
            font-size: 1.5rem;
          }
        }

        @media screen and (max-width: 1024px) {
          .links_primary li {
            font-size: 1.25rem;
          }

          .links_secondary li {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </>
  );
}
