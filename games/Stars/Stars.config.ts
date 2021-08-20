import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/stars', // you probably don't wanna edit this
  title: 'Stars', // you probably don't wanna edit this
  description: 'Most Stars Wins',
  image: {
    width: 379,
    height: 245,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking', 'Writing'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: `https://pdfhost.io/v/Gx02X0gIh_Stars_Gamepdf.pdf`,
  hasAudio: false,

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
      key: ['0-5'],
      description: 'Change the minimum stars number of fo  a block (: 1): 0)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Students need a pencil',
        'Students need a Stars WS or their notebook',
        'Students choose a block and write it down',
        'Point at a block and the students that chose it should say it together',
        'Click that block',
        'Students should mark down how many stars they got',
        'Repeat as desired',
        'Winner has the most stars',
      ],
      korean: [
        '개인별 게임',
        '학생들은 연필이 필요합니다',
        '모두 활동지나 자신들의 공책이 필요합니다',
        '학생들이 블록을 선택하여 그 단어/표현을 받아 적습니다',
        '선생님이 선택한 블록의 단어/표현을 고른 학생들은 같이 읽어야 합니다',
        '블록을 클릭하세요',
        '학생들은 각 각 자신들이 얼마나 많은 별들을 획득했는지 기록합니다',
        '계속 반복하세요',
        '가장 많은 별을 가진 학생이 우승',
      ],
    },

    forStudents: {
      english: [
        'Choose and write one block',
        'Put your hands on your head when you are ready',
        'When Teacher points at your block, say it aloud',
        'Keep track of your stars',
        'Most stars wins',
      ],
      korean: [
        '블록 하나를 선택하여 그 단어/표현을 받아 적습니다',
        '다 적은 학생은 머리 위에 손을 올립니다',
        '선생님이 가리키는 블록의 단어/표현을 같이 소리내어 읽습니다',
        '여러분이 선택하여 적은 블록에서 "별"을 발견한다면, 개수를 기록하세요',
        '가장 많은 별을 획득한 학생이 우승',
      ],
    },
  },
};
