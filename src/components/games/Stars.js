import React, { Component } from "react";
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import Card from '../reusable/Card';
import { Icon } from 'semantic-ui-react';
import { 
  handleGameData, handleEvents, handleReset,
} from '../../helpers/phase1helpers';
import { 
  addListeners, rmvListeners, chooseDataSet, setAllData, addTitle, addGoogEvent, resetAndReload
} from '../../helpers/phase2helpers';
import '../../styles/games/Generic.css';

class Stars extends Component {
  constructor(props){
    super(props); 
    this.state = {
      colors: this.props.colors,
      xCount: 8,
      gameData: [],
      clickedIDs: [],
      Xs: [],
      height: '25vh',
      handlingClick: false,
      isResetting: false,
      isVocab: true,
      compressor: 1,
      counter: 0,
      options: { minStars: 0, maxStars: 6}, 
      starColors: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'],
    }
    this.handleGameData = handleGameData.bind(this);
    this.handleEvents   = handleEvents.bind(this);
    this.handleReset    = handleReset.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
    this.chooseDataSet  = chooseDataSet.bind(this);
    this.setAllData     = setAllData.bind(this);
    this.addTitle       = addTitle.bind(this);
    this.addGoogEvent   = addGoogEvent.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }

  componentDidMount(){
    this.addTitle();
    this.addListeners();
    const { vocabulary, expressions } = this.props;
    const allData = { vocabulary, expressions };
    this.setAllData(allData);
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    this._clearTimeouts();
  }

  componentDidUpdate(){
    this.resetAndReload(2);
    if(!this.state.isGameOver) return;
    this.timeout5 = setTimeout(this.handleReset, 3000); 
  }

  handleGame = (isVocab = this.state.isVocab) => {
    this.addGoogEvent();
    this._clearTimeouts();
    const { gameData, Xs, height } = this.handleGameData(isVocab);
    this.setState(prevState=>({
      gameData, 
      Xs,
      height,
      clickedIDs: [],
      clickedID: null, 
      targetedIDs : [],
      targetedID: null,
      isVocab: isVocab === undefined
                ? prevState.isVocab 
                : isVocab,                
      isGameOver: false,
      colors: shuffle([...this.state.colors]),
      starColors: shuffle([...this.state.starColors]),
    }));
  }

  _clearTimeouts = () => {
    clearTimeout(this.timeout4);
    clearTimeout(this.timeout5);
    clearTimeout(this.timeout6);
  }

  _handleCardFlip = (id) => {
    const { clickedIDs, handlingClick, gameData } = this.state;
    // prevents multiple clicks simultaneously
    if(handlingClick) return;
    // copy and spread old state and add new id
    const arr = [...clickedIDs, id];
    this.setState({
      clickedIDs:arr, 
      clickedID:id,
      handlingClick: true      
    }, ()=>{
      // wait a seconds for animations to be complete
      // reset clicking flag variables
      this.timeout6 = setTimeout(()=>{
        this.setState({
          handlingClick:false,
          isGameOver: arr.length === gameData.length
        });
      },1000)
    });
  }
  
  _handleNextCardUp = () => {
    if(this.state.isGameOver) return this.handleReset();
     // copy and sort our clickedIDs
     const sortedIDs = this.state.clickedIDs.slice().sort();
     // start at 0
     let id = 0;
     // determines the next card to be clicked
     while(sortedIDs.includes(id)) id++;
     // flip that card over
     this._handleCardFlip(id);
  }

  handleClick = (e) => {
    // click the front div -- flip that card over
    // click the back div  -- flip the next card over
    e.target.id
      ? this._handleCardFlip(Number(e.target.id))
      : this._handleNextCardUp();
  }

  handleClasses = (i) => {
    const { isVocab, clickedID, clickedIDs } = this.state;
    const classes = classNames('flipper', {
      'flipping':  clickedID === i || clickedIDs.includes(i),
    });
    return isVocab 
      ? classNames(classes, 'vert25')
      : classNames(classes, 'vert33');
  }

  handleMoreEvents = (e) => {
    // numbers being clicked
    if(e.code.includes('Digit')){
      const { minStars, maxStars } = this.state.options;
      const num = Number(e.key);
      if(num === minStars || num >= maxStars) return;
      const options = { minStars: num, maxStars };
      this.setState({ options }, this.handleReset);
    };
  }
  
  render(){
    const {gameData, Xs, isResetting, compressor, colors, starColors} = this.state;
    const containerClasses = classNames('generic-container', { isResetting });
    const cards = gameData.map((card, i) => {
      const cardClasses = this.handleClasses(i);
      const icons = [...Array(Xs[i])].map((x,j)=>
        <Icon
          name='star' 
          color={starColors[i]} 
          size='small'
          key={j}
        />
      );
      return (
        <Card 
          key={i}
          index={i}
          handleClick={this.handleClick}
          classNames={cardClasses}
          frontColor={isResetting ? starColors[8] : colors[i]}
          frontText={isResetting ? '' : card.text}
          backText={isResetting ? '' : icons}
          compressor={compressor}
        />
      );
    });
    return (
      <div className={containerClasses} style={{fontFamily: this.props.font}}> 
        {cards}
      </div>
    );
  }
}

export default Stars;