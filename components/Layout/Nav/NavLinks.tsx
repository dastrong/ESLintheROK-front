import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { SiBuymeacoffee } from 'react-icons/si';
import Button from 'components/Button';

import dynamic from 'next/dynamic';
const Popup = dynamic(() => import('components/Popup'));

const mainLinks = [
  { href: '/', text: 'Home' },
  { href: '/games', text: 'Games' },
  { href: '/faqs', text: 'Help' },
];

export default function NavLinks() {
  const { asPath } = useRouter();

  return (
    <>
      <ul className="links_primary">
        {mainLinks.map(({ href, text }) => (
          <li key={text}>
            <Link href={href}>
              <a className={classNames({ active: href === asPath })}>{text}</a>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="links_secondary">
        <li>
          <Link href="/guide">
            <a className={classNames({ active: '/guide' === asPath })}>Guide</a>
          </Link>
        </li>

        <Popup
          interactive
          delayHide={100}
          trigger={['hover', 'focus']}
          owner={
            <li>
              <Link href="/contribute">
                <a>Contribute</a>
              </Link>
            </li>
          }
        >
          <ul className="contribute_menu">
            <li>
              <Link href="/contribute/teacher">
                <a>As teacher</a>
              </Link>
            </li>
            <li>
              <Link href="/contribute/developer">
                <a>As developer</a>
              </Link>
            </li>
            <li>
              <Link href="/contribute/designer">
                <a>As designer</a>
              </Link>
            </li>
            <li>
              <Button
                as="a"
                target="_blank"
                href="https://www.buymeacoffee.com/ycqPbFl"
                color="#732f00"
                bgColor="#fbbd08"
                text="Buy me a coffee"
                Icon={SiBuymeacoffee}
                size="xs"
              />
            </li>
          </ul>
        </Popup>

        <li>
          <Link href="/changelog">
            <a className={classNames({ active: '/changelog' === asPath })}>
              Changelog
            </a>
          </Link>
        </li>

        <li>
          <Link href="/contact">
            <a className={classNames({ active: '/contact' === asPath })}>
              Contact
            </a>
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
          text-transform: uppercase;
          bottom: 13%;
          height: 87%;
        }

        ul.contribute_menu li {
          text-align: center;
          font-size: 1rem;
          margin: 0.5rem;
        }

        ul.contribute_menu li:not(:last-child) {
          margin-bottom: 1rem;
        }

        li {
          color: #565656;
        }

        a {
          color: inherit;
          text-decoration: none;
          transition: opacity 125ms;
        }

        a:hover {
          opacity: 0.9;
        }

        a.active {
          opacity: 0.95;
          text-decoration-line: underline;
          text-decoration-color: #04a7fb;
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
          font-size: 2vw;
          font-weight: bold;
        }

        .links_secondary li {
          font-size: 1.5vw;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
