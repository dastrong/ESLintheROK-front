import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import { CSSTransition } from 'react-transition-group';
import TextDrop from '../components/TextDrop';
import '../styles/Drop.css';

class Drop extends Component {
  constructor(props){
    super(props);
    this.state = {
      allData: {},
      gameData: [],
      text: '',
      textIndex: undefined,
      splitText: [],
      colors: this.props.colors,
      isVocab: true,
      isGameOver: false,
      isActive: false,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
    const { data } = this.props;
    const vocabularyData = data.vocabularyData.map(data=>data.text);
    const expressionData = data.expressionData.map(data=>data.text);
    const allData = {vocabularyData, expressionData};
    this.getData(allData);
  }

  componentWillUnmount(){ document.removeEventListener('keydown', this.handleKeyEvent) }

  getData = (allData) => {
    const gameData = this.chooseDataSet(allData);
    this.setState({allData, gameData}, this.handleGame);
  }

  chooseDataSet = (allData) => {
    // chooses which set of data to use
    return this.state.isVocab ? allData.vocabularyData.slice() : allData.expressionData.slice();
  }
  
  handleGame = (data = this.state.gameData) => {
    const random = this.getRandomIndex(data.length);
    const text = data[random];
    const splitText = this.splitText(text)
    this.setState({
      text,
      textIndex: random,
      splitText,
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

  handleReset = () => this.handleGame();

  handleKeyEvent = (e) => {
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
    // right arrow was clicked; use sentences
    if(e.keyCode === 39){
      this.setState({isVocab: false}, this.handleReset);
    }
    // left arrow was clicked; use vocab
    if(e.keyCode === 37){
      this.setState({isVocab: true}, this.handleReset);
    }
  };

  splitText = (text) => shuffle(text.split(''));

  render(){
    const letters = this.state.splitText.map((x, i)=>(
                      <TextDrop 
                        key={i}
                        isIn={this.state.isActive}
                        styles={{left: this.getRandomNum(this.state.width)}}
                        text={x}
                        timeout={this.getRandomNum(10000)}
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
        onClick={this.handleGame}
      >
        {letters}
      </div>
    );
  }  
}

export default Drop;