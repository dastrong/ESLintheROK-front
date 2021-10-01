import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/nunchi', // you probably don't wanna edit this
  title: 'Nunchi', // you probably don't wanna edit this
  description: 'Stand Up and Speak',
  image: {
    width: 390,
    height: 254,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Expressions'],

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
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Have the students (Ss) kneel behind their chairs',
        'When Ss are quiet and ready, click to show a sentence',
        'Ss stand up and say a word in the sentence',
        'Ss can only say one word',
        'The words must be read in order',
        'If two Ss stand up and say the same word..',
        "1) They're out and they sit in their chairs",
        '2) The round is over. Click and Ss get ready again',
        'Once the class completes a sentence successfully, everyone resets',
        'I give a point to the groups of the Ss left standing',
        'It helps to encourage group cooperation and teamwork',
        'Group with the most points gets a prize',
      ],
      korean: [
        '학생들이 의자를 책상에 밀어 넣고, 의자 뒤에 쭈그리고 앉게 합니다',
        '학생들이 조용한 상태로 준비가 되면, 문장을 스크린에 띄웁니다',
        '학생들은 눈치를 보다가 문장의 단어들을 하나씩 차례대로 말하며 일어섭니다',
        '학생들은 반드시 개인 당 한 단어만 말할 수 있습니다',
        '단어들은 순서대로 읽혀야 합니다',
        '만약 두 학생이 같은 단어를 동시에 읽으며 일어섰다면 ',
        "1) '아웃'이 되며 의자를 책상에서 빼서 자리에 앉습니다",
        '2) 그리고 그 라운드는 끝난 것이므로, 다음 문장으로 넘어가며, 일어서있던 학생들은 다시 쭈그리고 앉습니다',
        '한 문장을 실패 없이 성공적으로 다 읽으면, 일어서 있는 학생이 속한 그룹은 점수를 얻습니다',
        '그리고 다시 다음 라운드를 준비합니다',
        '이렇게 하면 그룹 협동 활동이 가능하며, 협동심을 기를 수 있습니다',
        '가장 많은 점수를 획득한 그룹(모둠)이 이깁니다',
      ],
    },

    forStudents: {
      english: [
        'Crouch behind your chair',
        'Be quiet to start a round',
        'Stand up and say one word in the sentence',
        "If you say the same word as someone else, you're both out",
        'If you complete a sentence, each person gets one point for their team',
        'The group with the most points win',
      ],
      korean: [
        '모두 의자를 책상에 밀어넣고, 의자 뒤에 쭈그리고 앉습니다',
        '조용히 준비합니다',
        '문장이 스크린에 보이면, 눈치를 보다가 단어를 순서대로 말하며 일어섭니다',
        '단, 한 명당 단어를 하나만 말할 수 있고, 반드시 순서대로 말해야합니다',
        '만약 같은 단어를 말한 친구가 있다면, 둘 다 (셋 이상이 될 수도 있음) 아웃',
        '실패하지 않고 문장을 다 말하면, 일어서있는 친구들이 속한 모둠은 점수를 얻습니다',
        '가장 많은 점수를 획득한 모둠이 우승',
      ],
    },
  },
};
