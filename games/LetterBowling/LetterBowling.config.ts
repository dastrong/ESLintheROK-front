import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/letter_bowling', // you probably don't wanna edit this
  title: 'Letter Bowling', // you probably don't wanna edit this
  description: 'Word Puzzle Solving Game',
  image: `https://res.cloudinary.com/dastrong/image/upload/v1570941135/TeacherSite/Games/Letter_Bowling.svg`,

  // SKILLS AND DATA
  skills: ['Reading', 'Writing'],
  dataUsed: ['Vocabulary'],

  // BADGES - used on /games page
  attachURL: `https://pdfhost.io/v/9E@A@KTzx_Lined_Paper_No_Line_Numberspdf.pdf`,
  hasAudio: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Reveal the answer (by clicking the ???)',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['Left-Arrow'],
      description: 'Decrease the total rounds (min: 1)',
    },
    {
      key: ['Right-Arrow'],
      description: 'Increase the total rounds (max: 5)',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual, Pair, or Group Game',
        'Students need to focus on the screen',
        'They can write or memorize the letters as they appear',
        'Students need to unscramble the letters and figure out the word',
        'Pair/Group - write the word down',
        'Pair/Group - 1 point if that group is correct',
        'Pair/Group - most points wins',
        'Individual - put their hand up if they know. Teacher picks a student',
        'Individual - reward the student that is correct',
        'Repeat as desired',
        'Letters through will cyle rounds by : 1). Push the left/right arrows to decrease/increase the rounds',
      ],
      korean: [
        '개인별, 짝, 모둠 게임',
        '학생들은 스크린에 집중합니다',
        '스크린에 나타나는 글자들을 받아 적거나 기억하세요',
        '뒤죽박죽으로 꼬여있는 글자들을 원래 순서대로 만들어 정답인 단어를 맞춥니다',
        '짝/모둠 - 단어를 받아 적기',
        '짝/모둠 - 맞추는 경우 1점 획득',
        '짝/모둠 - 가장 높은 점수를 획득한 짝/모둠이 이깁니다',
        '개인별  - 정답을 알겠다는 학생이 손을 들면 정답을 맞추게 합니다',
        '개인별  - 정답일 경우 보상을 합니다',
        '계속 반복하세요',
        '글자들은 총 세 번 섞입니다. 왼쪽 방향키를 누르거나 오른쪽 방향키를 눌러서 라운드 수를 줄이거나 늘리세요',
      ],
    },

    forStudents: {
      english: [
        'Focus on the screen',
        'Memorize or write down the letters',
        'Unscramble the letters and make a word',
        'Put your hand up',
        'OR',
        'Write the word down',
        'Correct = reward/points',
      ],
      korean: [
        '스크린을 보고 집중하세요',
        '글자들을 보고 받아적거나 기억하세요',
        '글자들의 순서를 바꾸어 알맞은 단어를 만드세요',
        '다 한 학생은 손을 드세요',
        '아니면 ',
        '그 단어를 적으세요',
        '정답 = 보상/점수',
      ],
    },
  },
};
