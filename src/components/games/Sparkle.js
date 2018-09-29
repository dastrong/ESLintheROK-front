import React, { Component } from 'react';
import TextBox from '../reusable/TextBox';
import { Timer, startTimer, resetTimer } from '../reusable/Timer';
import { CSSTransition } from 'react-transition-group';
import { setData, getRandomNum, getRandomIndex, addListeners, rmvListeners } from '../../helpers/phase2helpers';
import '../../styles/games/Sparkle.css';

class Sparkle extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.6,
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
  }

  componentDidMount(){
    this.addListeners();
    this.setData(this.props.expressionData);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearInterval(this.intervalID)
  }

  handleGame = (data = this.state.data) => {
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
    const { timer, compressor } = this.state;
    if(e.type === 'wheel'){
      const c = e.deltaY < 0 ? -0.05 : 0.05;
      const t = e.deltaY < 0 ? 1 : -1;
      return e.buttons === 4
        ? this.setState({ timer: timer + t, timeRemaining: timer + t })
        : this.setState({ compressor: compressor + c });
    }
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick();
    // right arrow was clicked; increase the timer
    if(e.keyCode === 39){
      if(timer >= 5 && timer < 20){
        const time = timer + 1;
        this.setState({timer:time, timeRemaining: time}, this.handleClick);
      }
    }
    // left arrow was clicked; decrease the timer
    if(e.keyCode === 37){
      if(timer > 5 && timer <= 20){
        const time = timer - 1;
        this.setState({timer:time, timeRemaining: time}, this.handleClick);
      }
    }
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({ compressor: compressor - 0.05 });
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({ compressor: compressor + 0.05 });
  };

  render(){
    const { compressor, gameReady, text, timer, timeRemaining, isTimeUp } = this.state;
    const width = (((timer-timeRemaining)/(timer-1))*100)+'%';
    return (
      <div 
        className='spark-container'
        onClick={this.handleClick}
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