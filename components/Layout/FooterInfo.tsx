import React from 'react';
import { SiAircanada } from 'react-icons/si';
import { GiSouthKorea } from 'react-icons/gi';
import { FaHeart, FaCoffee, FaRegCopyright } from 'react-icons/fa';

export default function FooterInfo() {
  return (
    <>
      <p className="info made_by">
        Made with lots of <FaCoffee style={{ color: '#6f4e37' }} /> and{' '}
        <FaHeart style={{ color: 'red' }} /> by a{' '}
        <SiAircanada style={{ color: 'red' }} /> living in
        <GiSouthKorea style={{ color: '#0047A0' }} />
      </p>

      <p className="info copyright">
        <FaRegCopyright /> 2021{' '}
        <a href="https://www.danielstrong.tech">Daniel Strong</a>
      </p>

      <style jsx>{`
        .info {
          position: absolute;
          margin: 0;
          bottom: 2rem;
          font-size: min(1.5vw, 1.25rem);
        }

        .made_by {
          left: 2rem;
        }

        .copyright {
          right: 2rem;
        }

        .info a {
          color: #250225;
          text-decoration: none;
        }

        .info a:hover {
          color: #5a035a;
        }
      `}</style>
    </>
  );
}
