import React, { Component } from 'react';
import TextBox from '../reusable/TextBox';
import { Timer, startTimer, resetTimer } from '../reusable/Timer';
import { CSSTransition } from 'react-transition-group';
import { 
  setData, getRandomNum, getRandomIndex, addListeners, rmvListeners, addTitle, addGoogEvent
} from '../../helpers/phase2helpers';
import '../../styles/games/Sparkle.css';

class Sparkle extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.8,
      data: [],
      text: '',
      textIndex: undefined,
      timer: 15,
      timeRemaining: 15,
      gameReady: false,
    };
    this.startTimer = startTimer.bind(this);
    this.resetTimer = resetTimer.bind(this);
    this.setData        = setData.bind(this);
    this.getRandomNum   = getRandomNum.bind(this);
    this.getRandomIndex = getRandomIndex.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
    this.addTitle       = addTitle.bind(this);
    this.addGoogEvent   = addGoogEvent.bind(this);
  }

  componentDidMount(){
    this.addTitle();
    this.addListeners();
    this.setData(this.props.expressions);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearInterval(this.intervalID)
  }

  handleGame = (data = this.state.data) => {
    this.addGoogEvent();
    const random = this.getRandomIndex(data.length);
    this.setState({
      text: data[random],
      textIndex: random,
      gameReady:true
    });
  }

  handleClick = () => {
    if(this.state.isActive) this.handleGame();
    this.startTimer();
  }

  handleEvents = (e) => {
    const {  compressor } = this.state;
    if(e.type === 'wheel'){
      const c = e.deltaY < 0 ? -0.05 : 0.05;
      return e.buttons !== 4 
        ? this.setState({ compressor: compressor + c })
        : c < 0
          ? this._increaseTimer()
          : this._decreaseTimer()
    }
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick();
    // right arrow was clicked; increase the timer
    if(e.keyCode === 39) return this._increaseTimer();
    // left arrow was clicked; decrease the timer
    if(e.keyCode === 37) return this._decreaseTimer();
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({ compressor: compressor - 0.05 });
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({ compressor: compressor + 0.05 });
  };

  _increaseTimer = () => {
    const { timer } = this.state;
    if(timer >= 5 && timer < 20){
      const time = timer + 1;
      this.setState({timer:time, timeRemaining: time}, this.handleClick);
    }
  }

  _decreaseTimer = () => {
    const { timer } = this.state;
    if(timer > 5 && timer <= 20){
      const time = timer - 1;
      this.setState({timer:time, timeRemaining: time}, this.handleClick);
    }
  }

  render(){
    const { compressor, gameReady, text, timer, timeRemaining, isTimeUp } = this.state;
    const width = (((timer-timeRemaining)/(timer-1))*100)+'%';
    return (
      <div 
        className='spark-container'
        onClick={this.handleClick}
        style={{fontFamily: this.props.font}}
      >
        <CSSTransition
          in={!isTimeUp}
          timeout={0}
          classNames='textBox' >
          <TextBox 
            text={text}
            width={'100%'}
            height={'85vh'}
            compressor={compressor} 
            gameReady={gameReady} />
        </CSSTransition>
        <Timer 
          timeRemaining={timeRemaining}
          isTimeUp={isTimeUp}
          width={width} />
      </div>
    )
  }
}

export default Sparkle;