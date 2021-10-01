import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/cowboy', // you probably don't wanna edit this
  title: 'Cowboy', // you probably don't wanna edit this
  description: 'Duel Reading Game',
  image: {
    width: 343,
    height: 205,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click', 'Space', 'Enter'],
      description: 'Next slide',
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
        'Individual or Team Game',
        'I prefer to make two lines (teams), so all Ss are up and we can go through quickly',
        'Have 2 Ss at the front, facing away from the TV screen',
        'When they hear a gunshot, spin around and say what they see on the screen',
        'Whoever says it correctly first, gets a point.',
        'They can play RPS to break a tie, if needed.',
        'Since they need to hear the gunshot, make sure the class is quiet before each round',
        "You should teach the idiom 'on your marks' before starting the game too",
        'Try to match up Ss with a similar level, so your lower levels have a chance',
        'Team with the most points wins',
      ],
      korean: [
        '개인별 혹 팀별 게임이 가능합니다.',
        '개인적으로는 반 전체를 두 팀으로 나눠서 진행하는 것을 추천합니다. 게임 진행이 빨라집니다.',
        '각 팀의 맨 앞에 선 학생들(첫 번째 주자)이 앞으로 나오고, TV화면을 등지고 섭니다.',
        '총소리가 들리면 첫 번째 주자들은 TV화면을 보며 단어/문장을 읽습니다. ',
        '먼저 바르게 외치는 사람이 점수를 얻습니다.',
        '만약 동시에 외쳤다면, 가위 바위 보로 승자를 결정합니다. ',
        '총소리를 들어야 가능한 게임이기 때문에, 다른 학생들이 조용하도록 분위기를 조성합니다.',
        "'on your marks'라는 어구를 학생들에게 가르쳐서, 총소리 전에 이 어구를 들려줌으로 학생들이 미리 마음의 준비를 할 수 있도록 합니다.",
        '최대한 두 팀은 비슷한 실력이 되도록 인원을 조정하세요. 서투른 학생들도 기회를 가질 수 있도록 말이죠.',
        '더 많은 점수를 얻은 팀이 승리!',
      ],
    },

    forStudents: {
      english: [
        'Face away from the screen',
        'Listen for the gunshot',
        'Spin and read aloud',
        "If it's a tie, play RPS",
        'Winner gets a point',
      ],
      korean: [
        '각 팀의 대표 주자들은 TV화면을 등지고 서주세요.',
        '총소리에 귀 귀울여 주세요.',
        '총소리가 들리면 재빨리 돌아서 TV화면에 있는 단어나 문장을 외칩니다.',
        '먼저 외치면 이기지만, 동시에 외친다면 가위 바위 보로 승자를 정하세요.',
        '승자는 점수를 가져갑니다.',
      ],
    },
  },
};
