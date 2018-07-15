import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Reveal, Header, Segment } from 'semantic-ui-react';
// import '../styles/LessonsPage.css';

const style={height: '100%', width: '100%'};
const gamesInfo = [
  {
    URL: 'elimination',
    title: 'Elimination Game',
    skills: ['reading', 'speaking'],
    description: 'Last Student Standing Game',
    instructions: [
      '',
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4q6YNwsqlkdrSR4NpN-x3iH0VisOgCuLTnB4oqGZbBlm__X_jbg'
  },
  {
    URL: 'whatsbehind',
    title: "What's Behind",
    skills: ['reading', 'speaking'],
    description: 'Find the Hidden Item',
    instructions: [
      '',
    ],
    image: 'http://static1.squarespace.com/static/54e24c4ee4b045091b1e029c/573e4c3d45bf219b6da4309f/581946f3c534a52382da0015/1479076177551/whichdoor.jpg'
  },
  {
    URL: 'stars',
    title: 'Stars Writing Game',
    skills: ['reading', 'speaking', 'writing'],
    description: 'Most Stars Wins',
    instructions: [
      '',
    ],
    image: 'http://www.thesingingtree.biz/wp-content/uploads/2011/09/stars.png'
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
      <div>
        <Header as='h1' textAlign='center' content='Browse Our Game Selection Below' />
        <Grid container columns={2}>
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

