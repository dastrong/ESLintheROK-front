import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/word_lotto', // you probably don't wanna edit this
  title: 'Word Lotto', // you probably don't wanna edit this
  description: 'Most Points Wins',
  image: {
    width: 384,
    height: 211,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking', 'Writing'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Starts the game',
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
        'Students need a pencil',
        'Students need a Lotto WS or their notebook',
        'For Vocab: Choose 3 blocks and write them down',
        'For Expressions: Choose 1 block and write it down',
        'Count down aloud (start from 10)',
        'Click to reveal the correct answer',
        '1 block = 1 point',
        'Students mark down their points',
        'Repeat as desired',
        'Winner has the most points',
        'Personally as the game progresses, I like to increase how many points a block is worth',
      ],
      korean: [
        '개인별 게임',
        '학생들은 연필이 필요합니다',
        '학생들 모두 "로또 활동지"나 공책이 필요합니다',
        '"단어"게임일 경우, 세 단어를 선택하여 받아 적습니다',
        '"문장"게임일 경우, 하나의 문장을 선택하여 받아 적습니다',
        '10부터 카운트다운을 시작하세요',
        '학생들이 다 적으면, 스크린 아무 곳에나 클릭을 하세요',
        '1 블록 = 1점',
        '학생들은 자신들의 점수를 기록합니다',
        '반복 가능합니다',
        '가장 높은 점수를 가진 학생이 우승',
        '개인적으로는 게임이 진행되면, 블록의 점수를 높이기도 합니다',
      ],
    },

    forStudents: {
      english: [
        'Choose and write 1-3 blocks',
        'Put your hands on you head when you are ready',
        'When Teacher points at your block, say it aloud',
        'Keep track of your points',
        'Most points win',
      ],
      korean: [
        '1-3개의 블록을 선택하여 거기 적혀진 단어/표현을 적습니다',
        '다 적었으면 머리에 손을 올립니다',
        '만약 선생님이 여러분이 선택한 블록을 손가락으로 가리킨다면, 소리내어 읽습니다',
        '점수를 계속 기록하세요',
        '가장 많은 점수를 획득한 학생이 우승',
      ],
    },
  },
};
