/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withPlugins(
  [[withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })]],
  {
    webpack5: false,
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                  removeDimensions: true,
                  cleanupNumericValues: {
                    floatPrecision: 2,
                  },
                },
              },
            },
          },
        ],
      });
      return config;
    },
  }
);
