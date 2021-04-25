import React from 'react';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import { DataModals } from 'components/Modal(s)';
import { StoreProvider } from '../contexts/store';
import { globalCSSVariables } from 'utils/theme';
import 'normalize.css';
import '@fontsource/lato';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Sidebar />
      <DataModals />
      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* CSS Variables */}
      <style jsx global>
        {globalCSSVariables}
      </style>

      {/* BUTTON DEFAULTS */}
      <style jsx global>{`
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
      `}</style>

      {/* THE REST */}
      <style jsx global>{`
        body {
          font-family: 'Lato';
          overflow: hidden;
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
    </StoreProvider>
  );
}
