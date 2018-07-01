import React, { Component } from "react";
// import shuffle from 'shuffle-array';
import classNames from 'classnames';
import Card from './Card';
import './EliminationGame.css';

const boxCount = 8;
const xCount = 3;

class EliminationGame extends Component {
  constructor(props){
    super(props);
    // const allData = this.props.data.slice();
    // const gameData = this.handleGameData(allData);
    this.state = {
      // allData,
      // gameData,
      allData: [],
      gameData: [],
      Xs: [],
      clicked: [],
      height: '25vh',
      targetedId: null,
      targetedIds : [],
      resetting: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleGame = this.handleGameData.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
    const allData  = this.props.data.slice();
    // returns an array of shuffled data equal to our boxCount var
    const gameData = this.handleGameData(allData);
    // returns an array of 
    const Xs = this.getXs(gameData).map(x => gameData[x].text);
    this.setState({allData, gameData, Xs})
  }

  componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  handleGameData(data = this.state.allData){
    let arr = [];
    while(arr.length < boxCount){
      const randNum = Math.floor(Math.random()*data.length);
      if(arr.indexOf(randNum) === -1) arr.push(randNum);
    }
    return arr.map((val, i) => ({ 
      text: data[val], 
      id: i, 
      clickTarget: {isCompleted: false, inProgress: false}
    }));
  }
  
  getXs(data){
    let arr = [];
    while(arr.length < xCount){
      const randNum = Math.floor(Math.random()*data.length);
      if(arr.indexOf(randNum) === -1) arr.push(randNum);
    }
    return arr;
  }

  handleClick(e){
    let clickedId = this.state.gameData.find(val => val.text === e.target.textContent).id;
    // sets the id of the card to the left/right
    let targetedId = clickedId % 2 === 0 ? clickedId + 1 : clickedId - 1;
    // flips the cards boolean to show the backside
    const gameData = this.state.gameData.map((data, i) => {
      if(data.text === e.target.textContent) { 
        // sets the clicked cards state for our flip animation
        data = {
          ...data,
          clickTarget: {isCompleted:false, inProgress: true}
        };
      }
      return data;
    });
    // add index of card that was clicked
    const clicked = [...this.state.clicked, clickedId];
    // sets the state and passes a function that handles our animations
    this.setState({gameData, clicked, targetedId: null}, this.handleAnimations(targetedId));
  }

  handleAnimations = (targetedId) => {
    setTimeout(()=>{
      // determines how many cards have been clicked in a row
      const rows = this.state.clicked.reduce((acc, cVal) => {
        if(cVal <= 1) acc.row1++;
        if(cVal >= 6) acc.row4++;
        if(cVal === 2 || cVal === 3) acc.row2++;
        if(cVal === 4 || cVal === 5) acc.row3++;
        return acc;
      }, {'row1': 0, 'row2': 0, 'row3': 0, 'row4': 0, })
      const num_Rows_Flipped = Object.values(rows).filter(val=>val===2);

      let height = this.state.height;
      if(num_Rows_Flipped.length === 1) height='33.3vh';
      if(num_Rows_Flipped.length === 2) height='50vh';
      if(num_Rows_Flipped.length === 3) height='100vh';

      if(this.state.clicked.includes(targetedId)) targetedId = null;
      const gameData = this.state.gameData.map(data => {
        if(data.clickTarget.inProgress){
          data = {...data, clickTarget: {isCompleted:true, inProgress: true}}
        }
        return data;
      });
      this.setState({gameData, height, targetedId, targetedIds: [...this.state.targetedIds, targetedId]}, ()=>{
        // recalls the state after all the animations are done to resize the text
        setTimeout(()=>{
          this.setState({});
        }, 1000)
      })
    },1000)
    
  }

  handleReset(){
    const gameData = this.handleGameData();
    // need to force the state update after 1s, so our font-sizes can re-adjust to their new container width
    this.setState({
      gameData,
      Xs: [],
      clicked: [],
      height: '25vh',
      targetedId: null,
      targetedIds : [],
      resetting: true,
    }, () => {
      setTimeout(()=>{
        this.setState({resetting: false});
      },1000)
    });
  }

  handleKeyEvent(e){
    // r/spacebar/enter was clicked; reset the game
    if(e.keyCode === 82 || e.keyCode === 32 || e.keyCode === 13){
      this.handleReset();
    }
    // s was clicked; reset the state and uses sentences
    if(e.keyCode === 83){
      console.log(e.keyCode)
    }
    // v was clicked; reset the game and use vocab
    if(e.keyCode === 86){
      console.log(e.keyCode)
    }
    // p was clicked; reset the game and use pictures
    if(e.keyCode === 80){
      console.log(e.keyCode)
    }
  }
  
  render(){
    const {gameData, Xs, height, clicked, targetedId, targetedIds} = this.state;
    const containerClasses = classNames('container', {
      resetting: this.state.resetting
    });
    const cards = gameData.map((card, i) => {
      const cardClasses = classNames('flipper', {
        'flipping':     card.clickTarget.inProgress,
        'expanding':    targetedId === i,
        'expanded':     targetedIds.includes(i),
        'slideLeft':    card.clickTarget.isCompleted && i % 2 === 0 && !targetedIds.includes(i),
        'slideRight':   card.clickTarget.isCompleted && i % 2 !== 0 && !targetedIds.includes(i),
        'slideUp':      card.clickTarget.isCompleted && height !== '25vh',
        'vert33':      !card.clickTarget.isCompleted && height === '33.3vh',
        'vert50':      !card.clickTarget.isCompleted && height === '50vh',
        'vert100':     !card.clickTarget.isCompleted && height === '100vh',
        'enlargeText': height !== '25vh' && !clicked.includes(i)
      });
      const colors = ['gold', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive'];
      return (
        <Card 
          key={i}
          index={i}
          name={card.text}
          handleClick={this.handleClick}
          isX={Xs.includes(card.text)}
          frontColor={colors[i]}
          classNames={cardClasses}
        />
      );
    });
    return (
      <div className={containerClasses}>
        {cards}
      </div>
    );
  }
}

export default EliminationGame;