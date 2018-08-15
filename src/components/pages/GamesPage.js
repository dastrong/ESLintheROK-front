import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Reveal, Header, Segment } from 'semantic-ui-react';
import '../../styles/pages/GamesPage.css'

const style={height: '100%', width: '100%'};
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vQ76oba9R2vRvJqG9bU-nJS5q-J-Rw0YJkw8juGLNXT_Li62RLb0Cdl_etoWk-VPXlQ2OfZlzZSXaA2/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vTn474h_5n4F6ONruuEmd27f1waAp-TAM_yQahYYbISWKz6hZHaMZxnMoF3hF5ZX_IbfyKI3NCSQTv-/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vSlcDGnwEaXVmPvyip_dWMdjkIZceuOfhXd7fivJSR1WLWf-DciD5VTnDH9xYb8Rz_k3pTQgaCflK3A/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vSfKc_oNXd5qNmasfu-63PUoZnRGBwAqPE3yiyVSPP92U-D7l0ZwFZDcULTz2v54d2PYiFfpMHeEs-H/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vSfp1p5SNU_vfmvcj8yi_DEzRbKd27ozg6a_IFPNbIjBW6yRXh-PpZ6bJFkbx8DjI9-78wLhz3mLeQQ/pub?w=1215&h=778'
  },
  {
    URL: 'drop',
    title: 'Letter Bowling',
    skills: ['reading'],
    description: 'Word Solving Game',
    instructions: [
      'Students need to focus on the screen and be quiet',
      'Try to figure out what the word or sentence is',
      'Students raise their hand if they think they know',
      'Teacher picks a student and can reward them, if correct'
    ],
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vTMJYt1jRJrDHJbsOFS17KjmFp_HNaAiCyCQOKWGthkz9TZQ6iV8SOI15-6enV7akZOeaQNE74i4mzY/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vRzkelJ3MjHPSVcqjzgMNun8Ztlk1NvDWFJoi4jqCqAsvO0V9k0KkV7KM9Gd-6E7nF7y1UD5A335Ecz/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vSXPupQmOFWx1aQx6jlWRmn5DRPhY0VRQABqe-A-RAFbpdz5u6Ls5XRPdiuL73AQgUIG-1l6PJMPVCE/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vReildEgt4DwSmQWgeujXSF1Tas58BDKsJsuchgnnKq5gJQnAjaFGTa8QRP2c_tF2nvx57G_GdKc5tA/pub?w=1215&h=778'
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
    image: 'https://docs.google.com/drawings/d/e/2PACX-1vT91t-zFpD4zFDoc2zHhNswDQOtR-kIO9Z8S2m0uTltrOB9CHN78TUYNA3k1qcczk6D2vozbs4WjvTh/pub?w=1215&h=778'
  },
  {
    URL: 'hangman',
    title: 'Hangman Game',
    skills: ['speaking', 'reading'],
    description: 'Solve the Puzzle Game',
    instructions: [
      'Students raise their hand and take turns saying a letter',
    ],
    image: 'https://i.pinimg.com/originals/41/50/8c/41508cc2c447eb989753fd6720a38db7.jpg'
  },
  {
    URL: 'bank',
    title: 'Unlock the Bank',
    skills: ['listening'],
    description: 'Crack the Code',
    instructions: [
      'Students listen to the teacher',
      'Students can write or memorize their code',
      'Teacher picks a student to give their answer',
      'If correct, that student gets a reward',
    ],
    image: 'https://png.icons8.com/color/1600/safe-in.png'
  },
  {
    URL: 'connectfour',
    title: 'Connect 4',
    skills: ['speaking'],
    description: '4 in a row wins',
    instructions: [
      'Split the class into two teams (i.e. boys vs girls)',
      'The teams take turns saying an expression',
      'Teams get 40 seconds, or else a random color gets dropped',
      'First team with four in a row wins',
    ],
    image: 'https://images-na.ssl-images-amazon.com/images/I/51lhRVg%2BJBL.jpg'
  },
  {
    URL: 'fourcorners',
    title: 'Four Corners',
    skills: ['reading', 'speaking'],
    description: 'Pick a corner and try to survive the round',
    instructions: [
      'Students stand up and push their chairs in',
      'Students have ten seconds to pick a corner and walk there',
      'Corners take turns saying their expression',
      'Bombed corner students sit down',
      'Repeat for three rounds',
      'Survivors get 1 point',
      'All students stand up and repeat'
    ],
    image: 'https://mnliteracy.org/sites/default/files/styles/medium/public/four_corners.png'
  },
  {
    URL: 'twinkler',
    title: 'Twinkler',
    skills: ['reading', 'speaking'],
    description: 'Review vocabulary and key expressions',
    instructions: [
      'Students need to focus on the screen',
      'Follow the directions on the screen',
    ],
    image: 'https://cdn.pixabay.com/photo/2017/08/19/11/51/radio-2658263__340.jpg'
  },
]

class GamesPage extends Component {
  render() {
    const grid = gamesInfo.map((game, i) => (
      <Grid.Column key={game.URL}>
        <Reveal style={style} 
                animated={i % 2 ? 'move right' : 'move'} >
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
    ));
    return (
      <div className='games-container'>
        <Header as='h1' textAlign='center' content='Browse Our Game Selection Below' />
        <Grid columns={3}>
          {grid}
        </Grid>
      </div>
    );
  }
};

const PlayGameButton = ({url}) => (
  <Button as={Link} to={`/${url}`} color='green' content='Play Game'/>
);

export default GamesPage;

