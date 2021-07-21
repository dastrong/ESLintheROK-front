import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/matching', // you probably don't wanna edit this
  title: 'Matching', // you probably don't wanna edit this
  description: 'Find All The Pairs',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941133/TeacherSite/Games/Matching.svg`,

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Show the word',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['Left-Arrow', 'Scroll Down'],
      description: 'Decrease the number of boxes (min: 6)',
    },
    {
      key: ['Right-Arrow', 'Scroll Up'],
      description: 'Increase the number of boxes (max: 16)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Students raise their hand and take turns trying to match two cards',
        "If the cards don't match they'll automatically flip back",
        "If there's an odd number of cards, there will be 1 'poo' card",
        "If a Ss gets the 'poo' card they lose their turn",
        'If a student matches two cards, you can reward them',
        'Check out the options to learn how to change the number of cards',
      ],
      korean: [
        '개인별 게임',
        '학생들은 손을 들고, 자신이 지목되면 뒤집혀진 카드 중 두 장을 고르며 숫자를 말하고, 카드의 짝을 찾습니다',
        '카드 짝이 맞지 않으면 자동적으로 다시 카드는 뒤집힙니다',
        "만약 전체 카드 수가 짝수가 아닌 홀수라면, 그 카드 중에서 한 장은 '응가'카드입니다",
        "만약 '응가'카드를 뒤집은 학생이 나오면, 바로 꽝, 다른 사람에게 기회를 줍니다",
        '짝을 맞춘 학생이 나오면, 적절한 보상을 해줍니다',
        "우측 상단에 마우스를 갖다 놓으면 나타나는 '?' 도움말을 클릭하여 카드 수를 늘리거나 줄일 수 있습니다",
      ],
    },

    forStudents: {
      english: [
        'Raise your hand',
        'Wait your turn',
        'Read two blocks',
        'Match? = reward',
        'Poo? = lose your turn',
      ],
      korean: [
        '손을 드세요',
        '선생님이 지목한 학생은',
        '카드 두 장을 골라 숫자를 말합니다',
        '짝이 맞으면, 점수!',
        "만약 '응가'카드를 뽑으면, 즉시 다른 사람에게 기회가 돌아갑니다",
      ],
    },
  },
};
