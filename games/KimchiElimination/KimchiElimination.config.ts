import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/kimchi_elimination', // you probably don't wanna edit this
  title: 'Kimchi Elimination', // you probably don't wanna edit this
  description: 'Baskin Robbins 31 Variation',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941137/TeacherSite/Games/Kimchi.svg`,

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Expressions'],

  // BADGES - used on /games page
  attachURL: ``,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Next slide',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['Right-Arrow', 'Scroll Up'],
      description: 'Increase kimchi frequency',
    },
    {
      key: ['Left-Arrow', 'Scroll Down'],
      description: 'Decrease kimchi frequency',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual Game',
        'Every student starts the game standing',
        'Students take turns reading 1, 2 or 3 words of the sentence',
        '"What" "did" "you" "do" "last" "summer?"',
        '"What did" "you" "do" "last summer?"',
        '"What did you" "do" "last summer?"',
        'The next student..',
        'Poo = sit down',
        'Kimchi = stay standing',
        'The last student standing wins',
        'Let the class know who the first and last students are',
        'I like to zig zag through the rows then return to the first student',
        'You can switch from vocab to expressions using the left and right arrows',
        'Similar to Baskin Robbins 31',
        'Kimchi appear 90% of the time. Use the left/right arrows to decrease/increase the frequency of kimchi',
      ],
      korean: [
        '개인별 게임',
        '모두 일어선 상태로 게임을 시작합니다',
        '각 학생들은 1-3개의 단어를 읽을 수 있습니다',
        '"What" "did" "you" "do" "last" "summer?"',
        '"What did" "you" "do" "last summer?"',
        '"What did you" "do" "last summer?"',
        '다음 학생이',
        '똥(poo)단어를 읽게 되면 자리에 앉습니다',
        '김치(kimchi)단어를 읽게 되면 그대로 서 있습니다',
        '가장 마지막까지 서있는 학생이 이깁니다',
        '처음 시작하는 학생과 마지막 차례가 누구인지 알려줍니다',
        'ㄹ자 형태로 순서를 진행하는 것을 추천합니다',
        '왼쪽 방향키와 오른쪽 방향키를 눌러서 단어 게임 혹은 문장 게임으로 전환할 수 있습니다',
        '베스킨 로빈스 31 게임과 유사합니다',
        '90퍼센트 이상은 김치가 나타납니다. 왼쪽 혹은 오른쪽 방향키를 이용해 김치가 나타날 확율을 조정할 수 있습니다',
      ],
    },

    forStudents: {
      english: [
        'Everyone stands up',
        'Read 1 word',
        '"What" "did" "you" "do" "last" "summer?"',
        'Read 2 words',
        '"What did" "you" "do" "last summer?"',
        'Or 3 word',
        '"What did you" "do" "last summer?"',
        'The next student..',
        '"What did you" "do" "last summer?" "????"',
        'Poo = sit down',
        'Kimchi = stay standing',
        'Last student standing wins',
      ],
      korean: [
        '모두 일어서세요',
        '단어를 하나씩 읽을 경우',
        '"What" "did" "you" "do" "last" "summer?"',
        '단어를 두 개씩 읽을 경우',
        '"What did" "you" "do" "last summer?"',
        '아니면 단어를 세 개씩 읽을 경우엔',
        '"What did you" "do" "last summer?"',
        '마지막 단어를 읽은 학생 다음은',
        '"What did you" "do" "last summer?" "????"',
        '똥(poo)를 읽으며 자리에 앉습니다',
        '만약 똥이 아닌 김치(kimchi)단어가 나타나면 서 있습니다',
        '마지막까지 서 있는 학생이 우승',
      ],
    },
  },
};
