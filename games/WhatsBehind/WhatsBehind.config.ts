import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/whats_behind', // you probably don't wanna edit this
  title: 'Whats Behind', // you probably don't wanna edit this
  description: 'Find the Hidden Item',
  image: {
    width: 335,
    height: 276,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: true,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Spin a block',
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
        'Individual Game',
        'Choose a student to read a block',
        'Click the block the student said',
        'If a trophy appears reward that student',
        'Continue until someone finds the trophy',
        'When the trophy is found a GIF will appear',
        'Reward student however you want, I give a stamp',
        'Repeat as desired',
      ],
      korean: [
        '개인별 게임',
        '한 학생이 블록 안의 단어/표현을 읽게 합니다',
        '그 읽은 블록을 클릭합니다',
        '트로피가 나오면 보상해줍니다',
        '누군가가 트로피를 발견할 때까지 계속 진행합니다',
        '트로피가 나타나면 "움직이는 사진"이 나타납니다',
        '당신이 원하는 방식으로 보상을 해주세요 (저는 도장을 하나 줍니다)',
        '계속 반복하시면 됩니다',
      ],
    },

    forStudents: {
      english: [
        'Raise your hand',
        'Wait your turn',
        'Read a block',
        'Trophy = reward',
      ],
      korean: [
        '손을 드세요',
        '당신의 차례를 기다리세요',
        '블록 안의 단어/표현을 읽으세요',
        '트로피 = 보상',
      ],
    },
  },
};
