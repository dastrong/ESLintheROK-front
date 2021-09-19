import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { IconContext } from 'react-icons/lib';
import { DefaultSeo } from 'next-seo';
import { Provider as SessionProvider } from 'next-auth/client';

import Layout from 'components/Layout';
import CookieConsent from 'components/CookieConsent';
import { StoreProvider } from 'contexts/store';
import { ThemeProvider } from 'contexts/theme';
import { FontProvider } from 'contexts/fonts';
import { apiFetch } from 'utils/fetchers';
import { SEO } from 'next-seo.config';
import 'normalize.css';

import dynamic from 'next/dynamic';
const GlobalModals = dynamic(() => import('components/Modals/GlobalModals'));

const navWaveHeightToWidthRatio = 192 / 2560;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher: apiFetch }}>
      <IconContext.Provider value={{ style: { verticalAlign: 'bottom' } }}>
        <SessionProvider session={pageProps.session}>
          <FontProvider>
            <ThemeProvider>
              <StoreProvider>
                <GlobalModals />
                <Layout>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                  <CookieConsent />
                </Layout>

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

                  a {
                    color: inherit;
                    text-decoration-color: #04a7fb;
                  }
                `}</style>

                {/* THE REST */}
                <style jsx global>{`
                  body {
                    font-family: 'Comic Neue', cursive;
                    overflow-x: hidden;
                    background-color: var(--siteBgColor);
                    --siteBgColor: #cdeeff;
                    --navHeight: calc(100vw * ${navWaveHeightToWidthRatio});
                    --footerHeight: 300px;
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
                `}</style>
              </StoreProvider>
            </ThemeProvider>
          </FontProvider>
        </SessionProvider>
      </IconContext.Provider>
    </SWRConfig>
  );
}
