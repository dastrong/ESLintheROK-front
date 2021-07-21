import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/speed_solver', // you probably don't wanna edit this
  title: 'Speed Solver', // you probably don't wanna edit this
  description: 'Teamwork Solving Game',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941139/TeacherSite/Games/Speed_Solver.svg`,

  // SKILLS AND DATA
  skills: ['Listening', 'Reading', 'Speaking', 'Writing'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: true,

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
      key: ['1-0(10)'],
      description: 'Change the level (easiest: 1; hardest: 0(10))',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Group game',
        'Each group needs a whiteboard, marker and eraser',
        'Ss take turns writing the answer',
        'Leave the animation running until all groups have an answer written',
        'Walk around during that and help lower level groups',
        'Tell them to show you their boards',
        'Show them the answer',
        'Give points to the correct teams',
      ],
      korean: [
        '팀별 게임입니다.',
        '각 모둠(팀)은 화이트보드와 보드마커, 지우개 한 세트씩 가집니다.',
        '각 모둠의 학생들은 서로 번갈아가며 정답을 쓰면 됩니다.',
        '모든 학생들이 일단 답을 다 쓸 때까지 시간을 충분히 주세요.',
        '실력이 조금 달리는 모둠이 있다면, 돌아다니며 약간의 힌트를 줘도 됩니다. (답이 banana라면 한 두 글자정도만)',
        "답을 다 쓰면, '3, 2, 1, show me your boards'라고 하며 보드판을 들게 합니다.",
        '정답을 공개합니다.',
        '맞춘 팀에게 점수를 주세요.',
      ],
    },

    forStudents: {
      english: [
        'Group game',
        'Get a whiteboard, marker, and eraser',
        'Choose a writer',
        'Switch the writer every round',
        'Write what you see first and then unscramble it',
        'Figure out the word or sentence and write it down correctly',
        "Punctuation matters! ( ! ? . ' , )",
        'Most points win',
      ],
      korean: [
        '모둠 별 게임입니다.',
        '화이트보드 세트를 가져가세요. 각 모둠 별로 한 세트 씩',
        '매 라운드마다 정답을 기록하는 사람은 달라야합니다. (번갈아가며 정답을 쓰세요)',
        '일단 보이는 글자나 단어들을 다 쓰고 난 후, 재조합하여 정답을 쓰는 것을 추천합니다.',
        '이리저리 맞춰보고 정답을 쓰세요.',
        "문장을 쓰는 경우 '문장부호(! ? . ' ,)'는 꼭 써야합니다.",
        '가장 많은 점수를 획득한 모둠이 승리!',
      ],
    },
  },
};
