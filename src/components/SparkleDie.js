import React, { Component } from 'react';
import TextBox from '../components/TextBox';
import { CSSTransition } from 'react-transition-group';
import { Timer, startTimer, resetTimer } from '../components/Timer';

class SparkleDie extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.5,
      data: [],
      text: '',
      textIndex: undefined,
      timer: 15,
      timeRemaining: 15,
    };
    this.startTimer = startTimer.bind(this);
    this.resetTimer = resetTimer.bind(this);
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    const data = this.props.data.map(val=>val.text); 
    this.setState({data}, ()=>this.handleGame());    
  }

  componentWillUnmount(){ 
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
    clearInterval(this.intervalID)
  }

  handleGame = (data = this.state.data) => {
    const random = this.getRandomIndex(data.length);
    this.setState({
      text: data[random],
      textIndex: random
    });
  }

  getRandomIndex = (length) => {
    const { textIndex } = this.state;
    let i = undefined;
    while(i === undefined || i === textIndex){
      i = this.getRandomNum(length);
    }
    return i;
  }

  getRandomNum = (length) => Math.floor(Math.random()*length);

  handleReset = (e) => {
    this.startTimer();
    this.handleGame();
  }

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13){ this.handleReset() }
    // right arrow was clicked; reset the state and uses sentences
    if(e.keyCode === 39){
      const time = this.state.timer + 1;
      this.setState({timer:time, timeRemaining: time}, () => this.handleReset());
    }
    // left arrow was clicked; reset the game and use pvocab
    if(e.keyCode === 37){
      const time = this.state.timer - 1;
      this.setState({timer:time, timeRemaining: time}, () => this.handleReset());
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
  };

  render(){
    const { compressor, text, timer, timeRemaining, isTimeUp } = this.state;
    const width = (((timer-timeRemaining)/(timer-1))*100)+'%';
    return (
      <div 
        className='container'
        onClick={this.handleReset}
      >
        <CSSTransition
            in={!isTimeUp}
            timeout={0}
            classNames='textBox' >
          <TextBox 
            text={text}
            compressor={compressor} />
        </CSSTransition>
        <Timer 
          timeRemaining={timeRemaining}
          isTimeUp={isTimeUp}
          width={width} />
      </div>
    )
  }
}

export default SparkleDie;