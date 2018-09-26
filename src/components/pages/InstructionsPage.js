import React, { Component } from 'react';
import { InstructionsHolder } from './InstructionsHelper';
import { games } from '../../helpers/data';
import { addListeners, rmvListeners } from '../../helpers/phase2helpers';
import '../../styles/pages/Instructions.css';

const languages = { E: 'english', K: 'korean' };

class InstructionsPage extends Component {
  constructor(props){
    super(props);
    const game = games.find(({ router })=> router.path === this.props.path);
    this.state = {
      game, 
      instructions: game.instructions[this.props.forPerson],
      language: languages.E,
      index: 0,
    }
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
  }

  componentDidMount(){ this.addListeners(); }

  componentWillUnmount(){ this.rmvListeners(); }

  changeLanguage = () => {
    this.state.language === languages.E
      ? this.setState({language: languages.K})
      : this.setState({language: languages.E})}

  changeIndex = (e) => {
    e.persist();
    this.setState({index: Number(e.target.id)});
  }

  handleClick = () => {
    const { instructions, language, index } = this.state;
    if(index >= instructions[language].length) return;
    return this.setState(({index})=>({index: index + 1})); 
  }

  handleKeyEvent = (e) => {
    const { index, instructions, language } = this.state;
    // spacebar/enter was clicked; next index
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick();
    // E clicked; change language to English
    if(e.keyCode === 69) {
      if(this.state.language === languages.E) return;
      return this.setState({language: languages.E});
    }
    // K clicked; change language to Korean
    if(e.keyCode === 75) {
      if(this.state.language === languages.K) return;
      return this.setState({language: languages.K});
    }
    // right arrow was clicked; increase the index
    if(e.keyCode === 39) {
      if(index >= instructions[language].length) return;
      this.setState(({index})=>({index: index + 1}));
    }
    // left arrow was clicked; decrease the index
    if(e.keyCode === 37) {
      if(index <= 0) return;
      this.setState(({index})=>({index: index - 1}));
    }
  }

  render(){
    return (
      <InstructionsHolder 
        {...this.props}
        {...this.state}
        handleClick={this.handleClick}
        changeIndex={this.changeIndex}
        changeLanguage={this.changeLanguage}
      />
    );
  }
}

export default InstructionsPage;