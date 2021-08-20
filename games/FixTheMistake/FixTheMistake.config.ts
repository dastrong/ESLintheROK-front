import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/fix_the_mistake', // you probably don't wanna edit this
  title: 'Fix The Mistake', // you probably don't wanna edit this
  description: 'Grammar Game',
  image: {
    width: 343,
    height: 200,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Writing', 'Reading', 'Speaking', 'Listening'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ["Left-Click (on '... Mistake' Header)"],
      description: 'Shows the next mistake',
    },
    {
      key: ['Left-Click (on a page hole)'],
      description: 'Shows the Nth mistake',
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
      description: 'Change the maximum number of mistakes (default: 1)',
    },
    {
      key: ['a'],
      description: 'Change where mistakes happen; anywhere (default)',
    },
    {
      key: ['s'],
      description: 'Change where mistakes happen; start of the word',
    },
    {
      key: ['m'],
      description: 'Change where mistakes happen; middle of the word',
    },
    {
      key: ['e'],
      description: 'Change where mistakes happen; end of the word',
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
      english: ['Figure out the mistake and correct them'],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
