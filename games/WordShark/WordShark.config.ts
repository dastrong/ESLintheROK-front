import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: false,

  // MAIN INFO
  path: '/game/word_shark', // you probably don't wanna edit this
  title: 'Work Shark', // you probably don't wanna edit this
  description: 'Word Guessing Game',
  image: `https://res.cloudinary.com/dastrong/image/upload/_____`,

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['None'],
      description: 'No short cut keys for this game, just use your mouse.',
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
        'Guess what the missing word is',
        'Choose a letter to fill in the blanks',
      ],
      korean: [
        'Coming Soon', // use simple, clear phrases to explain the game
      ],
    },
  },
};
