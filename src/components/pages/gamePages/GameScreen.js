import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { games } from '../../../helpers/data';
import '../../../styles/pages/gamePages/GameScreen.css';

const GameScreen = () => {
  const game = games.find(game => (game.router.path === '/elimination'));
  console.log(game);
    return (
      <div className='gameScreen-container'>
        <img src={game.info.images.topText} alt='game logo'></img>
        <div className='gameScreen-buttons'>
          <Button  
            icon labelPosition='left'
            as='a'          
            className='left-btn outer-btn massive'
            color='blue'
          >
            <Icon fitted size='large' name='angle left' /> 
            Teacher
            <br></br>
            Instructions
          </Button>
          <Button  
            as='a'          
            className='start-btn circular'
            color='green'
          >
            Start
          </Button>
          <Button
            as='a'            
            className='right-btn outer-btn massive'
            color='blue'
          >
            Students 
            <br></br>
            Instructions
            <Icon fitted size='large' name='angle right' />
          </Button>
        </div>
      </div>
    )
}

export default GameScreen;