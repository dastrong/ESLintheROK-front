import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/sparkle_die', // you probably don't wanna edit this
  title: 'Sparkle Die', // you probably don't wanna edit this
  description: 'Popular Review Activity',
  image: {
    width: 394,
    height: 290,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking', 'Listening'],
  dataUsed: ['Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Refresh the game or pause the timer',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['Left-Arrow', 'Scroll Down'],
      description: 'Decrease the timer (min: 5s)',
    },
    {
      key: ['Right-Arrow', 'Scroll Up'],
      description: 'Increase the timer (max: 20s)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Students stand up and make a U or circle around the room',
        'Teacher picks the starting student and the direction',
        'Students must pay attention to the screen and memorize the sentence',
        'Once the timer runs out, the sentence will disappear',
        'Timer starts @ 10 secs. Use the left/right arrows to decrease/increase the timer',
        'Students take turns saying the next word in the sentence',
        'When the sentence is finished the next two words are "sparkle" "die"',
        'The next student sits down',
        '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
        'Repeat until you have 1-5 survivors left',
        'I tell the Ss before the game how many survivors there will be',
      ],
      korean: [
        '개인별 게임',
        '학생들은 교실 가운데를 중심으로 원이나 반원 형태로 섭니다',
        '선생님은 시작할 학생과 방향을 알려줍니다',
        '학생들은 스크린에 집중하여 해당 문장을 머리속에 기억합니다',
        '시간이 종료되면 그 문장은 자동적으로 사라집니다',
        '시간을 10초부터 카운트다운되며, 왼쪽/오른쪽 방향 화살표 키보드를 이용하여 시간을 줄이거나 늘릴 수 있음',
        '학생들은 순서대로 그 문장의 단어를 하나씩 읽습니다',
        '그 문장을 다 읽으면 그 다음 읽어야 하는 학생은 "Sparkle"이라고 읽고, 그 다음 학생은 "Die"라고 읽습니다',
        '"Die"를 읽은 학생 다음 사람은 자리에 앉습니다',
        '예)"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
        '1-5명의 학생이 살아남을 때 까지 반복합니다',
        '게임 시작 전, 몇 명의 학생이 살아남아야 하는지 말해주는 것도 좋습니다',
      ],
    },

    forStudents: {
      english: [
        'Stand up and make a U shape around the room',
        'Memorize the sentence',
        'Say only 1 word in the sentence',
        '"Can" "I" "sit" "here?"',
        'Next say "sparkle" "die"',
        '"Can" "I" "sit" "here?" "sparkle" "die"',
        'Next student sits down',
        '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
        'Last student standing wins',
      ],
      korean: [
        '모두 일어서서 교실 중심을 기준으로 반원 형태로 섭니다',
        '문장을 기억하세요',
        '그 문장의 단어 하나씩 말하세요',
        '예를 들어, ',
        '"Can" "I" "sit" "here?" 문장의 단어를 한 명이 하나씩 읽고',
        '다 읽고난 다음 학생들은 차례대로 "sparkle" "die"를 읽습니다',
        '"Can" "I" "sit" "here?" "sparkle" "die"',
        '"die"를 읽은 학생 다음 차례는 자리에 앉습니다',
        '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
        '마지막에 서있는 학생이 이깁니다',
      ],
    },
  },
};
