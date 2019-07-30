import Elimination from "../components/games/Elimination";
import Stars from "../components/games/Stars";
import WhatsBehind from "../components/games/WhatsBehind";
import WordLotto from "../components/games/WordLotto";
import Sparkle from "../components/games/Sparkle";
import Kimchi from "../components/games/Kimchi";
import Bowling from "../components/games/Bowling";
import ChaseTheVocab from "../components/games/ChaseTheVocab";
import RedAndBlue from "../components/games/RedAndBlue";
import HotPotato from "../components/games/HotPotato";
import Nunchi from "../components/games/Nunchi";
import Matching from "../components/games/Matching";
import BattleGround from "../components/games/BattleGround";

export default [
  {
    router: {
      path: "/game/elimination",
      component: Elimination,
      icon: "x",
    },
    info: {
      title: "Elimination Game",
      skills: ["Reading", "Speaking"],
      dataUsed: ["Vocabulary", "Expressions"],
      description: "Last Student Standing Game",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Elimination.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Elimination.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Spin a block" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Up"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Down"],
        description: "Refresh the game and use expressions",
      },
      { key: "1-5", description: "Change the number of X's (default: 3)" },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Every student starts the game standing",
          "Students take turns reading a block",
          "Click that block",
          "X = sit down",
          "O = stay standing",
          "Last student standing wins",
          "Let the class know who the first and last students are",
          "I like to zig zag through the rows then return to the first student",
          "You can switch from vocab to expressions using the left and right arrows",
        ],
        korean: [
          "개인별 게임",
          "모두 일어선 상태로 게임을 시작합니다",
          "한 명씩 하나의 블록 안에 있는 단어/문장을 읽습니다",
          "그리고 그 블록을 클릭합니다",
          "X = 앉기",
          "O = 그대로 서 있기",
          "끝까지 살아서 서있는 사람이 우승!",
          "처음 시작한 사람과 마지막 차례가 누군지 알려주세요",
          '처음 학생 다음 순서는 오른쪽 학생, 즉 반 전체를 봤을 때, "ㄹ"형태로 진행합니다',
          "<- 키보드를 누르면 단어, -> 키보드를 누르면 표현(문장)입니다",
        ],
      },
      forStudents: {
        english: [
          "Everyone stands up",
          "Read a block",
          "X = sit down",
          "O = stay standing",
          "Last student standing wins",
        ],
        korean: [
          "모두 일어섯",
          "블록 안의 단어/표현을 읽으세요",
          "X = 앉기",
          "O = 일어서 있기",
          "가장 마지막까지 서있는 사람이 우승",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/whatsbehind",
      component: WhatsBehind,
      icon: "find",
    },
    info: {
      title: "What's Behind",
      skills: ["Reading", "Speaking"],
      dataUsed: ["Vocabulary", "Expressions"],
      description: "Find the Hidden Item",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/What_s_Behind.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/What_s_Behind.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Spin a block" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Up"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Down"],
        description: "Refresh the game and use expressions",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Choose a student to read a block",
          "Click the block the student said",
          "If a trophy appears reward that student",
          "Continue until someone finds the trophy",
          "When the trophy is found a GIF will appear",
          "Reward student however you want, I give a stamp",
          "Repeat as desired",
        ],
        korean: [
          "개인별 게임",
          "한 학생이 블록 안의 단어/표현을 읽게 합니다",
          "그 읽은 블록을 클릭합니다",
          "트로피가 나오면 보상해줍니다",
          "누군가가 트로피를 발견할 때까지 계속 진행합니다",
          '트로피가 나타나면 "움직이는 사진"이 나타납니다',
          "당신이 원하는 방식으로 보상을 해주세요 (저는 도장을 하나 줍니다)",
          "계속 반복하시면 됩니다",
        ],
      },
      forStudents: {
        english: ["Raise your hand", "Wait your turn", "Read a block", "Trophy = reward"],
        korean: [
          "손을 드세요",
          "당신의 차례를 기다리세요",
          "블록 안의 단어/표현을 읽으세요",
          "트로피 = 보상",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/stars",
      component: Stars,
      icon: "star",
    },
    info: {
      title: "Stars Writing Game",
      skills: ["Reading", "Speaking", "Writing"],
      dataUsed: ["Vocabulary", "Expressions"],
      description: "Most Stars Wins",
      attachments: true,
      attachURL: "https://pdfhost.io/v/Gx02X0gIh_Stars_Gamepdf.pdf",
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Stars.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Stars.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Spin a block" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Up"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Down"],
        description: "Refresh the game and use expressions",
      },
      {
        key: "0-5",
        description: "Change the minimum number of stars for a block (default: 0)",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students need a pencil",
          "Students need a Stars WS or their notebook",
          "Students choose a block and write it down",
          "Point at a block and the students that chose it should say it together",
          "Click that block",
          "Students should mark down how many stars they got",
          "Repeat as desired",
          "Winner has the most stars",
        ],
        korean: [
          "개인별 게임",
          "학생들은 연필이 필요합니다",
          "모두 활동지나 자신들의 공책이 필요합니다",
          "학생들이 블록을 선택하여 그 단어/표현을 받아 적습니다",
          "선생님이 선택한 블록의 단어/표현을 고른 학생들은 같이 읽어야 합니다",
          "블록을 클릭하세요",
          "학생들은 각 각 자신들이 얼마나 많은 별들을 획득했는지 기록합니다",
          "계속 반복하세요",
          "가장 많은 별을 가진 학생이 우승",
        ],
      },
      forStudents: {
        english: [
          "Choose and write one block",
          "Put your hands on your head when you are ready",
          "When Teacher points at your block, say it aloud",
          "Keep track of your stars",
          "Most stars wins",
        ],
        korean: [
          "블록 하나를 선택하여 그 단어/표현을 받아 적습니다",
          "다 적은 학생은 머리 위에 손을 올립니다",
          "선생님이 가리키는 블록의 단어/표현을 같이 소리내어 읽습니다",
          '여러분이 선택하여 적은 블록에서 "별"을 발견한다면, 개수를 기록하세요',
          "가장 많은 별을 획득한 학생이 우승",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/lotto",
      component: WordLotto,
      icon: "won",
    },
    info: {
      title: "Word Lotto",
      skills: ["Reading", "Speaking", "Writing"],
      dataUsed: ["Vocabulary", "Expressions"],
      description: "Most Points Wins",
      attachments: true,
      attachURL: "https://pdfhost.io/v/z9IV0yVsd_Lotto_Game_Bothpdf.pdf",
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Lotto.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Lotto.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Starts the game" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Up"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Down"],
        description: "Refresh the game and use expressions",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students need a pencil",
          "Students need a Lotto WS or their notebook",
          "For Vocab: Choose 3 blocks and write them down",
          "For Expressions: Choose 1 block and write it down",
          "Count down aloud (start from 10)",
          "Click to reveal the correct answer",
          "1 block = 1 point",
          "Students mark down their points",
          "Repeat as desired",
          "Winner has the most points",
          "Personally as the game progresses, I like to increase how many points a block is worth",
        ],
        korean: [
          "개인별 게임",
          "학생들은 연필이 필요합니다",
          '학생들 모두 "로또 활동지"나 공책이 필요합니다',
          '"단어"게임일 경우, 세 단어를 선택하여 받아 적습니다',
          '"문장"게임일 경우, 하나의 문장을 선택하여 받아 적습니다',
          "10부터 카운트다운을 시작하세요",
          "학생들이 다 적으면, 스크린 아무 곳에나 클릭을 하세요",
          "1 블록 = 1점",
          "학생들은 자신들의 점수를 기록합니다",
          "반복 가능합니다",
          "가장 높은 점수를 가진 학생이 우승",
          "개인적으로는 게임이 진행되면, 블록의 점수를 높이기도 합니다",
        ],
      },
      forStudents: {
        english: [
          "Choose and write 1-3 blocks",
          "Put your hands on you head when you are ready",
          "When Teacher points at your block, say it aloud",
          "Keep track of your points",
          "Most points wins",
        ],
        korean: [
          "1-3개의 블록을 선택하여 거기 적혀진 단어/표현을 적습니다",
          "다 적었으면 머리에 손을 올립니다",
          "만약 선생님이 여러분이 선택한 블록을 손가락으로 가리킨다면, 소리내어 읽습니다",
          "점수를 계속 기록하세요",
          "가장 많은 점수를 획득한 학생이 우승",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/sparkle",
      component: Sparkle,
      icon: "diamond",
    },
    info: {
      title: "Sparkle Die",
      skills: ["Reading", "Speaking", "Listening"],
      dataUsed: ["Expressions"],
      description: "Popular Review Activity",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Sparkle_Die.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Sparkle_Die.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Refresh the game or pause the timer" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Down"],
        description: "Decrease the timer (min: 5s)",
      },
      {
        key: ["Right-Arrow", "Scroll Up"],
        description: "Increase the timer (max: 20s)",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students stand up and make a U or circle around the room",
          "Teacher picks the starting student and the direction",
          "Students must pay attention to the screen and memorize the sentence",
          "Once the timer runs out, the sentence will disappear",
          "Timer starts @ 10 secs. Use the left/right arrows to decrease/increase the timer",
          "Students take turns saying the next word in the sentence",
          'When the sentence is finished the next two words are "sparkle" "die"',
          "The next student sits down",
          '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
          "Repeat until you have 1-5 survivors left",
          "I tell the Ss before the game how many survivors there will be",
        ],
        korean: [
          "개인별 게임",
          "학생들은 교실 가운데를 중심으로 원이나 반원 형태로 섭니다",
          "선생님은 시작할 학생과 방향을 알려줍니다",
          "학생들은 스크린에 집중하여 해당 문장을 머리속에 기억합니다",
          "시간이 종료되면 그 문장은 자동적으로 사라집니다",
          "시간을 10초부터 카운트다운되며, 왼쪽/오른쪽 방향 화살표 키보드를 이용하여 시간을 줄이거나 늘릴 수 있음",
          "학생들은 순서대로 그 문장의 단어를 하나씩 읽습니다",
          '그 문장을 다 읽으면 그 다음 읽어야 하는 학생은 "Sparkle"이라고 읽고, 그 다음 학생은 "Die"라고 읽습니다',
          '"Die"를 읽은 학생 다음 사람은 자리에 앉습니다',
          '예)"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
          "1-5명의 학생이 살아남을 때 까지 반복합니다",
          "게임 시작 전, 몇 명의 학생이 살아남아야 하는지 말해주는 것도 좋습니다",
        ],
      },
      forStudents: {
        english: [
          "Stand up and make a U shape around the room",
          "Memorize the sentence",
          "Say only 1 word in the sentence",
          '"Can" "I" "sit" "here?"',
          'Next say "sparkle" "die"',
          '"Can" "I" "sit" "here?" "sparkle" "die"',
          "Next student sits down",
          '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
          "Last student standing wins",
        ],
        korean: [
          "모두 일어서서 교실 중심을 기준으로 반원 형태로 섭니다",
          "문장을 기억하세요",
          "그 문장의 단어 하나씩 말하세요",
          "예를 들어, ",
          '"Can" "I" "sit" "here?" 문장의 단어를 한 명이 하나씩 읽고',
          '다 읽고난 다음 학생들은 차례대로 "sparkle" "die"를 읽습니다',
          '"Can" "I" "sit" "here?" "sparkle" "die"',
          '"die"를 읽은 학생 다음 차례는 자리에 앉습니다',
          '"Can" "I" "sit" "here?" "sparkle" "die" "ㅠㅠ"',
          "마지막에 서있는 학생이 이깁니다",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/bowling",
      component: Bowling,
      icon: "bowling ball",
    },
    info: {
      title: "Letter Bowling",
      skills: ["Reading", "Writing"],
      dataUsed: ["Vocabulary"],
      description: "Word Puzzle Solving Game",
      attachments: true,
      attachURL: "https://pdfhost.io/v/9E@A@KTzx_Lined_Paper_No_Line_Numberspdf.pdf",
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Letter_Bowling.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Letter_Bowling.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Reveal the answer (by clicking the ???)" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      { key: "Left-Arrow", description: "Decrease the total rounds (min: 1)" },
      { key: "Right-Arrow", description: "Increase the total rounds (max: 5)" },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual, Pair, or Group Game",
          "Students need to focus on the screen",
          "They can write or memorize the letters as they appear",
          "Students need to unscramble the letters and figure out the word",
          "Pair/Group - write the word down",
          "Pair/Group - 1 point if that group is correct",
          "Pair/Group - most points wins",
          "Individual - put their hand up if they know. Teacher picks a student",
          "Individual - reward the student that is correct",
          "Repeat as desired",
          "Letters will cycle through 3 rounds by default. Push the left/right arrows to decrease/increase the rounds",
        ],
        korean: [
          "개인별, 짝, 모둠 게임",
          "학생들은 스크린에 집중합니다",
          "스크린에 나타나는 글자들을 받아 적거나 기억하세요",
          "뒤죽박죽으로 꼬여있는 글자들을 원래 순서대로 만들어 정답인 단어를 맞춥니다",
          "짝/모둠 - 단어를 받아 적기",
          "짝/모둠 - 맞추는 경우 1점 획득",
          "짝/모둠 - 가장 높은 점수를 획득한 짝/모둠이 이깁니다",
          "개인별  - 정답을 알겠다는 학생이 손을 들면 정답을 맞추게 합니다",
          "개인별  - 정답일 경우 보상을 합니다",
          "계속 반복하세요",
          "글자들은 총 세 번 섞입니다. 왼쪽 방향키를 누르거나 오른쪽 방향키를 눌러서 라운드 수를 줄이거나 늘리세요",
        ],
      },
      forStudents: {
        english: [
          "Focus on the screen",
          "Memorize or write down the letters",
          "Unscramble the letters and make a word",
          "Put your hand up",
          "OR",
          "Write the word down",
          "Correct = reward/points",
        ],
        korean: [
          "스크린을 보고 집중하세요",
          "글자들을 보고 받아적거나 기억하세요",
          "글자들의 순서를 바꾸어 알맞은 단어를 만드세요",
          "다 한 학생은 손을 드세요",
          "아니면 ",
          "그 단어를 적으세요",
          "정답 = 보상/점수",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/kimchi",
      component: Kimchi,
      icon: "heart",
    },
    info: {
      title: "Kimchi Elimination",
      skills: ["Reading", "Speaking"],
      dataUsed: ["Expressions"],
      description: "Baskin Robbins 31 Variation",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Kimchi.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Kimchi.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Next slide" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Right-Arrow", "Scroll Up"],
        description: "Increase kimchi frequency",
      },
      {
        key: ["Left-Arrow", "Scroll Down"],
        description: "Decrease kimchi frequency",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Every student starts the game standing",
          "Students take turns reading 1, 2 or 3 words of the sentence",
          '"What" "did" "you" "do" "last" "summer?"',
          '"What did" "you" "do" "last summer?"',
          '"What did you" "do" "last summer?"',
          "The next student..",
          "Poo = sit down",
          "Kimchi = stay standing",
          "The last student standing wins",
          "Let the class know who the first and last students are",
          "I like to zig zag through the rows then return to the first student",
          "You can switch from vocab to expressions using the left and right arrows",
          "Similar to Baskin Robbins 31",
          "Kimchi appear 90% of the time. Use the left/right arrows to decrease/increase the frequency of kimchi",
        ],
        korean: [
          "개인별 게임",
          "모두 일어선 상태로 게임을 시작합니다",
          "각 학생들은 1-3개의 단어를 읽을 수 있습니다",
          '"What" "did" "you" "do" "last" "summer?"',
          '"What did" "you" "do" "last summer?"',
          '"What did you" "do" "last summer?"',
          "다음 학생이",
          "똥(poo)단어를 읽게 되면 자리에 앉습니다",
          "김치(kimchi)단어를 읽게 되면 그대로 서 있습니다",
          "가장 마지막까지 서있는 학생이 이깁니다",
          "처음 시작하는 학생과 마지막 차례가 누구인지 알려줍니다",
          "ㄹ자 형태로 순서를 진행하는 것을 추천합니다",
          "왼쪽 방향키와 오른쪽 방향키를 눌러서 단어 게임 혹은 문장 게임으로 전환할 수 있습니다",
          "베스킨 로빈스 31 게임과 유사합니다",
          "90퍼센트 이상은 김치가 나타납니다. 왼쪽 혹은 오른쪽 방향키를 이용해 김치가 나타날 확율을 조정할 수 있습니다",
        ],
      },
      forStudents: {
        english: [
          "Everyone stands up",
          "Read 1 word",
          '"What" "did" "you" "do" "last" "summer?"',
          "Read 2 words",
          '"What did" "you" "do" "last summer?"',
          "Or 3 word",
          '"What did you" "do" "last summer?"',
          "The next student..",
          '"What did you" "do" "last summer?" "????"',
          "Poo = sit down",
          "Kimchi = stay standing",
          "Last student standing wins",
        ],
        korean: [
          "모두 일어서세요",
          "단어를 하나씩 읽을 경우",
          '"What" "did" "you" "do" "last" "summer?"',
          "단어를 두 개씩 읽을 경우",
          '"What did" "you" "do" "last summer?"',
          "아니면 단어를 세 개씩 읽을 경우엔",
          '"What did you" "do" "last summer?"',
          "마지막 단어를 읽은 학생 다음은",
          '"What did you" "do" "last summer?" "????"',
          "똥(poo)를 읽으며 자리에 앉습니다",
          "만약 똥이 아닌 김치(kimchi)단어가 나타나면 서 있습니다",
          "마지막까지 서 있는 학생이 우승",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/chase",
      component: ChaseTheVocab,
      icon: "exchange",
    },
    info: {
      title: "Chase the Vocab",
      skills: ["Speaking"],
      dataUsed: ["Vocabulary"],
      description: "9 Card Monte",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Chase_the_Vocab.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Chase_the_Vocab.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Start the moving animation" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      { key: "C", description: "Change the block color" },
      {
        key: "1-9",
        description: "Change the difficulty (easiest: 1, hardest: 9, default: 5)",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students need to focus on the screen",
          "Once the cards flip over they will start moving",
          "Students need to keep track of the cards",
          "When the cards stop moving, students can raise their hands",
          'Choose students to guess (ie. "1 tree" or "5 computer")',
          "If correct, you can reward them",
          "Repeat as desired",
          "You can switch from vocab to expressions using the left and right arrows",
          "Difficulty starts @ 5. Press 1-9 to change it. 1-easiest---9-hardest",
        ],
        korean: [
          "개인별 게임",
          "학생들은 스크린에 집중합니다",
          "카드들이 한 번 뒤집히면 카드들이 움직이기 시작합니다",
          "카드가 어떻게 움직이는지 잘 기억해야합니다",
          "카드가 움직이는 것을 멈추면, 학생들은 손을 들어",
          '"1 tree" 아니면 "5 computer" 이렇게 말하며 단어를 추측합니다',
          "정답일 경우, 보상을 해줍니다",
          "계속 반복할 수 있습니다",
          "왼쪽이나 오른쪽 방향키를 이용하여 단어 게임과 문장 게임을 모두 즐길 수 있습니다",
          "레벨은 총 9단계로, 1단계부터 가장 쉬움, 9단계는 가장 어려움 입니다",
        ],
      },
      forStudents: {
        english: [
          "Focus on the screen",
          "Pick some cards and follow them",
          "Raise your hand, when they stop",
          "Wait your turn",
          "Say the number and what is behind it",
          "Correct = reward",
        ],
        korean: [
          "스크린에 집중하세요",
          "카드를 선택한 후, 그 카드를 눈으로 쫓아가세요",
          "카드들이 멈추면, 손을 드세요.",
          "자기 차례가 올 때 까지 기다립니다. ",
          "카드 숫자를 말하고, 뒤에 적힌 것이 무엇인지 맞춰보세요.",
          "정답 = 보상",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/redblue",
      component: RedAndBlue,
      icon: "road",
    },
    info: {
      title: "Red and Blue",
      skills: ["Listening"],
      dataUsed: ["Vocabulary"],
      description: "Slap the Correct Color",
      attachments: true,
      attachURL: "https://pdfhost.io/v/xklBo05Di_Red_and_Bluepdf.pdf",
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Red_and_Blue.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Red_and_Blue.png",
      },
    },
    keyCuts: [
      {
        key: ["Left-Click", "Space", "Enter"],
        description: "Next round",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Pair Game",
          "Print out enough red and blue worksheets for half of your class",
          "I suggest laminating them so they last longer",
          "Place evenly between the two students (Ss) desks",
          "I suggest Ss put a book under the sheet as padding also",
          "Ss put their hands up",
          "Review the two words on the screen",
          "Teacher says one word loudly",
          "Ss slap whichever color that word is",
          "First one gets a point",
          "If it's a tie, RPS",
          "Hands up and repeat",
          "Winner has the most points",
        ],
        korean: [
          "짝 활동 게임",
          "파랑 빨강 활동지를 전체 학생 수의 반 만큼 프린트하세요",
          "활동지를 코팅 처리하는 것을 추천합니다",
          "활동지를 두 학생 가운데 놓습니다",
          "활동지를 교과서 위에 올려놓고 게임을 하는 것을 추천합니다",
          "준비가 되면 학생들은 두 손을 머리 위로 올리고 대기합니다",
          "스크린에 제시되는 단어나 표현(파랑 빨강 칸 위에 표시됨)을 함께 복습합니다",
          "선생님은 그 두 단어/표현 중에서 하나를 골라 크게 말합니다",
          "학생들은 듣고 해당하는 단어나 표현에 재빨리 손을 내려놓습니다",
          "먼저 정답에 손을 올린 학생이 점수를 얻습니다",
          "만약 동시에 손을 올렸다면, 가위 바위 보를 해서 정합니다",
          "다시 머리에 손을 올리고 대기하며, 이렇게 반복을 합니다",
          "가장 많은 점수를 획득한 학생이 우승",
        ],
      },
      forStudents: {
        english: [
          "Put your hands on your head",
          "Listen to the teacher",
          "Slap the correct color",
          "Winner gets a point",
          "Tied? RPS.",
          "No cheating. Keep your hands up until the word is said.",
          "Most points wins",
        ],
        korean: [
          "머리에 손을 올리세요",
          "선생님이 하는 말을 잘 들으세요",
          "단어나 표현을 듣고 그 단어나 표현이 표시된 알맞은 색깔 칸에 손을 재발리 내려놓습니다",
          "먼저 내려 놓은 사람이 점수를 얻습니다",
          "만약 동시에 내려놓았다면, 가위 바위 보로 정합니다",
          "반칙 안되고, 선생님이 단어를 말할 때 까지 머리 위에 올린 손을 절대 뗴지 않습니다",
          "가장 많은 점수를 획득한 학생이 승리",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/hotpotato",
      component: HotPotato,
      icon: "fire",
    },
    info: {
      title: "Hot Potato",
      skills: ["Speaking", "Reading"],
      dataUsed: ["Vocabulary, Expressions"],
      description: "Pass the Ball Variation",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Hot_Potato.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Hot_Potato.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Start/stop the music" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Down"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Up"],
        description: "Refresh the game and use expressions",
      },
      {
        key: "1-3",
        description: "Change the number of vocab (default: 3, only 1 sentence available)",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Get a ball or something for the students (Ss) to pass",
          "The concept is the same as pass the ball",
          "When the music starts the Ss pass the ball around",
          "I suggest only allowing underhand passes",
          "Ss with the ball when the music stops says what's on the screen",
          "Repeat as desired",
        ],
        korean: [
          "학생들이 서로 주고 받을 수 있도록 부드러운 공을 하나 준비합니다",
          "패스 더 볼 게임과 비슷합니다",
          "음악이 시작되면 학생들은 공을 주고 받습니다",
          "공을 살살 던지도록 지도합니다",
          "음악이 멈추었을 때 공을 가진 학생은 스크린을 보고 해당하는 말을 합니다",
          "계속 반복 가능합니다",
        ],
      },
      forStudents: {
        english: [
          "Pass the ball to a student next to you",
          "Do NOT throw the ball",
          "Underhand passes only",
          "If you have the ball when the music stops, say what's on the screen",
        ],
        korean: [
          "공을 인접한 학생(앞/옆/뒤)에게 패스를 하세요",
          "절대! 공을 세게 던지지 않습니다",
          "살살 주고 받으세요",
          "음악이 멈출 때, 공을 가진 학생은 스크린에 나오는 단어나 표현을 읽으세요",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/nunchi",
      component: Nunchi,
      icon: "talk",
    },
    info: {
      title: "Nunchi Game",
      skills: ["Speaking", "Reading"],
      dataUsed: ["Expressions"],
      description: "Stand Up and Speak",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Nunchi.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Nunchi.png",
      },
    },
    keyCuts: [
      {
        key: ["Left-Click", "Space", "Enter"],
        description: "Next slide",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Have the students (Ss) kneel behind their chairs",
          "When Ss are quiet and ready, click to show a sentence",
          "Ss stand up and say a word in the sentence",
          "Ss can only say one word",
          "The words must be read in order",
          "If two Ss stand up and say the same word..",
          "1) They're out and they sit in their chairs",
          "2) The round is over. Click and Ss get ready again",
          "Once the class completes a sentence successfully, everyone resets",
          "I give a point to the groups of the Ss left standing",
          "It helps to encourage group cooperation and teamwork",
          "Group with the most points gets a prize",
        ],
        korean: [
          "학생들이 의자를 책상에 밀어 넣고, 의자 뒤에 쭈그리고 앉게 합니다",
          "학생들이 조용한 상태로 준비가 되면, 문장을 스크린에 띄웁니다",
          "학생들은 눈치를 보다가 문장의 단어들을 하나씩 차례대로 말하며 일어섭니다",
          "학생들은 반드시 개인 당 한 단어만 말할 수 있습니다",
          "단어들은 순서대로 읽혀야 합니다",
          "만약 두 학생이 같은 단어를 동시에 읽으며 일어섰다면 ",
          "1) '아웃'이 되며 의자를 책상에서 빼서 자리에 앉습니다",
          "2) 그리고 그 라운드는 끝난 것이므로, 다음 문장으로 넘어가며, 일어서있던 학생들은 다시 쭈그리고 앉습니다",
          "한 문장을 실패 없이 성공적으로 다 읽으면, 일어서 있는 학생이 속한 그룹은 점수를 얻습니다",
          "그리고 다시 다음 라운드를 준비합니다",
          "이렇게 하면 그룹 협동 활동이 가능하며, 협동심을 기를 수 있습니다",
          "가장 많은 점수를 획득한 그룹(모둠)이 이깁니다",
        ],
      },
      forStudents: {
        english: [
          "Crouch behind your chair",
          "Be quiet to start a round",
          "Stand up and say one word in the sentence",
          "If you say the same word as someone else, you're both out",
          "If you complete a sentence, each person gets one point for their team",
          "The group with the most points win",
        ],
        korean: [
          "모두 의자를 책상에 밀어넣고, 의자 뒤에 쭈그리고 앉습니다",
          "조용히 준비합니다",
          "문장이 스크린에 보이면, 눈치를 보다가 단어를 순서대로 말하며 일어섭니다",
          "단, 한 명당 단어를 하나만 말할 수 있고, 반드시 순서대로 말해야합니다",
          "만약 같은 단어를 말한 친구가 있다면, 둘 다 (셋 이상이 될 수도 있음) 아웃",
          "실패하지 않고 문장을 다 말하면, 일어서있는 친구들이 속한 모둠은 점수를 얻습니다",
          "가장 많은 점수를 획득한 모둠이 우승",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/match",
      component: Matching,
      icon: "th",
    },
    info: {
      title: "Matching",
      skills: ["Reading", "Speaking"],
      dataUsed: ["Vocabulary"],
      description: "Find All The Pairs",
      attachments: false,
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Matching.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Matching.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Show the word" },
      { key: ["Space", "Enter"], description: "Refresh the game" },
      {
        key: ["Left-Arrow", "Scroll Down"],
        description: "Decrease the number of boxes (min: 6)",
      },
      {
        key: ["Right-Arrow", "Scroll Up"],
        description: "Increase the number of boxes (max: 16)",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students raise their hand and take turns trying to match two cards",
          "If the cards don't match they'll automatically flip back",
          "If there's an odd number of cards, there will be 1 'poo' card",
          "If a Ss gets the 'poo' card they lose their turn",
          "If a student matches two cards, you can reward them",
          "Check out the options to learn how to change the number of cards",
        ],
        korean: [
          "개인별 게임",
          "학생들은 손을 들고, 자신이 지목되면 뒤집혀진 카드 중 두 장을 고르며 숫자를 말하고, 카드의 짝을 찾습니다",
          "카드 짝이 맞지 않으면 자동적으로 다시 카드는 뒤집힙니다",
          "만약 전체 카드 수가 짝수가 아닌 홀수라면, 그 카드 중에서 한 장은 '응가'카드입니다",
          "만약 '응가'카드를 뒤집은 학생이 나오면, 바로 꽝, 다른 사람에게 기회를 줍니다",
          "짝을 맞춘 학생이 나오면, 적절한 보상을 해줍니다",
          "우측 상단에 마우스를 갖다 놓으면 나타나는 '?' 도움말을 클릭하여 카드 수를 늘리거나 줄일 수 있습니다",
        ],
      },
      forStudents: {
        english: [
          "Raise your hand",
          "Wait your turn",
          "Read two blocks",
          "Match? = reward",
          "Poo? = lose your turn",
        ],
        korean: [
          "손을 드세요",
          "선생님이 지목한 학생은",
          "카드 두 장을 골라 숫자를 말합니다",
          "짝이 맞으면, 점수!",
          "만약 '응가'카드를 뽑으면, 즉시 다른 사람에게 기회가 돌아갑니다",
        ],
      },
    },
  },
  {
    router: {
      path: "/game/battleground",
      component: BattleGround,
      icon: "bomb",
    },
    info: {
      title: "Battleground 4 Corners",
      skills: ["Reading", "Speaking"],
      dataUsed: ["Vocabulary", "Expressions"],
      description: "4 Corners Survival Game",
      attachments: true,
      attachURL: "https://pdfhost.io/v/y1FuhSr2u_Battleground_PUBGpdf.pdf",
      completed: true,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/PUBG_4_Corners.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/PUBG_4_Corners.png",
      },
    },
    keyCuts: [
      { key: "Left-Click", description: "Starts the timer or shows the items" },
      {
        key: ["Space", "Enter"],
        description: "Refresh the game",
      },
      {
        key: ["Left-Arrow", "Scroll Down"],
        description: "Refresh the game and use vocabulary",
      },
      {
        key: ["Right-Arrow", "Scroll Up"],
        description: "Refresh the game and use expressions",
      },
    ],
    instructions: {
      forTeachers: {
        english: [
          "Individual or Team Game",
          "Print health papers for each student(S)",
          "Ss will carry that paper and a pencil around will them",
          "Ss stand up and WALK to a corner",
          "*Tell them to be careful with their pencils*",
          "They get 10 seconds to pick a corner",
          "If Ss are still running around, you can penalize them (ie -10 points)",
          "Make each corner say the word/sentence together",
          "If Ss are messing around or not speaking, you can penalize them (ie -10 points)",
          "After each corner has spoken, left-click to show all the items",
          "Ss keep track of their health on their paper",
          "Their health can't go over 100 and 0 = dead",
          "In the team version, Ss can 'revive' a dead team member with the syringe",
          "Last student standing is the winner",
        ],
        korean: ["Coming Soon..."],
      },
      forStudents: {
        english: [
          "Get a pencil and a health paper",
          "Everyone starts with 100 health",
          "WALK to a corner",
          "You only have 10 seconds, so choose quickly",
          "If you are still moving after the timer, you'll lose extra health!",
          "If you are being loud and playing around, you'll lose extra health!",
          "Read your corner's sentence. Be confident while doing so!",
          "Keep track of your health!",
          "0 = dead... sit down",
          "*Health can't go over 100*",
          "If we're playing as a team, you can 'revive' a dead team member with the syringe",
          "Last student standing is the winner",
        ],
        korean: ["Coming Soon..."],
      },
    },
  },
  {
    router: {
      path: "/game/disappear",
      component: "Disappear",
    },
    info: {
      title: "Disappear",
      skills: ["Reading"],
      dataUsed: ["Vocabulary"],
      description: "Word Puzzle Solving Game",
      attachments: false,
      completed: false,
      images: {
        bottomText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Disappear.png",
        topText:
          "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Disappear.png",
      },
    },
    instructions: {
      forTeachers: {
        english: [
          "Individual Game",
          "Students need to focus on the screen and be quiet",
          "Try to figure out what the word or sentence is",
          "Students raise their hand if they think they know",
          "Teacher picks a student and can reward them, if correct",
        ],
        korean: [""],
      },
      forStudents: {
        english: [
          "Students need to focus on the screen and be quiet",
          "Try to figure out what the word or sentence is",
          "Students raise their hand if they think they know",
          "Teacher picks a student and can reward them, if correct",
        ],
        korean: [""],
      },
    },
  },
];
