import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Reveal, Header, Segment } from 'semantic-ui-react';
import '../../styles/pages/GamesPage.css'

const style={height: '100%', width: '100%'};
const games = [
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Elimination.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/What_s_Behind.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Stars.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Lotto.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Sparkle_Die.png',
        topText: '',
      }],
    },
    instructions: [{
      forTeachers: {
        english: [
          'Individual Game',
          'Students stand up and make a U or circle around the room',
          'Teacher picks the starting student and the direction',
          'Students must pay attention to the screen and memorize the sentence',
          'Once the timer runs out, the sentence will disappear',
          'Timer starts @ 10 secs. Push the left/right arrows to decrease/increase the timer',
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Letter_Bowling.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Kimchi.png',
        topText: '',
      }],
    },
    instructions: [{
      forTeachers: {
        english: [
          'Individual Game',
          // 'Students raise their hand and take turns trying to match two cards',
          // 'If a student matches two cards, you can reward them',
          '',
        ],
        korean: [
          '',
        ]
      },
      forStudents: {
        english: [
          '',
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Chase_the_Vocab.png',
        topText: '',
      }],
    },
    instructions: [{
      forTeachers: {
        english: [
          'Individual Game',
          'Students need to focus on the screen',
          'Once the cards flip over they will start moving',
          'Students need to keep track of where the cards are',
          'Students raise their hands and take turns',
          'Teacher picks a student and can reward them, if correct'
        ],
        korean: [
          '',
        ]
      },
      forStudents: {
        english: [
            'Students need to focus on the screen and be quiet',
          'Students need to keep track of where the cards are',
          'Students raise their hands and take turns',
          'Teacher picks a student and can reward them, if correct'
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Matching.png',
        topText: '',
      }],
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
      images: [{
        bottomText: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Disappear.png',
        topText: '',
      }],
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
 
 
const gamesInfo = [
  {
    URL: 'elimination',
    title: 'Elimination Game',
    skills: ['reading', 'speaking'],
    description: 'Last Student Standing Game',
    instructions: [
      'Every student stands up',
      'Students take turns reading a block',
      'X = sit down',
      'O = stay standing',
      'Last student standing wins'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Elimination.png'
  },
  {
    URL: 'whatsbehind',
    title: "What's Behind",
    skills: ['reading', 'speaking'],
    description: 'Find the Hidden Item',
    instructions: [
      'Students take turns reading a block',
      'Continue until they find the hidden item',
      'Student that finds the item gets a stamp/sticker/prize'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/What_s_Behind.png'
  },
  {
    URL: 'stars',
    title: 'Stars Writing Game',
    skills: ['reading', 'speaking', 'writing'],
    description: 'Most Stars Wins',
    instructions: [
      'Students open their notebooks and get a pencil',
      'Students choose a block and write it down',
      'Students read aloud their block and teacher turns it over',
      'Students mark down how many stars they found',
      'Repeat as desired',
      'Winner has the most stars'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Stars.png'
  },
  {
    URL: 'lotto',
    title: 'Word Lotto',
    skills: ['reading', 'writing'],
    description: 'Most Points Wins',
    instructions: [
      'Students open their notebooks and get a pencil',
      'Students choose three blocks and write them down',
      'Teacher reveals the correct blocks',
      '1 block = 1 point',
      'Students mark down their points',
      'Repeat as desired',
      'Winner has the most points'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Lotto.png'
  },
  {
    URL: 'sparkle',
    title: 'Sparkle Die',
    skills: ['reading', 'speaking', 'listening'],
    description: 'Fun review activity',
    instructions: [
      'Students stand up and make a U shape around the room',
      'Teacher picks the starting student and the direction',
      'Students pay attention to the screen and memorize the sentence',
      'Students take turns saying the next word in the sentence',
      'When the sentence is finished the next two words are "sparkle" "die"',
      'The next student sits down',
      'Repeat until you have one survivor left'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Sparkle_Die.png'
  },
  {
    URL: 'bowling',
    title: 'Letter Bowling',
    skills: ['reading'],
    description: 'Word Solving Game',
    instructions: [
      'Students need to focus on the screen and be quiet',
      'Try to figure out what the word or sentence is',
      'Students raise their hand if they think they know',
      'Teacher picks a student and can reward them, if correct'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Letter_Bowling.png'
  },
  {
    URL: 'disappear',
    title: 'Disappear',
    skills: ['reading'],
    description: 'Word Solving Game',
    instructions: [
      'Students need to focus on the screen and be quiet',
      'Try to figure out what the word or sentence is',
      'Students raise their hand if they think they know',
      'Teacher picks a student and can reward them, if correct'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Disappear.png'
  },
  {
    URL: 'kimchi',
    title: 'Kimchi Elimination',
    skills: ['reading', 'speaking'],
    description: '',
    instructions: [
      // 'Students raise their hand and take turns trying to match two cards',
      // 'If a student matches two cards, you can reward them',
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Kimchi.png'
  },
  {
    URL: 'chasethevocab',
    title: 'Chase the Vocab',
    skills: ['speaking'],
    description: 'Follow the Vocab',
    instructions: [
      'Students need to focus on the screen and be quiet',
      'Students need to keep track of where the cards are',
      'Students raise their hands and take turns',
      'Teacher picks a student and can reward them, if correct'
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Chase_the_Vocab.png'
  },
  {
    URL: 'match',
    title: 'Matching',
    skills: ['reading', 'speaking'],
    description: 'Find All The Pairs',
    instructions: [
      'Students raise their hand and take turns trying to match two cards',
      'If a student matches two cards, you can reward them',
    ],
    image: 'https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,q_auto:low,w_385/v1536487966/TeacherSite/Games/TextOnBottom/Matching.png'
  },
  // {
  //   URL: 'hangman',
  //   title: 'Hangman Game',
  //   skills: ['speaking', 'reading'],
  //   description: 'Solve the Puzzle Game',
  //   instructions: [
  //     'Students raise their hand and take turns saying a letter',
  //   ],
  //   image: 'https://i.pinimg.com/originals/41/50/8c/41508cc2c447eb989753fd6720a38db7.jpg'
  // },
  // {
  //   URL: 'bank',
  //   title: 'Unlock the Bank',
  //   skills: ['listening'],
  //   description: 'Crack the Code',
  //   instructions: [
  //     'Students listen to the teacher',
  //     'Students can write or memorize their code',
  //     'Teacher picks a student to give their answer',
  //     'If correct, that student gets a reward',
  //   ],
  //   image: 'https://png.icons8.com/color/1600/safe-in.png'
  // },
  // {
  //   URL: 'connectfour',
  //   title: 'Connect 4',
  //   skills: ['speaking'],
  //   description: '4 in a row wins',
  //   instructions: [
  //     'Split the class into two teams (i.e. boys vs girls)',
  //     'The teams take turns saying an expression',
  //     'Teams get 40 seconds, or else a random color gets dropped',
  //     'First team with four in a row wins',
  //   ],
  //   image: 'https://images-na.ssl-images-amazon.com/images/I/51lhRVg%2BJBL.jpg'
  // },
  // {
  //   URL: 'fourcorners',
  //   title: 'Four Corners',
  //   skills: ['reading', 'speaking'],
  //   description: 'Pick a corner and try to survive the round',
  //   instructions: [
  //     'Students stand up and push their chairs in',
  //     'Students have ten seconds to pick a corner and walk there',
  //     'Corners take turns saying their expression',
  //     'Bombed corner students sit down',
  //     'Repeat for three rounds',
  //     'Survivors get 1 point',
  //     'All students stand up and repeat'
  //   ],
  //   image: 'https://mnliteracy.org/sites/default/files/styles/medium/public/four_corners.png'
  // },
  // {
  //   URL: 'twinkler',
  //   title: 'Twinkler',
  //   skills: ['reading', 'speaking'],
  //   description: 'Review vocabulary and key expressions',
  //   instructions: [
  //     'Students need to focus on the screen',
  //     'Follow the directions on the screen',
  //   ],
  //   image: 'https://cdn.pixabay.com/photo/2017/08/19/11/51/radio-2658263__340.jpg'
  // },
]

const GamesPage = () => (
  <div className='games-container'>
    <Header as='h1' textAlign='center' content='Browse Our Game Selection Below' />
    <Grid columns={3}>
      { gamesInfo.map((game, i) => (
        <Grid.Column key={game.URL}>
          <Reveal style={style} 
                  animated='move up' >
            <Reveal.Content style={style} visible >
              <Segment style={style}>
                <Image centered
                      label={{ as: 'a', color: 'blue', content:game.skills, ribbon: true }}
                      src={game.image} />
              </Segment>
            </Reveal.Content>
            <Reveal.Content style={style} hidden>
              <div style={{...style, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <PlayGameButton url={game.URL} />
              </div>
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      )) }
    </Grid>
  </div>
);

const PlayGameButton = ({url}) => (
  <Button as={Link} to={`/${url}`} color='green' content='Play Game'/>
);

export default GamesPage;