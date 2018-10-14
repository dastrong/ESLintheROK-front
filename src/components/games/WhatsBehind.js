import React, { Component } from "react";
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import Card from '../reusable/Card';
import Confetti from '../reusable/Confetti';
import GifModal from '../reusable/GifModal';
import { Icon } from 'semantic-ui-react';
import { 
  handleGameData, handleAnimations, handleEvents, handleReset, handleClasses, handleClick
} from '../../helpers/phase1helpers';
import { 
  addListeners, rmvListeners, chooseDataSet, setAllData 
} from '../../helpers/phase2helpers';
import '../../styles/games/Generic.css';

class WhatsBehind extends Component {
  constructor(props){
    super(props); 
    this.state = {
      colors: this.props.colors,
      xCount: 1,
      gameData: [],
      clickedIDs: [],
      Xs: [],
      height: '25vh',
      handlingClick: false,
      isResetting: false,
      isVocab: true,
      compressor: 1,
      counter: 0,
      gifURLs: [],
    }
    this.handleGameData   = handleGameData.bind(this);
    this.handleEvents     = handleEvents.bind(this);
    this.handleClick      = handleClick.bind(this);
    this.handleClasses    = handleClasses.bind(this);
    this.handleReset      = handleReset.bind(this);
    this.handleAnimations = handleAnimations.bind(this);
    this.addListeners     = addListeners.bind(this);
    this.rmvListeners     = rmvListeners.bind(this);
    this.chooseDataSet    = chooseDataSet.bind(this);
    this.setAllData       = setAllData.bind(this);
  }

  async componentDidMount(){
    this.addListeners();
    const gifURLs = await this._fetchGIF();
    const { vocabulary, expressions } = this.props;
    const allData = { vocabulary, expressions };
    this.setAllData(allData, {gifURLs});
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
    clearTimeout(this.timeout4);
  }

  handleGame = (isVocab = this.state.isVocab) => {
    const { gameData, Xs, height } = this.handleGameData(isVocab);
    this.setState(prevState=>({
      gameData, 
      Xs,
      height,
      clickedIDs: [],
      targetedIDs : [],
      targetedID: null,
      isVocab: isVocab === undefined
                ? prevState.isVocab 
                : isVocab,                
      isGameOver: false,
      colors: shuffle([...this.state.colors]),
    }));
  }

  _fetchGIF = async () => {
    const searchTerms = ['kpop', 'fail'];
    const urls = searchTerms.map(searchTerm=>`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=20&rating=g&api_key=${process.env.REACT_APP_GIPHY_KEY}`);
    let gifURLs = [];
    await Promise
    .all(urls.map(url=>fetch(url)
      .then(res=> res.json())
      .then(({data})=>{
        data.forEach(({images})=>gifURLs.push(images.original.url))
      })
      .catch(err=>console.log(err))
    ));
    return shuffle(gifURLs);
  }
  
  render(){
    const {gameData, Xs, clickedIDs, isResetting, compressor, colors, isGameOver, gifURLs, counter} = this.state;
    const containerClasses = classNames('generic-container', { isResetting });
    const cards = gameData.map((card, i) => {
      const allCardClasses = this.handleClasses(card, i);
      const isX = Xs.includes(i);
      return (
        <Card 
          key={i}
          index={i}
          handleClick={this.handleClick}
          classNames={allCardClasses}
          frontColor={colors[i]}
          frontText={card.text}
          backColor={isX ? 'gold' : 'white'}
          backText={isX ? <Icon name='trophy' size='large' /> : ''}
          compressor={compressor}
        />
      );
    });
    const confetti = Xs.length > 0 && Xs.every(X=>clickedIDs.includes(X))
      ? <Confetti 
          height={window.innerHeight}
          width={window.innerWidth}
          recycle={true}
          numberOfPieces={400}
          gravity={0.35}
        />
      : null;
    const gif = isGameOver
      ? <GifModal handleReset={this.handleReset} 
                  url={gifURLs[counter]} />
      : null;
    return (
      <div className={containerClasses}>
        {cards}
        {confetti}
        {gif}
      </div>
    );
  }
}

export default WhatsBehind;