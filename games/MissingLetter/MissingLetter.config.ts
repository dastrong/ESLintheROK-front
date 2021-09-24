import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/missing_letter', // you probably don't wanna edit this
  title: 'Missing Letter', // you probably don't wanna edit this
  description: 'Letter Recognition Game',
  image: {
    width: 346,
    height: 149,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Writing', 'Reading', 'Speaking', 'Listening'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ["Left-Click (on '... Missing' Header)"],
      description: 'Shows the next missing letter',
    },
    {
      key: ['Left-Click (on a page hole)'],
      description: 'Shows the Nth missing letter',
    },
    {
      key: ['Space', 'Enter', "Left-Click (on 'New ...' Header)"],
      description: 'Refresh the game and get next vocabulary/expression',
    },
    {
      key: ['Left-Arrow', 'Scroll Down'],
      description: 'Refresh the game and use vocabulary',
    },
    {
      key: ['Right-Arrow', 'Scroll Up'],
      description: 'Refresh the game and use expressions',
    },
    {
      key: ['1-9'],
      description: 'Change the maximum number of missing letters (default: 1)',
    },
    {
      key: ['a'],
      description: 'Change where blanks happen; anywhere (default)',
    },
    {
      key: ['s'],
      description: 'Change where blanks happen; start of the word',
    },
    {
      key: ['m'],
      description: 'Change where blanks happen; middle of the word',
    },
    {
      key: ['e'],
      description: 'Change where blanks happen; end of the word',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Lots of ways to use this game',
        'Check out the game hotkeys for all the features to help you decide',
        "Here's a couple ideas",
        'Play individually or in a group',
        'Write the answer down or simply raise their hands',
        "If your students can't figure it out: show a missing letter or say the word",
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },

    forStudents: {
      english: ['Fill in the blanks with the correct letters'],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
