import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import InstructionsList from './InstructionsList';
import { games } from '../../../helpers/data';
import '../../../styles/pages/gamePages/Instructions.css';

const languages = { E: 'english', K: 'korean' };

class StudentInstructions extends Component {
  constructor(props){
    super(props);
    this.state = {
      language: languages.E,
      game: games.find(({ router })=> router.path === this.props.path),
    }
  }

  changeLanguage = () => {
    this.state.language === languages.E
      ? this.setState({language: languages.K})
      : this.setState({language: languages.E})}

  render(){
    const { game, language } = this.state;
    return (
      <div className='instructions-container'>
        {/* creates two identical images */}
        {Array(2).fill(undefined).map((x,i)=>
          <img 
            key={`img-${i}`}
            src={game.info.images.topText}
            alt={game.info.title}
          />
        )}
        <InstructionsList 
          listData={game.instructions.forStudents[language]}
        />
        <div className='instructions-buttons'>
          <Button  
            as={Link}
            to={`${game.router.path}`}
            className='massive'
            color='blue'
            icon labelPosition='left'
          >
            <Icon size='large' name='angle left' /> 
            BACK
          </Button>

          <Button  
            as={Link}
            to={`${game.router.path}/start`}
            className='massive'
            color='green'
          >
            START
          </Button>
          <Button  
            onClick={this.changeLanguage}
            className='massive'
            color='orange'
          >
            {(language === languages.E ? languages.K : languages.E).toUpperCase()}
          </Button>
        </div>
      </div>
    );
  }
}

export default StudentInstructions;