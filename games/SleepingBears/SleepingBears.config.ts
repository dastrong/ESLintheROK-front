import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/sleeping_bears', // you probably don't wanna edit this
  title: 'Sleeping Bears', // you probably don't wanna edit this
  description: 'Teamwork Solving Game',
  image: {
    width: 391,
    height: 180,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Listening', 'Reading', 'Speaking', 'Writing'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Next slide',
    },
    {
      key: ['Space', 'Enter'],
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
      key: ['2-4'],
      description: 'Change the number of boxes',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Group game',
        'You can change the number of boxes to better suit your class/group size',
        'Each group needs a whiteboard, marker and eraser',
        "Each group member should know what number they are 1-4 (that'll depend on the number of boxes)",
        'Everyone goes to sleep (heads down, eyes closed, lights off)',
        "Yell out 'Bear 1, wake up'",
        "That student should wake up and memorize what's in their box",
        "Say 'Bear 1, go to sleep'",
        'Repeat until all bears have seen their boxes',
        'Really low level students can write their phrases down instead of memorizing it',
        "Yell out 'Wake up bears' and turn on the lights",
        'I get each student to write their portion in the corner of their whiteboard',
        'Then they need to figure out together what the correct answer is and write it down',
        'Tell them to show you their boards',
        'Show them the answer',
        'Give points to the correct teams',
      ],
      korean: ['Coming Soon...'],
    },

    forStudents: {
      english: [
        'Teamwork group game',
        'Get a whiteboard, marker, and eraser',
        'Go to sleep and wake up when your number is called to memorize your box',
        'Go back to sleep until everyone has gone',
        "When I say 'Wake up bears', wake up and write down what you saw",
        'Take turns writing in the corner of the whiteboard',
        'Work together to figure out the correct answer and write it down',
        "Punctuation matters! ( ! ? . ' , )",
        'Most points win',
      ],
      korean: ['Coming Soon...'],
    },
  },
};
