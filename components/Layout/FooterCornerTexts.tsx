import React from 'react';
import Link from 'next/link';
import { SiAircanada } from 'react-icons/si';
import { GiSouthKorea } from 'react-icons/gi';
import { FaHeart, FaCoffee, FaRegCopyright } from 'react-icons/fa';

export default function FooterCornerTexts() {
  return (
    <>
      <div className="corner corner_left">
        <p className="support_me">
          Feeling supportive? <a href="/coffee">Buy me a coffee!</a>
        </p>

        <p className="made_by">
          Made with <FaCoffee style={{ color: '#6f4e37' }} /> and{' '}
          <FaHeart style={{ color: 'red' }} /> by a{' '}
          <SiAircanada style={{ color: 'red' }} /> living in
          <GiSouthKorea style={{ color: '#0047A0' }} />
        </p>
      </div>

      <div className="corner corner_right">
        <p>
          <Link href="/acknowledgements">
            <a className="acknowledgements">Acknowledgements</a>
          </Link>
        </p>

        <p className="copyright">
          <FaRegCopyright /> 2021{' '}
          <a href="https://www.danielstrong.tech">Daniel Strong</a>
        </p>
      </div>

      <style jsx>{`
        .corner {
          position: absolute;
          margin: 0;
          bottom: 2rem;
          font-size: min(1.5vw, 1.25rem);
        }

        .corner_left {
          left: 2rem;
          text-align: left;
        }

        .corner_right {
          right: 2rem;
          text-align: right;
        }

        .corner p {
          margin: 0;
        }

        .corner p:first-child {
          margin-bottom: 1rem;
        }

        .support_me a {
          color: white;
          text-decoration: underline;
          text-shadow: 1px 1px 5px #000, -1px -1px 5px #9c00b5;
          transition: text-shadow 150ms;
        }

        .support_me a:hover {
          text-shadow: 1px 1px 7px #000, -1px -1px 7px #9c00b5;
        }

        a {
          color: #250225;
          text-decoration: none;
        }

        a:hover {
          color: #5a035a;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
