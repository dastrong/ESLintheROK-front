import React, { Component } from 'react';
import TextBox from '../components/TextBox';
import Timer from '../components/Timer';

class SparkleDie extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 1,
      data: [],
      text: '',
      textIndex: undefined,
    };
  }

  componentDidMount(){
    const data = this.props.data.map(val=>val.text); 
    this.setState({data}, ()=>this.handleGame());    
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

  handleReset = (e) => this.handleGame();

  render(){
    const { compressor, text } = this.state;
    console.log(text)
    return (
      <div 
        className='container'
        onClick={this.handleReset} 
      >
        <TextBox 
          text={text}
          compressor={compressor} />
        <Timer 
          timeRemaining={15} />
      </div>
    )
  }
}

export default SparkleDie;