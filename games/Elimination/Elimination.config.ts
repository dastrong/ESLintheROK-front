import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/elimination', // you probably don't wanna edit this
  title: 'Elimination Game', // you probably don't wanna edit this
  description: 'Find the Hidden Item',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941137/TeacherSite/Games/Elimination.svg`,

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: true,

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
    {
      key: ['1-5'],
      description: "Change the number of X's (default: 3)",
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Every student starts the game standing',
        'Students take turns reading a block',
        'Click that block',
        'X = sit down',
        'O = stay standing',
        'Last student standing wins',
        'Let the class know who the first and last students are',
        'I like to zig zag through the rows then return to the first student',
        'You can switch from vocab to expressions using the left and right arrows',
      ],
      korean: [
        '개인별 게임',
        '모두 일어선 상태로 게임을 시작합니다',
        '한 명씩 하나의 블록 안에 있는 단어/문장을 읽습니다',
        '그리고 그 블록을 클릭합니다',
        'X = 앉기',
        'O = 그대로 서 있기',
        '끝까지 살아서 서있는 사람이 우승!',
        '처음 시작한 사람과 마지막 차례가 누군지 알려주세요',
        '처음 학생 다음 순서는 오른쪽 학생, 즉 반 전체를 봤을 때, "ㄹ"형태로 진행합니다',
        '<- 키보드를 누르면 단어, -> 키보드를 누르면 표현(문장)입니다',
      ],
    },

    forStudents: {
      english: [
        'Everyone stands up',
        'Read a block',
        'X = sit down',
        'O = stay standing',
        'Last student standing wins',
      ],
      korean: [
        '모두 일어섯',
        '블록 안의 단어/표현을 읽으세요',
        'X = 앉기',
        'O = 일어서 있기',
        '가장 마지막까지 서있는 사람이 우승',
      ],
    },
  },
};
