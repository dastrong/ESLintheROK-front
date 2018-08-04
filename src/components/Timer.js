import React from 'react';
import '../styles/Timer.css';

// timer and timeRemaining variables needed in component's initial state (in seconds)
// bind startTimer and resetTimer in the constructor too

function startTimer() {
  // resets timer
  if(this.state.isRunning) return this.resetTimer();
  // helps prevent against multiple clicks
  // will only keep the last clicked interval
  clearInterval(this.intervalID);
  // countdown interval
  this.intervalID = setInterval(()=>{
    // stop at 1, so our animation has 1 second to complete
    // flip the variable and stop the interval
    this.state.timeRemaining <= 1
      ? this.setState({ isTimeUp: true }, clearInterval(this.intervalID))
      : this.setState(prevState => ({
          isRunning: true,
          timeRemaining: prevState.timeRemaining - 1,
        }));
  }, 1000);
}

function resetTimer(){
  this.setState({
    isTimeUp: false,
    isRunning: false,
    timeRemaining: this.state.timer,
  }, this.startTimer);
}

// make sure when you calculate width in the parent to minus 1 in the denominator so this behaves correctly
const Timer = ({timeRemaining, isTimeUp, width}) => (
  <div className='timer'>
    <div className='timer-bar' 
        style={{width}}>
    </div>
    <div className='timer-text'>
      {isTimeUp ? 0 : timeRemaining}</div>
  </div>
)

export { Timer, startTimer, resetTimer }