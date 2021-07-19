/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer');
const chalk = require('chalk');
const { generateTemplateFilesBatch } = require('generate-template-files');

// script runs this to capture the games name and start creating the game files
inquirer
  .prompt([
    {
      type: 'input',
      name: 'game_name',
      message: 'Type your game name',
    },
  ])
  .then(({ game_name }) => {
    createFiles(game_name);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(error);
    } else {
      // Something else went wrong
      console.error(error);
    }
  });

function createFiles(game_name) {
  const game_name_lowered = game_name.toLowerCase();
  let gameFolder;
  generateTemplateFilesBatch([
    {
      option: 'Creating Game Folder Files',
      defaultCase: '(pascalCase)',
      entry: { folderPath: './games/_utils/generate/templates/gameFolder' },
      dynamicReplacers: [
        { slot: '__GameName__', slotValue: game_name_lowered },
        { slot: '__GameTitle__', slotValue: game_name_lowered },
        { slot: '__GameRoute__', slotValue: game_name_lowered },
      ],
      output: { path: './games/__GameName__(pascalCase)' },
      onComplete: results => {
        gameFolder = results.output.path;
      },
    },
    {
      option: 'Creating Page Folder Files',
      defaultCase: '(pascalCase)',
      entry: { folderPath: './games/_utils/generate/templates/pageFolder' },
      dynamicReplacers: [
        {
          slot: '__GameRoute__',
          slotValue: game_name_lowered,
        },
        {
          slot: '__GameName__',
          slotValue: game_name_lowered,
        },
      ],
      output: { path: './pages/game/__GameRoute__(snakeCase)' },
      onComplete: results => {
        const gameRoute = results.output.path.replace('./pages', '') + '/play';
        console.log(successMsg(gameFolder, gameRoute));
      },
    },
  ]);
}

const successMsg = (gameFolder, gameRoute) => `
  Your files are all set up to start working. 
    
  Please take a moment to make an initial commit.

  Please read through the Game guide to get started
    ${chalk.blue.underline(
      'https://github.com/dastrong/ESLintheROK-front/tree/master/games/readme.md'
    )}

  Go to ${chalk.underline.green(gameFolder)} to view your initial game files.

  To view your game, visit this route: ${chalk.underline.magenta(
    gameRoute
  )} *${chalk.italic('server must be on')}*

  If you have any questions, please open an issue  
    ${chalk.blue.underline(
      'https://github.com/dastrong/ESLintheROK-front/issues'
    )}
`;
