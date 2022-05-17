const { ESLint } = require('eslint');

const removeIgnoredFiles = async files => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map(file => {
      return eslint.isPathIgnored(file);
    })
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '{components,contexts,games,hooks,lib,pages,utils}/**/*.{ts,tsx}':
    async files => {
      const filesToLint = await removeIgnoredFiles(files);
      if (!filesToLint) return [];
      return [
        `eslint --max-warnings=0 ${filesToLint}`,
        `prettier -w ${filesToLint}`,
      ];
    },
};
