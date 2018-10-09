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

  componentDidMount(){ 
    this.addListeners(); 
    document.title = `${this.props.title} - ESL in the ROK`;
  }

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

  handleEvents = (e) => {
    if(e.type === 'wheel'){
      if(e.buttons) return;
      return e.deltaY < 0 ? this._increaseIndex() : this._decreaseIndex();
    }
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
    if(e.keyCode === 39) return this._increaseIndex();
    // left arrow was clicked; decrease the index
    if(e.keyCode === 37) return this._decreaseIndex();
  }

  _increaseIndex = () => {
    const { index, instructions, language } = this.state;
    if(index >= instructions[language].length) return;
    return this.setState(({index})=>({index: index + 1}));
  }

  _decreaseIndex = () => {
    if(this.state.index <= 0) return;
    return this.setState(({index})=>({index: index - 1}));
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