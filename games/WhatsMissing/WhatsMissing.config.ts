import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/whats_missing', // you probably don't wanna edit this
  title: 'Whats Missing', // you probably don't wanna edit this
  description: 'Vocabulary Memory Game',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941133/TeacherSite/Games/Whats_Missing.svg`,

  // SKILLS AND DATA
  skills: ['Writing', 'Reading', 'Speaking'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Next slide',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['1-3'],
      description: 'Change the number of missing words (default: 1)',
    },
    {
      key: ['4-9'],
      description: 'Change the number of total words (default: 6)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Show your students how many words will go missing',
        'Show them all the words',
        'Give them a couple seconds to try to memorize all the words',
        'Click again to take away some words',
        "Have students put their hands up to guess what's missing",
        "Reward students when they're correct",
        'For lower level classes, start with less words',
        'For higher level classes, try 7-9 words with 3 missing',
      ],
      korean: ['Coming Soon...'],
    },

    forStudents: {
      english: [
        'Look at the screen',
        'Try to memorize all the words',
        'Figure out what words went missing',
      ],
      korean: ['Coming Soon...'],
    },
  },
};
