import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { games } from '../../helpers/data';
import '../../styles/pages/GamePage.css';

class GamePage extends PureComponent {
  
  componentDidMount(){
    document.title = `${this.props.title} - ESL in the ROK`
  }

  render(){
    const { path, isGameReady } = this.props;
    const game = games.find(({router}) => path === router.path);
    const startBtn = classNames('start-btn circular', { disabled: !isGameReady })
    const tooltip = !isGameReady
      ? <div className='tooltip'>
          You need data to play!
          <span>
            Select a lesson {
              <Link to={{
                pathname: '/lessons',
                state: { pageTransition:'slideUp' }
              }}> here</Link>
            } or enter your own data {
              <Link to={{
                pathname: '/data',
                state: { pageTransition:'slideUp' }
              }}> here</Link>
            }
          </span>
        </div>
      : null;
    return (
      <div className='gamePage-container'>
        <img src={game.info.images.topText} alt='game logo'></img>
        <div>
          {tooltip}
          <div className='gamePage-buttons'>
            <Button  
              as={Link}
              to={{
                pathname: `${game.router.path}/teacher`,
                state: { pageTransition:'slideRight' }
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
                state: { pageTransition:'slideLeft' }
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
            <Button className='disabled-backer start-btn circular'></Button>
            <Button  
              as={Link}
              to={{
                pathname: `${game.router.path}/start`,
                state: { pageTransition:'slideUp' }
              }}
              className={startBtn}
              color='green'
            >
              START
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default GamePage;