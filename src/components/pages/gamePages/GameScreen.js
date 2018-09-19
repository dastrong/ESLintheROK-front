import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { games } from '../../../helpers/data';
import '../../../styles/pages/gamePages/GameScreen.css';

const GameScreen = ({ path }) => {
  const game = games.find(({router}) => path === router.path);
  return (
    <div className='gameScreen-container'>
      <img src={game.info.images.topText} alt='game logo'></img>
      <div className='gameScreen-buttons'>
        <Button  
          as={Link}
          to={{
            pathname: `${game.router.path}/teacher`,
            state: { slideRight:true }
          }}
          className='left-btn outer-btn huge'
          color='blue'
          icon labelPosition='left'
        >
          <Icon size='large' name='angle left' /> 
          TEACHER
          <br></br>
          <span>INSTRUCTIONS</span>
        </Button>
        <Button
          as={Link}
          to={{
            pathname: `${game.router.path}/student`,
            state: { slideLeft:true }
          }}
          className='right-btn outer-btn huge'
          color='blue'
          icon labelPosition='right'
        >
          STUDENT 
          <br></br>
          <span>INSTRUCTIONS</span>
          <Icon size='large' name='angle right' />
        </Button>
        <Button  
          as={Link}
          to={{
            pathname: `${game.router.path}/start`,
            state: { slideUp:true }
          }}
          className='start-btn circular'
          color='green'
        >
          START
        </Button>
      </div>
    </div>
  )
}

export default GameScreen;