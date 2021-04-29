// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateTemplateFiles } = require('generate-template-files');

// generates starter files in the games folder ...
// ... and adds a page route to reach their game
createGameFolder();

function createGameFolder() {
  return generateTemplateFiles([
    {
      option: 'A folder to create a game (Press enter to continue)',
      defaultCase: '(pascalCase)',
      entry: { folderPath: './games/_utils/generate/templates/gameFolder' },
      stringReplacers: [
        {
          question: 'Insert Game Name',
          slot: '__GameName__',
        },
      ],
      output: { path: './games/__GameName__(pascalCase)' },
      onComplete: results => {
        const gameName = results.stringReplacers[0].slotValue;
        const gameFolder = results.output.path;
        createPageFolder(gameName, gameFolder);
      },
    },
  ]);
}

function createPageFolder(gameName, gameFolder) {
  generateTemplateFiles([
    {
      option: 'A page to view your game (Press enter to continue)',
      defaultCase: '(pascalCase)',
      entry: { folderPath: './games/_utils/generate/templates/pageFolder' },
      dynamicReplacers: [
        {
          slot: '__GameRoute__',
          slotValue: gameName.toLowerCase(),
        },
        {
          slot: '__GameName__',
          slotValue: gameName,
        },
      ],
      output: { path: './pages/game/__GameRoute__(snakeCase)' },
      onComplete: results => {
        const gameRoute = results.output.path.replace('./pages', '') + '/play';
        console.log(`
          Your files are all set up to start working. 
          Go to ${gameFolder} to view your initial game files.
          To view your game, visit this route: ${gameRoute} (server must be on).

          If you have any questions, please open an issue here:
          https://github.com/dastrong/ESLintheROK-front/issues
        `);
      },
    },
  ]);
}
