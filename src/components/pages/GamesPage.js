import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Label, Card } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import { games } from '../../helpers/data';
import '../../styles/pages/GamesPage.css'

const GamesPage = () => (
  <div className='gamesPage-container'>
    <PageHeader 
      icon='game'
      text='GAMES'
      color='blue'
      info='Select a game for more information'
    />
    <Grid>
      <GridItems games={games} />
    </Grid>
  </div>
);

const GridItems = ({ games }) => (
  games
  .filter(({ info }) => info.completed)
  .map(({ router, info }) => (
    <Card key={router.path}>
      <Card.Content textAlign='center'>
        <Label 
          attached='top'
          color='grey'
          content={info.dataUsed.join(', ')}
        />
        <Card.Header content={info.title} />
        <Card.Description content={info.description} />
        <PlayGameButton url={router.path} />
        <Label 
          attached='bottom'
          color='grey'
          content={info.skills.join(', ')}
        />
      </Card.Content>      
      <Image src={info.images.bottomText} />
    </Card>
  ))
)

const PlayGameButton = ({ url }) => (
  <Button
    as={Link}
    to={{
      pathname: `${url}`,
      state: { pageTransition:'slideUp' }
    }}
    color='green'
    content='View More'
  />
);

export default GamesPage;