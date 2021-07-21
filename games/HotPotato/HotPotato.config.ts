import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/hot_potato', // you probably don't wanna edit this
  title: 'Hot Potato', // you probably don't wanna edit this
  description: 'Pass the Ball Variation',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941136/TeacherSite/Games/Hot_Potato.svg`,

  // SKILLS AND DATA
  skills: ['Speaking', 'Reading'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: true,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Start/stop the music',
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
      key: ['1-3'],
      description:
        'Change the number of vocab (default: 3, only 1 sentence available)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Get a ball or something for the students (Ss) to pass',
        'The concept is the same as pass the ball',
        'When the music starts the Ss pass the ball around',
        'I suggest only allowing underhand passes',
        "Ss with the ball when the music stops says what's on the screen",
        'Repeat as desired',
      ],
      korean: [
        '학생들이 서로 주고 받을 수 있도록 부드러운 공을 하나 준비합니다',
        '패스 더 볼 게임과 비슷합니다',
        '음악이 시작되면 학생들은 공을 주고 받습니다',
        '공을 살살 던지도록 지도합니다',
        '음악이 멈추었을 때 공을 가진 학생은 스크린을 보고 해당하는 말을 합니다',
        '계속 반복 가능합니다',
      ],
    },

    forStudents: {
      english: [
        'Pass the ball to a student next to you',
        'Do NOT throw the ball',
        'Underhand passes only',
        "If you have the ball when the music stops, say what's on the screen",
      ],
      korean: [
        '공을 인접한 학생(앞/옆/뒤)에게 패스를 하세요',
        '절대! 공을 세게 던지지 않습니다',
        '살살 주고 받으세요',
        '음악이 멈출 때, 공을 가진 학생은 스크린에 나오는 단어나 표현을 읽으세요',
      ],
    },
  },
};
