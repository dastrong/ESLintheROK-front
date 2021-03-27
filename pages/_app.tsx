import React from 'react';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import 'normalize.css';
import '@fontsource/lato';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />

      <style jsx global>{`
        body {
          font-family: 'Lato';
        }

        /* CSS VARIABLES */
        :root {
          --color-lightblue: #54c8ff;
          --color-red: #ff695e;
          --color-green: #2ecc40;
          --color-yellow: #ffe21f;
          --color-orange: #ff851b;
        }

        /* BUTTON DEFAULTS */
        .btn,
        button {
          cursor: pointer;
          display: inline-block;
          outline: 0;
          border: none;
          vertical-align: initial;
          background: #e0e1e2 none;
          font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
          text-transform: none;
          text-shadow: none;
          font-weight: 700;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        [type='reset'],
        [type='submit'],
        button,
        html [type='button'] {
          -webkit-appearance: button;
        }
        button,
        select {
          text-transform: none;
        }
        button,
        input {
          overflow: visible;
        }
        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: sans-serif;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 0;
        }

        ::-webkit-scrollbar-thumb {
          cursor: pointer;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.25);
          -webkit-transition: color 0.2s ease;
          transition: color 0.2s ease;
        }

        ::-webkit-scrollbar-thumb:window-inactive {
          background: rgba(0, 0, 0, 0.15);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 135, 139, 0.8);
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
        }

        ::-webkit-scrollbar-thumb:window-inactive {
          background: rgba(255, 255, 255, 0.15);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </>
  );
}
