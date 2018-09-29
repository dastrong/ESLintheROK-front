import React, { Component } from "react";
import shuffle from 'lodash/shuffle';
import classNames from 'classnames';
import Card from '../reusable/Card';
import { 
  handleGameData, handleAnimations, handleEvents, handleReset, handleClasses, handleClick
} from '../../helpers/phase1helpers'
import {
  addListeners, rmvListeners, chooseDataSet, setAllData
} from '../../helpers/phase2helpers'
import '../../styles/games/Generic.css';
import AudioGameOver from '../../assets/sounds/game-over.wav';
import AudioOhYeah from '../../assets/sounds/oh-yeah.mp3';

class Elimination extends Component {
  constructor(props){
    super(props); 
    this.state = {
      colors: this.props.colors,
      xCount: 3, 
      gameData: [],
      clickedIDs: [],
      Xs: [],
      height: '25vh',
      handlingClick: false,
      isResetting: false,
      isVocab: true,
      compressor: 1,
    }
    this.AudioGameOver    = new Audio(AudioGameOver);
    this.AudioOhYeah      = new Audio(AudioOhYeah);
    this.handleGameData   = handleGameData.bind(this);
    this.handleEvents     = handleEvents.bind(this);
    this.handleClick      = handleClick.bind(this);
    this.handleClasses    = handleClasses.bind(this);
    this.handleReset      = handleReset.bind(this);
    this.handleAnimations = handleAnimations.bind(this);
    this.addListeners     = addListeners.bind(this);
    this.rmvListeners     = rmvListeners.bind(this);
    this.chooseDataSet    = chooseDataSet.bind(this);
    this.setAllData       = setAllData.bind(this);
  }

  componentDidMount(){
    this.addListeners();
    const { vocabularyData, expressionData } = this.props;
    const allData = { vocabularyData, expressionData };
    this.setAllData(allData);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
    clearTimeout(this.timeout4);
  }

  componentDidUpdate(){ 
    if(this.state.isGameOver) return this.handleReset(); 
  }

  handleGame = (isVocab = this.state.isVocab) => {
    const { gameData, Xs, height } = this.handleGameData(isVocab);
    this.setState(prevState=>({
      gameData, 
      Xs,
      height,
      clickedIDs: [],
      targetedIDs : [],
      targetedID: null,
      isVocab: isVocab === undefined
                ? prevState.isVocab 
                : isVocab,                
      isGameOver: false,
      colors: shuffle([...this.state.colors]),
    }));
  }

  handleMoreEvents = (e) => {
    // numbers being clicked
    if(e.code.includes('Digit')){
      const { xCount, gameData } = this.state;
      const num = Number(e.key);
      if(!num || num === xCount || num >= gameData.length) return;
      this.setState({ xCount: num }, this.handleReset);
    };
  }

  onPlay = name => { this[name].play(); }
  
  render(){
    const {gameData, Xs, isResetting, isGameOver, compressor, colors, clickedIDs} = this.state;
    const containerClasses = classNames('generic-container', { isResetting });
    const cards = gameData.map((card, i) => {
      const allCardClasses = this.handleClasses(card, i);
      const isX = Xs.includes(i);
      return (
        <Card 
          key={i}
          index={i}
          handleClick={this.handleClick}
          classNames={allCardClasses}
          frontColor={colors[i]}
          frontText={card.text}
          backColor={isX ? 'red' : 'lime'}
          backText={isX ? 'X' : 'O'}
          compressor={compressor}
        />
      );
    });
    return (
      <div className={containerClasses}>
        {cards}
        {isGameOver || isResetting || !clickedIDs.length
          ? null
          : Xs.includes(clickedIDs[clickedIDs.length - 1]) 
            ? this.onPlay('AudioGameOver')
            : this.onPlay('AudioOhYeah') }
      </div>
    );
  }
}

export default Elimination;