import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';

export default function NavLogo() {
  return (
    <Link href="/">
      <a aria-label="Go Home">
        <Logo style={{ height: '97%', paddingBottom: '3%' }} />

        <style jsx>{`
          a {
            height: 85%;
            margin-left: 2vw;
            width: min-content;
          }
        `}</style>
      </a>
    </Link>
  );
}
