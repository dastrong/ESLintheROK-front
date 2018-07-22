import React, { Component } from "react";
import classNames from 'classnames';
import shuffle from 'shuffle-array';
import Card from '../components/Card';
import Confetti from '../components/Confetti';
import GifModal from '../components/GifModal';
import { Icon } from 'semantic-ui-react';
import { handleGameData, handleAnimations, handleKeyEvent, handleReset, handleClasses, handleClick } from '../helpers'

const xCount = 1;

class WhatsBehind extends Component {
  constructor(props){
    super(props); 
    this.state = {
      allData: {},
      gameData: [],
      Xs: [],
      clickedIDs: [],
      targetedIDs : [],
      gifURLs: [],
      counter: 0,
      colors: ['chocolate', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive'],
      height: '25vh',
      targetedID: null,
      handlingClick: false,
      isResetting: false,
      isVocab: true,
      compressor: 1,
      isGameOver: false
    }
    this.handleGameData   = handleGameData.bind(this);
    this.handleKeyEvent   = handleKeyEvent.bind(this);
    this.handleClick      = handleClick.bind(this);
    this.handleClasses    = handleClasses.bind(this);
    this.handleReset      = handleReset.bind(this);
    this.handleAnimations = handleAnimations.bind(this);
  }

  async componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
    const { data } = this.props;
    const vocabularyData = data.vocabularyData.map(data=>data.text);
    const expressionData = data.expressionData.map(data=>data.text);
    const allData = {vocabularyData, expressionData};
    // returns an array of shuffled data equal to our boxCount variable
    const gameData = this.handleGameData(allData);
    // returns the winning cards location
    const Xs = this._getXs(gameData.length, xCount);
    // fetch all the gif links to show during a win
    const gifURLs = await this._fetchGIF();
    this.setState({allData, gameData, Xs, gifURLs})
  }

  componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  _fetchGIF = async () => {
    const searchTerms = ['fail', 'funny+cat', 'funny+dog'];
    const urls = searchTerms.map(searchTerm=>`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=10&rating=g&api_key=juEv23YnNSJVWcAgT3xhwtEH9AKb56KI`);
    let gifURLs = [];
    await Promise
      .all(urls.map(url=>fetch(url)
      .then(res=> res.json())
      .then(json=>{
        json.data.forEach(gif=>gifURLs.push(gif.images.original.url))
      })
      .catch(err=>console.log(err))
    ));
    return shuffle(gifURLs);
  }

  _getXs = (dataLength, xCount) => {
    return [Math.floor(Math.random()*dataLength)];
  };
  
  render(){
    const {gameData, Xs, clickedIDs, isResetting, compressor, colors, isGameOver, gifURLs, counter} = this.state;
    const containerClasses = classNames('elim-container', { isResetting });
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
      ? <Confetti {...this.props} />
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