import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,
  publishedDate: '2021-10-16T02:24:22.630Z',

  // MAIN INFO
  path: '/game/word_shark', // you probably don't wanna edit this
  title: 'Word Shark', // you probably don't wanna edit this
  description: 'Word Guessing Game',
  image: {
    width: 389,
    height: 215,
  },
  warnings: [
    'Underscore characters (blank spaces) have different spacings on different fonts.',
    'If the spacing is too small or large, change the font.',
  ],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click Letter', 'Keyboard Letter'],
      description: 'Chooses and checks that letter',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
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
      key: ['Up-Arrow'],
      description: 'Increases the maximum number of wrong answers',
    },
    {
      key: ['Down-Arrow'],
      description: 'Decreases the maximum number of wrong answers',
    },
    {
      key: ['1-9 (Default: 6)'],
      description: 'Change the maximum number of wrong answers',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'This game is similar to Hangman',
        'Students must guess what the hidden word is by choosing letters',
        'Lots of ways to use this game, for example:',
        'Divide the class into two teams',
        'Let the first team choose a letter',
        'Then switch teams',
        'The first team to guess the hidden word is the winner',
        'Can also be played by the whole class together as a warm up activity',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
    forStudents: {
      english: [
        'Pick a letter',
        'Keep picking until you know the word',
        'Raise your hand',
        "Don't yell out letters",
        'Wait to be chosen',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
