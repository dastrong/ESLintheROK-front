import React from 'react';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href="/">
      <a>
        <img src="./FavIcon.png" alt="logo" />

        <style jsx>{`
          a {
            display: inline-block;
          }

          @media screen and (max-width: 2560px) {
            a {
              top: 16px;
              left: 16px;
            }

            img {
              height: 85%;
              width: auto;
            }
          }

          @media screen and (max-width: 1920px) {
            a {
              top: 13px;
              left: 13px;
            }

            img {
              height: 85%;
              width: auto;
            }
          }

          @media screen and (max-width: 1440px) {
            a {
              top: 10px;
              left: 10px;
            }

            img {
              height: 85%;
              width: auto;
            }
          }

          @media screen and (max-width: 1024px) {
            a {
              top: 15px;
              left: 15px;
            }

            img {
              height: 85%;
              width: auto;
            }
          }
        `}</style>
      </a>
    </Link>
  );
}
