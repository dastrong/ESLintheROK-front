module.exports = options => {
  console.log(options);
  options.skipWaiting = true;
  return options;
};
