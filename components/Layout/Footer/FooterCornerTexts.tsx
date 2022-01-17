import React from 'react';
import Link from 'next/link';
import { SiAircanada, SiBuymeacoffee } from 'react-icons/si';
import { GiSouthKorea } from 'react-icons/gi';
import { FaHeart, FaCoffee, FaRegCopyright } from 'react-icons/fa';
import Button from 'components/Button';

export default function FooterCornerTexts() {
  return (
    <>
      <div className="corner corner_left">
        <p>
          <Button
            as="a"
            target="_blank"
            href="https://www.buymeacoffee.com/ycqPbFl"
            color="#732f00"
            bgColor="#fbbd08"
            text="Feeling supportive? Buy me a coffee"
            iconPosition="right"
            Icon={SiBuymeacoffee}
            size="sm"
            style={{ boxShadow: '0px 0px 5px 0px #9c00b5' }}
          />
        </p>

        <p className="made_by">
          Made with <FaCoffee style={{ color: '#6f4e37' }} /> and{' '}
          <FaHeart style={{ color: 'red' }} /> by a{' '}
          <SiAircanada style={{ color: 'red' }} /> living in{' '}
          <GiSouthKorea style={{ color: '#0047A0' }} />
        </p>
      </div>

      <div className="corner corner_right">
        <p>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </p>

        <p>
          <Link href="/acknowledgements">
            <a>Acknowledgements</a>
          </Link>
        </p>

        <p className="copyright">
          <FaRegCopyright /> 2021{' '}
          <a href="https://danielstrong.tech" target="_blank" rel="noreferrer">
            Daniel Strong
          </a>
        </p>
      </div>

      <style jsx>{`
        .corner {
          position: absolute;
          margin: 0;
          bottom: 2.5rem;
          font-size: min(1.75vw, 1.35rem);
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
          margin-bottom: 1.2rem;
        }

        .corner p:last-child {
          margin-bottom: 0;
        }

        a {
          color: inherit;
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
