import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/chase_the_vocab', // you probably don't wanna edit this
  title: 'Chase The Vocab', // you probably don't wanna edit this
  description: '9 Card Monte',
  image: {
    width: 396,
    height: 172,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Speaking'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Start the moving animation',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['C'],
      description: 'Change the block color',
    },
    {
      key: ['1-9'],
      description: 'Change the difficulty (easiest: hardest 1,  9, : 1): 5)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Students need to focus on the screen',
        'Once the cards flip over they will start moving',
        'Students need to keep track of the cards',
        'When the cards stop moving, students can raise their hands',
        'Choose students to guess (ie. "1 tree" or "5 computer")',
        'If correct, you can reward them',
        'Repeat as desired',
        'You can switch from vocab to expressions using the left and right arrows',
        'Difficulty starts @ 5. Press 1-9 to change it. 1-easiest---9-hardest',
      ],
      korean: [
        '개인별 게임',
        '학생들은 스크린에 집중합니다',
        '카드들이 한 번 뒤집히면 카드들이 움직이기 시작합니다',
        '카드가 어떻게 움직이는지 잘 기억해야합니다',
        '카드가 움직이는 것을 멈추면, 학생들은 손을 들어',
        '"1 tree" 아니면 "5 computer" 이렇게 말하며 단어를 추측합니다',
        '정답일 경우, 보상을 해줍니다',
        '계속 반복할 수 있습니다',
        '왼쪽이나 오른쪽 방향키를 이용하여 단어 게임과 문장 게임을 모두 즐길 수 있습니다',
        '레벨은 총 9단계로, 1단계부터 가장 쉬움, 9단계는 가장 어려움 입니다',
      ],
    },

    forStudents: {
      english: [
        'Focus on the screen',
        'Pick some cards and follow them',
        'Raise your hand, when they stop',
        'Wait your turn',
        'Say the number and what is behind it',
        'Correct = reward',
      ],
      korean: [
        '스크린에 집중하세요',
        '카드를 선택한 후, 그 카드를 눈으로 쫓아가세요',
        '카드들이 멈추면, 손을 드세요.',
        '자기 차례가 올 때 까지 기다립니다. ',
        '카드 숫자를 말하고, 뒤에 적힌 것이 무엇인지 맞춰보세요.',
        '정답 = 보상',
      ],
    },
  },
};
