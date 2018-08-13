import React, { Component } from 'react';
import TextDrop from '../components/TextDrop';
import Round from '../components/Round';
import { setData, getRandomNum, getRandomIndex, splitText, addListeners, rmvListeners } from '../phase2helpers';
import '../styles/Bowling.css';

class Bowling extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      text: '',
      textIndex: undefined,
      splitText: [],
      colors: this.props.colors,
      width: window.innerWidth,
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
    this.setData(this.props.data);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearInterval(this.intervalID)
  }

  handleGame = (data = this.state.data) => {
    const textIndex = this.getRandomIndex(data.length);
    const text = data[textIndex];
    const splitText = this.splitText(text)
    this.setState({
      text,
      textIndex,
      splitText,
      isShowingAnswer: false,
      isGameOver: false,
      isActive: false,
      round: 1,
    });
  }

  handleReset = () => {
    clearInterval(this.intervalID)
    this.handleGame();
  }

  handleClick = () => {
    const { isShowingAnswer, isGameOver, isActive } = this.state;
    if(isShowingAnswer) return this.setState({isShowingAnswer: false}, this.handleReset);
    if(isGameOver) return this.setState({isShowingAnswer: true});
    if(!isActive) this._startBowling();
  }

  _startBowling = () => {
    const roundBuffer = 3;
    const animationDuration = 10;
    const interval = ((this.state.splitText.length * 2) + roundBuffer + animationDuration) * 1000;
    this.setState({isActive: true}, this._startInterval(interval));
  }

  _startInterval = (interval) => {
    this.intervalID = setInterval(()=>{
      this.setState(prevState => {
        if(prevState.round === 3) {
          clearInterval(this.intervalID)
          return {isGameOver: true}
        }
        return {round: prevState.round + 1, isActive: false}
      }, () => {
        if(this.state.isGameOver) return;
        setTimeout(()=>this.setState({isActive: true}), 2000)
      });
    }, interval);
  }

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
  };

  render(){
    const { splitText, round, isActive, isGameOver, isShowingAnswer, width, text } = this.state;
    const letters = splitText.map((x, i)=>(
                      <TextDrop 
                        key={i}
                        isIn={isActive}
                        styles={{left: this.getRandomNum(width)}}
                        text={x}
                        timeout={(i*2)+'000'}
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
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          fontSize: '10em',
          lineHeight: '100%',
          backgroundImage: 'url(https://img.clipartxtras.com/14ddc73c6473050c836eebabb5ff4724_bowling-lane-clipart-free-clip-art-library-bowling-alley-clipart_1400-980.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onClick={this.handleClick}
      >
        {roundInfo}
        {answer}
        {letters}
      </div>
    );
  }  
}

export default Bowling;