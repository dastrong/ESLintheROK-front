import type { GameConfig } from '../types';

export const config: GameConfig = {
  publish: true,

  // MAIN INFO
  path: '/game/pubg_battleground', // you probably don't wanna edit this
  title: 'PUBG Battleground', // you probably don't wanna edit this
  description: '4 Corners Survival Game',
  image: {
    width: 355,
    height: 221,
  },
  warnings: [],

  // SKILLS AND DATA
  skills: ['Reading', 'Speaking'],
  dataUsed: ['Vocabulary', 'Expressions'],

  // BADGES - used on /games page
  attachURL: `https://pdfhost.io/v/y1FuhSr2u_Battleground_PUBGpdf.pdf`,
  hasAudio: false,
  usesGifs: false,

  // KEYboard shortCUTS
  keyCuts: [
    {
      key: ['Left-Click'],
      description: 'Starts the timer or shows the items',
    },
    {
      key: ['Space', 'Enter'],
      description: 'Refresh the game',
    },
    {
      key: ['Left-Arrow', 'Scroll Down'],
      description: 'Refresh the game and use vocabulary',
    },
    {
      key: ['Right-Arrow', 'Scroll Up'],
      description: 'Refresh the game and use expressions',
    },
  ],

  // INSTRUCTIONS
  instructions: {
    forTeachers: {
      english: [
        'Individual or Team Game',
        'Print health papers for each student(S)',
        'Ss will carry that paper and a pencil around will them',
        'Ss stand up and WALK to a corner',
        '*Tell them to be careful with their pencils*',
        'They get 10 seconds to pick a corner',
        'If Ss are still running around, you can penalize them (ie -10 points)',
        'Make each corner say the word/sentence together',
        'If Ss are messing around or not speaking, you can penalize them (ie -10 points)',
        'After each corner has spoken, left-click to show all the items',
        'Ss keep track of their health on their paper',
        "Their health can't go over 100 and 0 = dead",
        "In the team version, Ss can 'revive' a dead team member with the syringe",
        'Last student standing is the winner',
      ],
      korean: [
        '개인전이나 단체전 가능',
        'HP(생명력)종이를 프린트해서 학생들에게 나눠줍니다.',
        '학생들은 그 종이와 연필을 지니고 움직입니다.',
        '각 라운드마다 학생들은 자신이 선택한 코너로 이동합니다.',
        '* 연필을 가지고 다니기 때문에, 서로 찌르지 않도록 조심합니다.',
        '각 라운드마다, 코너를 선택하는 시간은 10초가 주어지며, 카운트다운이 됩니다.',
        '10초가 지나도 계속 선택하지 못해 돌아다니는 학생들에게는 패널티(예를 들어, -10점)를 부과할 수 있습니다.',
        "코너를 선택한 후, 각 코너에 모여있는 학생들은 자신들이 선택한 코너의 '단어' 혹은 '문장'을 함께 읽습니다.",
        '말을 하지 않거나, 떠들거나, 방해하는 학생들이 있다면 패널티(예를 들어, -10점)를 부과할 수 있습니다.',
        '모든 코너의 학생들이 자신이 선택한 단어 혹은 문장을 한 목소리로 말했다면, 마우스 왼쪽 버튼을 클릭하여 점수 공개합니다.',
        "학생들은 자신이 선택한 코너의 점수를 'HP'(생명력)종이에 기록하며, 계속해서 더하거나 뺍니다. ",
        "생명력은 100점 이상이 될 경우, 더이상 더할 수 없고(100점이 최대), 0점이 되면 그 학생은 '탈락'입니다.",
        "팀별 게임일 경우, 자신의 팀원이 탈락한 경우, '주사기'아이템이 나올 경우 그 팀원을 살릴 수 있습니다. 살아난 팀원의 점수는 다시 100점으로 시작합니다.",
        '마지막까지 살아남은 학생/팀이 우승합니다.',
      ],
    },

    forStudents: {
      english: [
        'Get a pencil and a health paper',
        'Everyone starts with 100 health',
        'WALK to a corner',
        'You only have 10 seconds, so choose quickly',
        "If you are still moving after the timer, you'll lose extra health!",
        "If you are being loud and playing around, you'll lose extra health!",
        "Read your corner's sentence. Be confident while doing so!",
        'Keep track of your health!',
        '0 = dead... sit down',
        "*Health can't go over 100*",
        "If we're playing as a team, you can 'revive' a dead team member with the syringe",
        'Last student standing is the winner',
      ],
      korean: [
        '연필과 생명력 종이를 항상 지니고 다니세요.',
        '모두 생명력 100점으로 시작합니다.',
        '라운드가 시작되고, 카운트 다운이 시작되면 하나의 코너를 선택하여 이동하세요.',
        '10초만 주어지니 빨리 선택하여 이동하는 것이 좋습니다.',
        '시간이 지나도 선택하지 못해 우왕좌왕한다면, 일정 점수를 잃게 됩니다.',
        '떠들거나, 게임의 진행을 방해한다면 또한 일정 점수를 잃게 됩니다.',
        '코너를 선택한 후, 선생님이 지목하는 코너의 학생들은 자신이 선택한 단어 혹은 문장을 한 목소리로 읽습니다. ',
        '자신이 선택한 코너의 아이템과 점수가 함께 공개가 되면, 자신의 생명력에 그 점수를 더하거나 뺍니다. (+의 경우 더하고, -의 경우 뺍니다.)',
        '자신의 생명력이 0점이 되면 탈락되며, 자리에 앉으면 되겠습니다.',
        '생명력은 최대 100점이므로, 100점에서 +30점을 얻었다 하더라도 100점입니다.',
        "팀별 게임일 경우, 같은 팀의 누군가가 '아드레날린 주사기'아이템을 선택했다면 탈락한 팀원을 다시 살릴 수 있습니다. (살아난 팀원은 100점으로 다시 시작)",
        '마지막까지 살아남은 사람/팀이 이깁니다.',
      ],
    },
  },
};
