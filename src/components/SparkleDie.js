import React, { Component } from 'react';
import TextBox from '../components/TextBox';
import { Timer, startTimer, resetTimer } from '../components/Timer';

class SparkleDie extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 1,
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
    const data = this.props.data.map(val=>val.text); 
    this.setState({data}, ()=>this.handleGame());    
  }

  componentWillUnmount(){ clearInterval(this.intervalID) }

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

  handleReset = (e) => this.handleGame();

  handleClick = (e) => {
    this.startTimer();
    this.handleGame();
  }

  render(){
    const { compressor, text, timer, timeRemaining } = this.state;
    const width = (((timer-timeRemaining)/timer)*100)+'%';
    return (
      <div 
        className='container'
        onClick={this.handleClick}
      >
        <TextBox 
          text={text}
          compressor={compressor} />
        <Timer 
          timeRemaining={timeRemaining}
          width={width} />
      </div>
    )
  }
}

export default SparkleDie;