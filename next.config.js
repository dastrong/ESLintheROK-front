/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const oldGameReRouting = [
  { old: '/game/chase', new: '/game/chase_the_vocab' },
  { old: '/game/cowboy', new: '/game/cowboy' },
  { old: '/game/elimination', new: '/game/elimination' },
  { old: '/game/fixthemistake', new: '/game/fix_the_mistake' },
  { old: '/game/hotpotato', new: '/game/hot_potato' },
  { old: '/game/kimchi', new: '/game/kimchi_elimination' },
  { old: '/game/bowling', new: '/game/letter_bowling' },
  { old: '/game/match', new: '/game/matching' },
  { old: '/game/missingletter', new: '/game/missing_letter' },
  { old: '/game/nunchi', new: '/game/nunchi' },
  { old: '/game/battleground', new: '/game/pubg_battleground' },
  { old: '/game/redblue', new: '/game/red_and_blue' },
  { old: '/game/sleepingbears', new: '/game/sleeping_bears' },
  { old: '/game/sparkle', new: '/game/sparkle_die' },
  { old: '/game/speedsolver', new: '/game/speed_solver' },
  { old: '/game/stars', new: '/game/stars' },
  { old: '/game/whatsbehind', new: '/game/whats_behind' },
  { old: '/game/whatsmissing', new: '/game/whats_missing' },
  { old: '/game/lotto', new: '/game/word_lotto' },
];

module.exports = withPlugins(
  [[withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })]],
  {
    swcMinify: true,
    webpack: config => {
      config.module.rules.push(
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                    {
                      name: 'removeDimensions',
                      active: true,
                    },
                    {
                      name: 'cleanupNumericValues',
                      active: true,
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(mp3|wav)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/sounds/',
              outputPath: 'static/sounds/',
              name: '[path][name].[ext]',
              esModule: false,
            },
          },
        },
        {
          test: /\.(jpe?g|png|webp|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/sounds/',
              outputPath: 'static/sounds/',
              name: '[path][name].[ext]',
              esModule: false,
            },
          },
        }
      );
      return config;
    },
    async redirects() {
      return [
        // game home pages
        ...oldGameReRouting
          .filter(route => route.old !== route.new)
          .map(route => ({
            source: route.old,
            destination: route.new,
            permanent: false,
          })),
        // game play pages
        ...oldGameReRouting
          .filter(route => route.old !== route.new)
          .map(route => ({
            source: `${route.old}/play`,
            destination: `${route.new}/play`,
            permanent: false,
          })),
        // game teacher instruction pages
        ...oldGameReRouting.map(route => ({
          source: `${route.old}/teacher`,
          destination: `${route.new}/?instructions=teacher&language=english`,
          permanent: false,
        })),
        // game student instruction pages
        ...oldGameReRouting.map(route => ({
          source: `${route.old}/teacher`,
          destination: `${route.new}/?instructions=student&language=english`,
          permanent: false,
        })),
      ];
    },
  }
);
