export const games = [
  {
    router: {
      path: '/elimination',
      component: 'Elimination',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/whatsbehind',
      component: 'WhatsBehind',
      requiredProps: [],
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
    instructions: [{
      forTeachers: {
        english: [
          'Individual Game',
          'Choose a student to read a block',
          'Click the block the student said',
          'If a trophy appears reward that student',
          'Continue until someone finds the trophy',
          'When the trophy is found a GIF will appear',
          'Reward students however you want, I give a stamp',
          'Repeat as desired',
        ],
        korean: [
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/stars',
      component: 'Stars',
      requiredProps: [],
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
    instructions: [{
      forTeachers: {
        english: [
          'Individual Game',
          'Students need a pencil',
          'Students need a Stars WS or their notebook',
          'Students choose a block and write it down',
          'Point at a block and the students that chose it should say it together',
          'Click that block',
          'Students shouldmark down how many stars they got',
          'Repeat as desired',
          'Winner has the most stars'
        ],
        korean: [
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/lotto',
      component: 'WordLotto',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/sparkle',
      component: 'Sparkle',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/bowling',
      component: 'Bowling',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/kimchi',
      component: 'Kimchi',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
  },
  {
    router: {
      path: '/chase',
      component: 'ChaseTheVocab',
      requiredProps: [],
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
    instructions: [{
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
          '',
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
          '',
        ]
      }
    }],
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
    instructions: [{
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
    }],
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
    instructions: [{
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
    }],
  },
];