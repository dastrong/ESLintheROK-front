// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option:
      'Are you sure you want to create a new game? (Press enter to continue)',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './games/_utils/generate/templates/',
    },
    stringReplacers: [{ question: 'Insert Game Name', slot: '__GameName__' }],
    output: {
      path: './games/__GameName__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: results => {
      console.log(`
        You're all ready to start coding. 
        Go to ${results.output.path} to view your initial game files.

        If you have any questions, please open an issue here:         
        https://github.com/dastrong/ESLintheROK-front/issues
      `);
    },
  },
]);
