import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: false,

  // MAIN INFO
  path: '/game/first_and_last_letter', // you probably don't wanna edit this
  title: 'First And Last Letter', // you probably don't wanna edit this
  description: '',
  image: {
    width: 0,
    height: 0,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: [],
  dataUsed: [],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    { key: ['Left-Click'], description: '' },
    { key: ['Space', 'Enter'], description: 'Refresh the game' },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },

    forStudents: {
      english: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
