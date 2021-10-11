import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/first_and_last_letter', // you probably don't wanna edit this
  title: 'First And Last Letter', // you probably don't wanna edit this
  description: 'Class Vocabulary Exercise',
  image: {
    width: 400,
    height: 251,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Speaking', 'Reading', 'Listening'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Refocuses the window, so you may type again',
    },
    {
      key: ['Ctrl+Space', 'Ctrl+Enter'],
      description: 'Refresh the game or get a new random starting letter',
    },
    { key: ['Enter'], description: 'Submit your new word' },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Class Game',
        'When you open the game, there will be a random letter shown',
        'Students should give a word that starts with that letter',
        'You must type that word and hit enter',
        'The next word given should start with the previous words last letter',
        'The animations will all be done for you',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },

    forStudents: {
      english: [
        'Raise your hand',
        'Wait your turn',
        'Give a word that starts with the last letter above',
        'As a group, try to get as many words as possible',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
