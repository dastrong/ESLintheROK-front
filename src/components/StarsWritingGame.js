import React, { Component } from "react";
import classNames from 'classnames';
import shuffle from 'shuffle-array';
import Card from '../components/Card';
import { Icon } from 'semantic-ui-react';
import { handleGameData } from '../helpers'

class StarsWritingGame extends Component {
  constructor(props){
    super(props); 
    this.state = {
      allData: {},
      gameData: [],
      Xs: [],
      clickedID: undefined,
      clickedIDs: [],
      counter: 0,
      colors: this.props.colors,
      starColors: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'],
      height: '25vh',
      handlingClick: false,
      isResetting: false,
      isVocab: true,
      compressor: 1,
      isGameOver: false
    }
    this.handleGameData   = handleGameData.bind(this);
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
    // returns an array of numbers used to show stars
    const Xs = this._getXs(gameData.length);
    this.setState({allData, gameData, Xs})
  }

  componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  _getXs = (dataLength) => {
    // returns an array of numbers between 0-6
    return [...Array(dataLength)].map(()=>Math.floor(Math.random()*7));
  }

  _handleCardFlip = (id) => {
    const { clickedIDs, handlingClick, gameData } = this.state;
    // prevents multiple clicks simultaneously
    if(handlingClick) return;
    // copy and spread old state and add new id
    const arr = [...clickedIDs, id];
    this.setState({
      clickedIDs:arr, 
      clickedID:id,
      handlingClick: true      
    }, ()=>{
      // wait a seconds for animations to be complete
      // reset clicking flag variables
      setTimeout(()=>{
        this.setState({
          handlingClick:false,
          isGameOver: arr.length === gameData.length
        });
      },1000)
    });
  }
  
  _handleNextCardUp = () => {
    if(this.state.isGameOver) return this.handleReset();
     // copy and sort our clickedIDs
     const sortedIDs = this.state.clickedIDs.slice().sort();
     // start at 0
     let id = 0;
     // determines the next card to be clicked
     while(sortedIDs.includes(id)) id++;
     // flip that card over
     this._handleCardFlip(id);
  }

  handleClick = (e) => {
    // click the front div -- flip that card over
    // click the back div  -- flip the next card over
    e.target.id
      ? this._handleCardFlip(Number(e.target.id))
      : this._handleNextCardUp();
  }

  handleReset = (e) => {
    // returns a new array of shuffled data
    const gameData = this.handleGameData();
    // returns a new array of chosen numbers
    const Xs = this._getXs(gameData.length, 3);
    // refresh our state
    this.setState({
      gameData,
      Xs,
      clickedID: undefined,
      clickedIDs: [],
      isResetting: true,
      isGameOver: false,
      colors: shuffle(this.state.colors, {'copy': true}),
      starColors: shuffle(this.state.starColors, {'copy': true}),
    }, () => {
      setTimeout(()=>{
        // fades the whole container in and out
        // resets our flag variables
        this.setState({
          isResetting: false, 
          handlingClick: false, 
        });
      },1000)
    });
  }

  handleClasses = (i) => {
    const { isVocab, clickedID, clickedIDs } = this.state;
    const classes = classNames('flipper', {
      'flipping':  clickedID === i || clickedIDs.includes(i),
    });
    return isVocab 
      ? classNames(classes, 'vert25')
      : classNames(classes, 'vert33');
  }

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked
    if(e.keyCode === 32 || e.keyCode === 13){
      this._handleNextCardUp();
    }
    // right arrow was clicked; reset the state and use sentences
    if(e.keyCode === 39){
      this.setState({isVocab:false}, () => this.handleReset());
    }
    // left arrow was clicked; reset the game and use vocab
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
  
  render(){
    const {gameData, Xs, isResetting, compressor, colors, starColors} = this.state;
    const containerClasses = classNames('elim-container', { isResetting });
    const cards = gameData.map((card, i) => {
      const cardClasses = this.handleClasses(i);
      const icons = [...Array(Xs[i])].map((x,j)=>
        <Icon loading 
              name='star' 
              color={starColors[i]} 
              size='small'
              key={j} />
      );
      return (
        <Card 
          key={i}
          index={i}
          handleClick={this.handleClick}
          classNames={cardClasses}
          frontColor={isResetting ? starColors[8] : colors[i]}
          frontText={isResetting ? '' : card.text}
          backText={isResetting ? '' : icons}
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

export default StarsWritingGame;