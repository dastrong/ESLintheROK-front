const { override, adjustWorkbox } = require("customize-cra");

module.exports = override(adjustWorkbox(wb => ({ ...wb, skipWaiting: true })));
