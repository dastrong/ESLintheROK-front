import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import classNames from 'classnames';
import FlipMove from 'react-flip-move';
import { CSSTransition } from 'react-transition-group';
import CardBlock from '../reusable/CardBlock';
import { addListeners, rmvListeners, setData } from '../../helpers/phase2helpers';

class ChaseTheVocab extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      gameData: [],
      clickedIDs: [],
      isVocab: true,
      settings: {
        shuffDuration: 2000,
        shuffBuffer: 500,
        shuffRounds: 5,
      },
      compressor: 0.6,
      colors: this.props.colors,
      color: 2,
    }
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setData = setData.bind(this);
  }
  
  componentDidMount(){
    this.addListeners();
    this.setData(this.props.data);
  }

  componentWillUnmount(){ 
    clearInterval(this.intervalID);
    clearTimeout(this.resetID);
    clearTimeout(this.timeoutID);
    clearTimeout(this.delayedStartID);
    this.rmvListeners();
  }

  handleGame = () => {
    const dataWID = this.state.data.map((x, i)=>{
      return {
        text: x,
        id: i,
      };
    })
    const gameData = shuffle(dataWID).slice(0,9);
    this.setState({
      gameData,
      clickedIDs: [],
      isAnimating: false,
      isShuffleDone: false,
    });
  }

  handleClick = () => {
    if(this.intervalID) return;
    this.setState({isAnimating: true}, () => {
      this.delayedStartID = setTimeout(()=>{
        this._handleShuffle();
        this._startShuffling();
      }, 1000);
    });
  }

  _startShuffling = () => {
    const { shuffDuration, shuffRounds, shuffBuffer} = this.state.settings;
    this.intervalID = setInterval(this._handleShuffle, shuffDuration + shuffBuffer);
    this._stopShuffling(shuffDuration, shuffRounds, shuffBuffer);
  }

  _stopShuffling(shuffDuration, shuffRounds, shuffBuffer){
    this.timeoutID = setTimeout(()=>{
      clearInterval(this.intervalID);
      this.setState({isShuffleDone: true});
    }, shuffRounds * (shuffDuration + shuffBuffer));
  }

  _handleShuffle = () => {
    this.setState({ gameData: shuffle(this.state.gameData.slice()) });
  }

  _handleBoxClick = (e) => {
    const { clickedIDs } = this.state;
    const id = Number(e.target.id);
    if(clickedIDs.includes(id)) return;
    this.setState({clickedIDs: [...clickedIDs, id]});
  }

  handleReset = () => { 
    clearInterval(this.intervalID);
    clearTimeout(this.resetID);
    clearTimeout(this.timeoutID);
    clearTimeout(this.delayedStartID);
    this.intervalID = null;
    this.resetID = null;
    this.timeoutID = null;
    this.delayedStartID = null;
    this.handleGame();
  }

  handleKeyEvent = (e) => {
    const { compressor, colors } = this.state;
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.05});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.05});  
    // right arrow was clicked; reset the state and uses sentences
    if(e.keyCode === 39) return this.setState({isVocab:false}, () => this.resetID = setTimeout(this.handleReset, 1000));
    // left arrow was clicked; reset the game and use vocab
    if(e.keyCode === 37) return this.setState({isVocab:true}, () => this.resetID = setTimeout(this.handleReset, 1000));
    // c was clicked; change the cards background color
    if(e.keyCode === 67){ this.setState(prevState => {
      if(!prevState.color) return {color: colors.length};
      return {color: prevState.color - 1}});
    };
    // a number was clicked; change difficulty
    if(e.code.includes('Digit')){
      const key = Number(e.key);
      if(!key) return;
      const shuffBuffer = this._changeDelay(key);
      const shuffRounds = this._changeRound(key);
      const shuffDuration = this._changeSpeed(key);
      this.setState({ settings: { shuffBuffer, shuffRounds, shuffDuration } }, this.handleReset);
    };
  };

  _changeDelay(key){ return 1000 - (key * 100); }

  _changeRound(key){
    if(key < 4) return 3;
    return key;
  }

  _changeSpeed(key){
    const base = 2000;
    const increaseDifficultyIncrement = (2000 -  500) / 4;
    const decreaseDifficultyIncrement = (5000 - 2000) / 4;
    if(key >= 5) return base - (increaseDifficultyIncrement * (key - 5));
    if(key < 5)  return base + (decreaseDifficultyIncrement * (5 - key));
  }

  render(){
    const { compressor, gameData, isVocab, colors, isAnimating, isShuffleDone, clickedIDs, color, settings } = this.state;
    const boxClass = classNames(
      'box',
      'box-chase',
      { 'box-grid':  isVocab },
      { 'box-list': !isVocab },
      { 'box-shrink': isAnimating && !isShuffleDone });
    const numClass = classNames(
      boxClass,
      'box-number', 
      { 'box-number-show': isShuffleDone });
    const boxes = gameData.map((x,i)=>(
      <div 
        key={x.id}
      >
        <CSSTransition
          in={isAnimating && !clickedIDs.includes(i)}
          timeout={0}
          classNames='box-number'
        >
          <CardBlock 
            text={i+1}
            compressor={compressor}
            boxClass={numClass}
            backColor={colors[color]}
            id={i}
            handleClick={isShuffleDone ? this._handleBoxClick : null}
          />
        </CSSTransition>
        <CardBlock 
          classNames='box'
          text={x.text}
          compressor={compressor}
          boxClass={boxClass}
          backColor={!clickedIDs.includes(i) ? colors[color] : '#676767'} />
      </div>
    ));
    return (
      <FlipMove 
        onClick={!isAnimating 
                  ? this.handleClick
                  : clickedIDs.length === gameData.length
                    ? this.handleReset
                    : null}
        className='container'
        duration={!isAnimating && !isShuffleDone ? 500 : settings.shuffDuration}
      >
        {boxes}
      </FlipMove>
    );
  }
}

export default ChaseTheVocab;