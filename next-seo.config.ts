import type { DefaultSeoProps } from 'next-seo';

export const SEO: DefaultSeoProps = {
  defaultTitle: 'ESL in the ROK',
  titleTemplate: '%s | ESL in the ROK',
  description:
    'The ultimate tool to boost your teaching toolkit and improve your ESL classes instantly.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'ESL in the ROK',
    images: [
      {
        url: 'https://www.eslintherok.com/logo.png',
        alt: 'ESL in the ROK | The Ultimate Teaching Aide',
        width: 485,
        height: 491,
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      href: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};
