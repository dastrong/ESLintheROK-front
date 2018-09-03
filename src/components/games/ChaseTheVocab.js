import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import classNames from 'classnames';
import FlipMove from 'react-flip-move';
import { CSSTransition } from 'react-transition-group';
import CardBlock from '../reusable/CardBlock';
import { addListeners, rmvListeners, setData } from '../../helpers/phase2helpers';

class ChaseTheVocab extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      gameData: [],
      clickedIDs: [],
      isVocab: true,
      shuffDuration: 1500,
      shuffDelay: 0,
      shuffRounds: 5,
      compressor: 0.6,
      colors: this.props.colors,
      color: 2,
    }
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setData = setData.bind(this);
  }
  
  componentDidMount(){
    this.addListeners();
    this.setData(this.props.data);
  }

  componentWillUnmount(){ 
    clearInterval(this.intervalID);
    clearInterval(this.timeoutID);
    this.rmvListeners();
  }

  handleGame = () => {
    const dataWID = this.state.data.map((x, i)=>{
      return {
        text: x,
        id: i,
      };
    })
    const gameData = shuffle(dataWID).slice(0,9);
    this.setState({
      gameData,
      clickedIDs: [],
      isAnimating: false,
      isShuffleDone: false,
    });
  }

  handleClick = () => {
    if(this.intervalID) return;
    this.setState({isAnimating: true}, this._startShuffling);
  }

  _startShuffling = () => {
    const { shuffDuration, shuffRounds } = this.state;
    this.intervalID = setInterval(this._handleShuffle, shuffDuration);
    this._stopShuffling(shuffDuration, shuffRounds);
  }

  _stopShuffling(shuffDuration, shuffRounds){
    this.timeoutID = setTimeout(()=>{
      clearInterval(this.intervalID);
      this.setState({isShuffleDone: true});
    }, shuffRounds * shuffDuration);
  }

  _handleShuffle = () => {
    this.setState({ gameData: shuffle(this.state.gameData.slice()) });
  }

  _handleBoxClick = (e) => {
    const { clickedIDs } = this.state;
    const id = Number(e.target.id);
    if(clickedIDs.includes(id)) return;
    this.setState({clickedIDs: [...clickedIDs, id]});
  }

  handleReset = () => { 
    clearInterval(this.intervalID);
    clearInterval(this.timeoutID);
    this.intervalID = null;
    this.timeoutID = null;
    this.handleGame();
  }

  handleKeyEvent = (e) => {
    const { compressor, colors } = this.state;
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.05});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.05});  
    // right arrow was clicked; reset the state and uses sentences
    if(e.keyCode === 39){ this.setState({isVocab:false}, this.handleReset) }
    // left arrow was clicked; reset the game and use vocab
    if(e.keyCode === 37){ this.setState({isVocab:true}, this.handleReset) }
    // c was clicked; change the cards background color
    if(e.keyCode === 67){ this.setState(prevState => {
      if(prevState.color >= colors.length - 1) return {color: 0};
      return {color: prevState.color + 1}});
    };
    
      // push a number key for a difficulty scale
        // 1 - easy
        // 9 - hard

  };

  render(){
    const { compressor, isVocab, colors, isAnimating, isShuffleDone, clickedIDs, color, shuffDuration, shuffDelay } = this.state;
    const boxClass = classNames(
      'box',
      'box-chase',
      { 'box-grid':  isVocab },
      { 'box-list': !isVocab });
    const numClass = classNames(
      boxClass,
      'box-number', 
      { 'box-show-text': isShuffleDone });
    const boxes = this.state.gameData.map((x,i)=>(
      <div 
        key={x.id}
      >
        <CSSTransition
          in={isAnimating && !clickedIDs.includes(i)}
          timeout={0}
          classNames='box-number'
        >
          <CardBlock 
            text={i}
            compressor={compressor}
            boxClass={numClass}
            backColor={colors[color]}
            id={i}
            handleClick={isShuffleDone ? this._handleBoxClick : null}
          />
        </CSSTransition>
        <CardBlock 
          classNames='box'
          text={x.text}
          compressor={compressor}
          boxClass={boxClass}
          backColor={colors[color]} />
      </div>
    ));
    return (
      <FlipMove 
        onClick={!isAnimating ? this.handleClick : null}
        className='container'
        duration={shuffDuration}
        delay={shuffDelay}
      >
        {boxes}
      </FlipMove>
    );
  }
}

export default ChaseTheVocab;