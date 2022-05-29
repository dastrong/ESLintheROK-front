import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,
  publishedDate: '2022-05-29T16:45:52.613Z', // enter the value returned from - new Date().toIsoString()

  // MAIN INFO
  path: '/game/human_zero_game', // you probably don't wanna edit this
  title: 'Human Zero Game', // you probably don't wanna edit this
  description: 'Team reading and speaking game',
  image: {
    width: 0,
    height: 0,
  },
  warnings: [],

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
      key: ['g'],
      description: 'Change the group size (default: 4)',
    },
    {
      key: ['Left-Click'],
      description: 'Next slide',
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
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Group game',
        'Choose a group size, the default is 4',
        'Press g to select a group size',
        'Everyone in the class sits down and reads the word or sentence on the screen',
        'Groups of students must decide how many of them stand up',
        'Click the screen',
        'A number is shown on the screen and if it matches the number of students standing in a group, that group gets a point',
        'Click the screen again to start the next round',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },

    forStudents: {
      english: [
        'Team game',
        'Everyone sits down',
        'Read the word or sentence',
        'Choose to stand up or stay sitting',
        'The teacher will show a random number on the T.V',
        'If the number of students standing in your team matches the number on the T.V, your team gets 1 point.',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
