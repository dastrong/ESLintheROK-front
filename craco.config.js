const CracoWorkboxPlugin = require("craco-workbox");
const path = require("path");

const resolve = arg => path.resolve(__dirname, arg);

module.exports = {
  webpack: {
    alias: {
      "@Game": resolve("src/components/games/"),
    },
  },
  plugins: [
    {
      plugin: CracoWorkboxPlugin,
    },
  ],
};
