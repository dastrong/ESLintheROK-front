import React from 'react';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href="/">
      <a>
        <img src="./FavIcon.png" alt="logo" />

        <style jsx>{`
          a {
            height: 85%;
          }

          img {
            height: 97%;
            padding-bottom: 3%;
          }
        `}</style>
      </a>
    </Link>
  );
}
