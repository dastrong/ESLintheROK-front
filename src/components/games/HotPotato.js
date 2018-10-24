import React, { Component } from 'react';
import ReactFitText from 'react-fittext';
import { arrOfRandNum } from '../../helpers/phase1helpers';
import { 
  addListeners, rmvListeners, setAllData, chooseDataSet, addTitle, addGoogEvent
 } from '../../helpers/phase2helpers';
import '../../styles/games/HotPotato.css';
import { sampleData } from '../../helpers/data';

class HotPotato extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      gameData: [],
      isVocab: true,
      numOfText: 3,
      compressor: 1,
    }
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setAllData   = setAllData.bind(this);
    this.chooseDataSet= chooseDataSet.bind(this);
    this.addTitle     = addTitle.bind(this);
    this.addGoogEvent = addGoogEvent.bind(this);
    this.arrOfRandNum = arrOfRandNum.bind(this);
  }
  
  componentDidMount(){
    this.addTitle();
    this.addListeners();
    this.setAllData(sampleData);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
  }

  handleGame = () => {
    this.addGoogEvent();
    const chosenData = this.chooseDataSet(this.state.isVocab);
    const indexes = arrOfRandNum(chosenData.length, this.state.numOfText);
    const gameData = indexes.map(x=>chosenData[x]);
    this.setState({ gameData });
  }

  handleEvents = (e) => {
    const { compressor } = this.state;
    if(e.type === 'wheel'){
      if(e.buttons) return;
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      return this.setState({ compressor: compressor + c });
    }
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleGame();
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.03});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.03});  
  };

  render(){
    const { compressor, gameData } = this.state;
    const words = gameData.map((text, i)=> <p key={i}>{text}</p> );
    return (
      <div 
        className='hotpotato-container'
        onClick={this.handleGame}
      >
        <ReactFitText
          compressor={compressor}
          minFontSize={0}
          maxFontSize={500}
        >
          <div className='hotpotato-text'>
            {words}
          </div>
        </ReactFitText>
      </div>
    );
  }
}

export default HotPotato;