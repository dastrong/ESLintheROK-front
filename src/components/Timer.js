import React from 'react';
import '../styles/Timer.css';

// timer and timeRemaining variables needed in 
  // component's initial state (in seconds)
// bind startTimer and resetTimer in the constructor too

function startTimer() {
  // resets timer
  if(this.state.isRunning) return this.resetTimer();
  // helps prevent against multiple clicks
  // will only keep the last clicked interval
  clearInterval(this.intervalID);
  // countdown interval
  this.intervalID = setInterval(()=>{
    this.setState(prevState => ({
      isRunning: true,
      timeRemaining: prevState.timeRemaining - 1,
    }), ()=>{
      // once the remaining time hits zero
      // flip the variable and stop the interval
      if(this.state.timeRemaining) return;
      this.setState({ isTimeUp: true }, clearInterval(this.intervalID));
    });
  }, 1000);
}

function resetTimer(){
  this.setState({
    isTimeUp: false,
    isRunning: false,
    timeRemaining: this.state.timer,
  }, this.startTimer);
}

const Timer = ({timeRemaining, width}) => (
  <div className='timer'>
    <div className='timer-bar' 
        style={{width}}>
    </div>
    <div className='timer-text'>
      {timeRemaining}</div>
  </div>
)

export { Timer, startTimer, resetTimer }