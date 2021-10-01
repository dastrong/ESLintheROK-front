import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/red_and_blue', // you probably don't wanna edit this
  title: 'Red And Blue', // you probably don't wanna edit this
  description: 'Slap the correct color',
  image: {
    width: 383,
    height: 280,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Listening'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: `https://pdfhost.io/v/xklBo05Di_Red_and_Bluepdf.pdf`,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click', 'Space', 'Enter'],
      description: 'Next round',
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
        'Pair Game',
        'Print out enough red and blue worksheets for half of your class',
        'I suggest laminating them so they last longer',
        'Place evenly between the two students (Ss) desks',
        'I suggest Ss put a book under the sheet as padding also',
        'Ss put their hands up',
        'Review the two words on the screen',
        'Teacher says one word loudly',
        'Ss slap whichever color that word is',
        'First one gets a point',
        "If it's a tie, RPS",
        'Hands up and repeat',
        'Winner has the most points',
      ],
      korean: [
        '짝 활동 게임',
        '파랑 빨강 활동지를 전체 학생 수의 반 만큼 프린트하세요',
        '활동지를 코팅 처리하는 것을 추천합니다',
        '활동지를 두 학생 가운데 놓습니다',
        '활동지를 교과서 위에 올려놓고 게임을 하는 것을 추천합니다',
        '준비가 되면 학생들은 두 손을 머리 위로 올리고 대기합니다',
        '스크린에 제시되는 단어나 표현(파랑 빨강 칸 위에 표시됨)을 함께 복습합니다',
        '선생님은 그 두 단어/표현 중에서 하나를 골라 크게 말합니다',
        '학생들은 듣고 해당하는 단어나 표현에 재빨리 손을 내려놓습니다',
        '먼저 정답에 손을 올린 학생이 점수를 얻습니다',
        '만약 동시에 손을 올렸다면, 가위 바위 보를 해서 정합니다',
        '다시 머리에 손을 올리고 대기하며, 이렇게 반복을 합니다',
        '가장 많은 점수를 획득한 학생이 우승',
      ],
    },

    forStudents: {
      english: [
        'Put your hands on your head',
        'Listen to the teacher',
        'Slap the correct color',
        'Winner gets a point',
        'Tied? RPS.',
        'No cheating. Keep your hands up until the word is said.',
        'Most points win',
      ],
      korean: [
        '머리에 손을 올리세요',
        '선생님이 하는 말을 잘 들으세요',
        '단어나 표현을 듣고 그 단어나 표현이 표시된 알맞은 색깔 칸에 손을 재발리 내려놓습니다',
        '먼저 내려 놓은 사람이 점수를 얻습니다',
        '만약 동시에 내려놓았다면, 가위 바위 보로 정합니다',
        '반칙 안되고, 선생님이 단어를 말할 때 까지 머리 위에 올린 손을 절대 뗴지 않습니다',
        '가장 많은 점수를 획득한 학생이 승리',
      ],
    },
  },
};
