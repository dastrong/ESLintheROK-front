import React from 'react';
import type { AppProps } from 'next/app';
import { IconContext } from 'react-icons/lib';
import Layout from '../components/Layout';
import { DataModals } from 'components/Modal(s)';
import { StoreProvider } from '../contexts/store';
import { ThemeProvider } from 'contexts/theme';
import 'normalize.css';
import '@fontsource/lato';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <StoreProvider>
        <IconContext.Provider value={{ style: { verticalAlign: 'bottom' } }}>
          <DataModals />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IconContext.Provider>

        {/* BUTTON DEFAULTS */}
        <style jsx global>{`
          button {
            cursor: pointer;
            outline: 0;
            border: none;
            text-decoration: none;
            user-select: none;
            line-height: 1;
          }
        `}</style>

        {/* THE REST */}
        <style jsx global>{`
          body {
            font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
            overflow-x: hidden;
            --siteBgColor: #cdeeff;
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
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

           {
            /* ::-webkit-scrollbar-track {
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
          } */
          }
        `}</style>
      </StoreProvider>
    </ThemeProvider>
  );
}
