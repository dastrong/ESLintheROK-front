import Elimination     from '../components/games/Elimination';
import Stars           from '../components/games/Stars';
import WhatsBehind     from '../components/games/WhatsBehind';
import WordLotto       from '../components/games/WordLotto';
import Sparkle         from '../components/games/Sparkle';
import Kimchi          from '../components/games/Kimchi';
import Bowling         from '../components/games/Bowling';
import ChaseTheVocab   from '../components/games/ChaseTheVocab';

export const games = [
  {
    router: {
      path: '/elimination',
      component: Elimination,
      requiredProps: [],
      icon: 'x',
    },
    info: {
      title: 'Elimination Game',
      skills: ['Reading', 'Speaking'],
      description: 'Last Student Standing Game',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Elimination.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Elimination.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Every student starts the game standing',
          'Students take turns reading a block',
          'Click that block',
          'X = sit down',
          'O = stay standing',
          'Last student standing wins',
          'Let the class know who the first and last students are',
          'I like to zig zag through the rows then return to the first student',
          'You can switch from vocab to expressions using the left and right arrows',
        ],
        korean: [
          '개인별 게임',
          '모두 일어선 상태로 게임을 시작합니다',
          '한 명씩 하나의 블록 안에 있는 단어/문장을 읽습니다',
          '그리고 그 블록을 클릭합니다',
          'X = 앉기',
          'O = 그대로 서 있기',
          '끝까지 살아서 서있는 사람이 우승!',
          '처음 시작한 사람과 마지막 차례가 누군지 알려주세요',
          '처음 학생 다음 순서는 오른쪽 학생, 즉 반 전체를 봤을 때, "ㄹ"형태로 진행합니다',
          '<- 키보드를 누르면 단어, -> 키보드를 누르면 표현(문장)입니다',
        ]
      },
      forStudents: {
        english: [
          'Everyone stands up',
          'Read a block',
          'X = sit down',
          'O = stay standing',
          'Last student standing wins',
        ],
        korean: [
          '모두 일어섯',
          '블록 안의 단어/표현을 읽으세요',
          'X = 앉기',
          'O = 일어서 있기',
          '가장 마지막까지 서있는 사람이 우승',
        ]
      }
    },
  },
  {
    router: {
      path: '/whatsbehind',
      component: WhatsBehind,
      requiredProps: [],
      icon: 'find',
    },
    info: {
      title: "What's Behind",
      skills: ['Reading', 'Speaking'],
      description: 'Find the Hidden Item',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/What_s_Behind.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/What_s_Behind.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Choose a student to read a block',
          'Click the block the student said',
          'If a trophy appears reward that student',
          'Continue until someone finds the trophy',
          'When the trophy is found a GIF will appear',
          'Reward student however you want, I give a stamp',
          'Repeat as desired',
        ],
        korean: [
          '개인별 게임',
          '한 학생이 블록 안의 단어/표현을 읽게 합니다',
          '그 읽은 블록을 클릭합니다',
          '트로피가 나오면 보상해줍니다',
          '누군가가 트로피를 발견할 때까지 계속 진행합니다',
          '트로피가 나타나면 "움직이는 사진"이 나타납니다',
          '당신이 원하는 방식으로 보상을 해주세요 (저는 도장을 하나 줍니다)',
          '계속 반복하시면 됩니다',
        ]
      },
      forStudents: {
        english: [
          'Raise your hand',
          'Wait your turn', 
          'Read a block',
          'Trophy = reward',
        ],
        korean: [
          '손을 드세요',
          '당신의 차례를 기다리세요',
          '블록 안의 단어/표현을 읽으세요',
          '트로피 = 보상',
        ]
      }
    },
  },
  {
    router: {
      path: '/stars',
      component: Stars,
      requiredProps: [],
      icon: 'star',
    },
    info: {
      title: 'Stars Writing Game',
      skills: ['Reading', 'Speaking', 'Writing'],
      description: 'Collect as many stars as possible',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Stars.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Stars.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Students need a pencil',
          'Students need a Stars WS or their notebook',
          'Students choose a block and write it down',
          'Point at a block and the students that chose it should say it together',
          'Click that block',
          'Students should mark down how many stars they got',
          'Repeat as desired',
          'Winner has the most stars'
        ],
        korean: [
          '개인별 게임',
          '학생들은 연필이 필요합니다',
          '모두 활동지나 자신들의 공책이 필요합니다',
          '학생들이 블록을 선택하여 그 단어/표현을 받아 적습니다',
          '선생님이 선택한 블록의 단어/표현을 고른 학생들은 같이 읽어야 합니다',
          '블록을 클릭하세요',
          '학생들은 각 각 자신들이 얼마나 많은 별들을 획득했는지 기록합니다',
          '계속 반복하세요',
          '가장 많은 별을 가진 학생이 우승',
        ]
      },
      forStudents: {
        english: [
          'Choose and write one block',
          'Put your hands on you head when you are ready',
          'When Teacher points at your block, say it aloud',
          'Keep track of your stars',
          'Most stars wins',
        ],
        korean: [
          '블록 하나를 선택하여 그 단어/표현을 받아 적습니다',
          '다 적은 학생은 머리 위에 손을 올립니다',
          '선생님이 가리키는 블록의 단어/표현을 같이 소리내어 읽습니다',
          '여러분이 선택하여 적은 블록에서 "별"을 발견한다면, 개수를 기록하세요',
          '가장 많은 별을 획득한 학생이 우승',
        ]
      }
    },
  },
  {
    router: {
      path: '/lotto',
      component: WordLotto,
      requiredProps: [],
      icon: 'won',
    },
    info: {
      title: 'Word Lotto',
      skills: ['Reading', 'Speaking', 'Writing'],
      description: 'Get as many points as possible',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Lotto.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Lotto.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Students need a pencil',
          'Students need a Lotto WS or their notebook',
          'For Vocab: Choose 3 blocks and write them down',
          'For Expressions: Choose 1 block and write it down',
          'Count down aloud (start from 10)',
          'Click to reveal the correct answer',
          '1 block = 1 point',
          'Students mark down their points',
          'Repeat as desired',
          'Winner has the most points',
          'Personally as the game progresses, I like to increase how many points a block is worth'
        ],
        korean: [
          '개인별 게임',
          '학생들은 연필이 필요합니다',
          '학생들 모두 "로또 활동지"나 공책이 필요합니다',
          '"단어"게임일 경우, 세 단어를 선택하여 받아 적습니다',
          '"문장"게임일 경우, 하나의 문장을 선택하여 받아 적습니다',
          '10부터 카운트다운을 시작하세요',
          '학생들이 다 적으면, 스크린 아무 곳에나 클릭을 하세요',
          '1 블록 = 1점',
          '학생들은 자신들의 점수를 기록합니다',
          '반복 가능합니다',
          '가장 높은 점수를 가진 학생이 우승',
          '개인적으로는 게임이 진행되면, 블록의 점수를 높이기도 합니다',
        ]
      },
      forStudents: {
        english: [
          'Choose and write 1-3 blocks',
          'Put your hands on you head when you are ready',
          'When Teacher points at your block, say it aloud',
          'Keep track of your points',
          'Most points wins',
        ],
        korean: [
          '1-3개의 블록을 선택하여 거기 적혀진 단어/표현을 적습니다',
          '다 적었으면 머리에 손을 올립니다',
          '만약 선생님이 여러분이 선택한 블록을 손가락으로 가리킨다면, 소리내어 읽습니다',
          '점수를 계속 기록하세요',
          '가장 많은 점수를 획득한 학생이 우승',
        ]
      }
    },
  },
  {
    router: {
      path: '/sparkle',
      component: Sparkle,
      requiredProps: [],
      icon: 'diamond',
    },
    info: {
      title: 'Sparkle Die',
      skills: ['Reading', 'Speaking', 'Listening'],
      description: 'Fun review activity',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Sparkle_Die.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Sparkle_Die.png',
      },
    },
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
        ]
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
        ]
      }
    },
  },
  {
    router: {
      path: '/bowling',
      component: Bowling,
      requiredProps: [],
      icon: 'bowling ball',
    },
    info: {
      title: 'Letter Bowling',
      skills: ['Reading', 'Writing?'],
      description: 'Word Puzzle Solving Game',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Letter_Bowling.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Letter_Bowling.png',
      },
    },
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
          'Letters will cycle through 3 rounds by default. Push the left/right arrows to decrease/increase the rounds',
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
        ]
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
        ]
      }
    },
  },
  {
    router: {
      path: '/kimchi',
      component: Kimchi,
      requiredProps: [],
      icon: 'heart',
    },
    info: {
      title: 'Kimchi Elimination',
      skills: ['Reading', 'Speaking'],
      description: '',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Kimchi.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Kimchi.png',
      },
    },
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

        ]
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
        ]
      }
    },
  },
  {
    router: {
      path: '/chase',
      component: ChaseTheVocab,
      requiredProps: [],
      icon: 'exchange',
    },
    info: {
      title: 'Chase the Vocab',
      skills: ['Speaking'],
      description: 'Follow the Vocab',
      players: 1,
      completed: true,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Chase_the_Vocab.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Chase_the_Vocab.png',
      },
    },
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
        ]
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
          '카드를 몇 장 고른 후, 그 카드들이 움직이는 것을 눈으로 쫓아가세요',
          '카드가 움직이기를 멈추면 손을 듭니다',
          '발표하는 학생을 제외하고 모두 자기 차례를 조용히 기다리세요',
          '숫자와 그 카드 뒷 면의 단어를 맞춥니다',
          '정답 = 보상',
        ]
      }
    },
  },
  {
    router: {
      path: '/match',
      component: 'Matching',
      requiredProps: [],
    },
    info: {
      title: 'Matching',
      skills: ['Reading', 'Speaking'],
      description: 'Find all the pairs',
      players: 1,
      completed: false,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Matching.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Matching.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Students raise their hand and take turns trying to match two cards',
          'If a student matches two cards, you can reward them',
        ],
        korean: [
          '',
        ]
      },
      forStudents: {
        english: [
          'Students raise their hand and take turns trying to match two cards',
          'If a student matches two cards, you can reward them',
        ],
        korean: [
          '',
        ]
      }
    },
  },
  {
    router: {
      path: '/disappear',
      component: 'Disappear',
      requiredProps: [],
    },
    info: {
      title: 'Disappear',
      skills: ['Reading'],
      description: 'Word Puzzle Solving Game',
      players: 1,
      completed: false,
      images: {
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Disappear.png',
        topText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_700/v1536487966/TeacherSite/Games/TextOnTop/Disappear.png',
      },
    },
    instructions: {
      forTeachers: {
        english: [
          'Individual Game',
          'Students need to focus on the screen and be quiet',
          'Try to figure out what the word or sentence is',
          'Students raise their hand if they think they know',
          'Teacher picks a student and can reward them, if correct'
        ],
        korean: [
          '',
        ]
      },
      forStudents: {
        english: [
          'Students need to focus on the screen and be quiet',
          'Try to figure out what the word or sentence is',
          'Students raise their hand if they think they know',
          'Teacher picks a student and can reward them, if correct'
        ],
        korean: [
          '',
        ]
      }
    },
  },
];