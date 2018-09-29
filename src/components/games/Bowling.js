import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import TextDrop from '../reusable/TextDrop';
import Round from '../reusable/Round';
import { setData, getRandomNum, getRandomIndex, splitText, addListeners, rmvListeners } from '../../helpers/phase2helpers';
import '../../styles/games/Bowling.css';

// increases the time between letter being shot off
const letterBuffer = 3;

class Bowling extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      text: '',
      textIndex: undefined,
      splitText: [],
      totalRound: 3,
      colors: this.props.colors,
    }
    this.setData        = setData.bind(this);
    this.splitText      = splitText.bind(this);
    this.getRandomNum   = getRandomNum.bind(this);
    this.getRandomIndex = getRandomIndex.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
  }

  componentDidMount(){
    this.addListeners();
    this.setData(this.props.vocabularyData);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutActive);
  }

  handleGame = (data = this.state.data) => {
    const textIndex = this.getRandomIndex(data.length);
    const text = data[textIndex];
    const splitText = this.splitText(text);
    const colors = shuffle(this.props.colors);
    const left = splitText.map(()=>this.getRandomNum(window.innerWidth))
    this.setState({
      text,
      textIndex,
      splitText,
      colors,
      left, 
      isShowingAnswer: false,
      isGameOver: false,
      isActive: false,
      round: 1,
    });
  }

  handleReset = () => {
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutActive);
    this.handleGame();
  }

  handleClick = () => {
    const { isShowingAnswer, isGameOver, isActive } = this.state;
    if(isShowingAnswer) return this.setState({isShowingAnswer: false}, this.handleReset);
    if(isGameOver) return this.setState({isShowingAnswer: true});
    if(!isActive) this._startBowling();
  }

  _startBowling = () => {
    const roundBuffer = 2;
    const animationDuration = 7;
    const interval = ((this.state.splitText.length * letterBuffer) + roundBuffer + animationDuration) * 1000;
    this.setState({isActive: true}, this._startInterval(interval));
  }

  _startInterval = (interval) => {
    this.intervalID = setInterval(()=>{
      this.setState(prevState => {
        if(prevState.round === prevState.totalRound) {
          clearInterval(this.intervalID)
          return {isGameOver: true}
        }
        return {round: prevState.round + 1, isActive: false}
      }, () => {
        if(this.state.isGameOver) return;
        this.timeoutActive = setTimeout(()=>this.setState({isActive: true}), 2000)
      });
    }, interval);
  }

  handleEvents = (e) => {
    if(e.type === 'wheel') return;
    const { totalRound, round } = this.state;
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
    // right arrow was clicked; increase the totalRounds
    if(e.keyCode === 39){
      if(totalRound === 5) return;
      this.setState(prevState => ({ totalRound: prevState.totalRound + 1 }));
    }
    // left arrow was clicked; decrease the totalRounds
    if(e.keyCode === 37){
      if(totalRound === 1 || totalRound === round) return;
      this.setState(prevState => ({ totalRound: prevState.totalRound - 1 }));
    }
  };

  render(){
    const { splitText, round, isActive, isGameOver, isShowingAnswer, text, colors, left, totalRound } = this.state;
    const letters = splitText.map((x, i)=>(
                      <TextDrop 
                        key={i}
                        isIn={isActive}
                        styles={{
                          left: left[i],
                          backgroundColor: colors[i] || colors[i-colors.length]
                        }}
                        text={x}
                        timeout={(i * letterBuffer)+'000'}
                      />
                    ));
    const roundInfo = <Round 
                        num={isGameOver ? `???` : round}
                        timeout={0}
                        isIn={(!isActive || isGameOver) && !isShowingAnswer}
                        classname='round-text'
                      />
    const answer = <Round
                    num={text}
                    timeout={0}
                    isIn={isShowingAnswer}
                    classname='round-answer'
                   />

    return (
      <div 
        className='bowling-container'
        onClick={this.handleClick}
      >
        <div className='total-round-counter'>
          {round}/{totalRound}
        </div>
        {roundInfo}
        {answer}
        {letters}
      </div>
    );
  }  
}

export default Bowling;