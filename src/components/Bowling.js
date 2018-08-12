import React, { Component } from 'react';
import TextDrop from '../components/TextDrop';
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

  componentWillUnmount(){ this.rmvListeners() }

  handleGame = (data = this.state.data) => {
    const random = this.getRandomIndex(data.length);
    const text = data[random];
    const splitText = this.splitText(text)
    this.setState({
      text,
      textIndex: random,
      splitText,
      isGameOver: false,
      isActive: false,
      round: 1,
    });
  }

  handleReset = () => {
    this.handleGame();
  }

  handleClick = () => {
    if(this.state.isActive) return;
    this.state.isGameOver
      ? this.handleReset()
      // : this.setState({isActive: true});
      : this._startBowling();
  }

  _startBowling = () => {
    const roundBuffer = 3;
    const animationDuration = 10;
    const interval = (this.state.splitText.length + animationDuration + roundBuffer) * 1000;

    this.intervalID = setInterval(()=>{
      console.log('hey')
    }, interval)
    this.setState(prevState => {
      if(prevState.round === 3) return clearInterval(this.intervalID);
      return ({round: prevState.round + 1})
    })
  }

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
  };

  render(){
    const letters = this.state.splitText.map((x, i)=>(
                      <TextDrop 
                        key={i}
                        isIn={this.state.isActive}
                        styles={{left: this.getRandomNum(this.state.width)}}
                        text={x}
                        timeout={(i*2)+'000'}
                      />
                    ));
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
        {letters}
      </div>
    );
  }  
}

export default Bowling;