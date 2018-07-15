import React, { Component } from "react";
// import shuffle from 'shuffle-array';
import classNames from 'classnames';
import Card from '../components/Card';
import { handleGameData, handleAnimations, handleReset, getXs } from '../helpers'
import '../styles/EliminationGame.css';

const xCount = 3;

class EliminationGame extends Component {
  constructor(props){
    super(props); 
    this.state = {
      allData: {},
      gameData: [],
      Xs: [],
      clicked: [],
      height: '25vh',
      targetedId: null,
      targetedIds : [],
      resetting: false,
      isVocab: true,
      handlingClick: false,
      abort: false,
      compressor: 1,
    }
    this.handleGameData   = handleGameData.bind(this);
    this.handleReset      = handleReset.bind(this);
    this.getXs            = getXs.bind(this);
    this.handleAnimations = handleAnimations.bind(this);
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
    const { data } = this.props;
    const vocabularyData = data.vocabularyData.map(data=>data.text);
    const expressionData = data.expressionData.map(data=>data.text);
    const allData = {vocabularyData, expressionData};
    // returns an array of shuffled data equal to our boxCount variable
    const gameData = this.handleGameData(allData);
    // returns an array of Xs
    const Xs = this.getXs(gameData.length, xCount);
    this.setState({allData, gameData, Xs})
  }

  componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  handleClick = (e) => {
    // return if we're still running an animation
    if(this.state.handlingClick) return;
    // gets the id from the clicked card
    let clickedId = Number(e.target.id);
    // sets the id of the card to the left/right for animations
    let targetedId = clickedId % 2 === 0 ? clickedId + 1 : clickedId - 1;
    // flips the cards boolean to show the backside
    const gameData = this.state.gameData.map((data, i) => {
      if(i === clickedId) { 
        // sets inProgress for the flip animation
        data = {
          ...data,
          clickTarget: {isCompleted:false, inProgress: true}
        };
      }
      return data;
    });
    // adds index/id of card that was clicked
    // used to keep track of what needs animations
    const clicked = [...this.state.clicked, clickedId];
    // sets the state and calls our animations function
    // this will flip the clicked card
    // sets targetedId as null and passes the targetedId value as a param for animation timing purposes
    // sets handlingClick flag variable to restrict clickability until animations are complete
    this.setState({gameData, clicked, targetedId: null, handlingClick: true}, this.handleAnimations(targetedId));
  };

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13){
      this.handleReset();
    }
    // right arrow was clicked; reset the state and uses sentences
    if(e.keyCode === 39){
      this.setState({isVocab:false}, () => this.handleReset());
    }
    // left arrow was clicked; reset the game and use pvocab
    if(e.keyCode === 37){
      this.setState({isVocab:true}, () => this.handleReset());
    }
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38){
      const compressor = this.state.compressor - 0.05;
      this.setState({compressor})
    }
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40){
      const compressor = this.state.compressor + 0.05;
      this.setState({compressor})
    }
  }
  
  handleClasses = (card, i) => {
    const { height, clicked, targetedId, targetedIds, isVocab } = this.state;
    const CardClasses = classNames('flipper', {
      'flipping':     card.clickTarget.inProgress,
      'expanding':    targetedId === i,
      'expanded':     targetedIds.includes(i),
      'slideLeft':    card.clickTarget.isCompleted && i % 2 === 0 && !targetedIds.includes(i),
      'slideRight':   card.clickTarget.isCompleted && i % 2 !== 0 && !targetedIds.includes(i),
    });
    return isVocab ? 
      classNames(CardClasses, {
        'slideUp':      card.clickTarget.isCompleted && height !== '25vh',
        'vert33':      !card.clickTarget.isCompleted && height === '33.4vh',
        'vert50':      !card.clickTarget.isCompleted && height === '50vh',
        'vert100':     !card.clickTarget.isCompleted && height === '100vh',
        'enlargeText': height !== '25vh' && !clicked.includes(i)
      }) :
      classNames(CardClasses, {
        'slideUp':      card.clickTarget.isCompleted && height !== '33.4vh',
        'vert33':       height === '33.4vh',
        'vert50':      !card.clickTarget.isCompleted && height === '50vh',
        'vert100':     !card.clickTarget.isCompleted && height === '100vh',
        'enlargeText': height !== '33.4vh' && !clicked.includes(i)
      });
  }

  render(){
    const {gameData, Xs, resetting, compressor} = this.state;
    const containerClasses = classNames('elim-container', { resetting });
    const cards = gameData.map((card, i) => {
      const allCardClasses = this.handleClasses(card, i);
      const colors = ['gold', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive'];
      return (
        <Card 
          key={i}
          index={i}
          name={card.text}
          handleClick={this.handleClick}
          isX={Xs.includes(i)}
          frontColor={colors[i]}
          classNames={allCardClasses}
          compressor={compressor}
        />
      );
    });
    return (
      <div className={containerClasses}>
        {cards}
      </div>
    );
  }
}

export default EliminationGame;