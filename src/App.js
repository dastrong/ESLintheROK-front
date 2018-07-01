import React, { Component } from 'react';
import SideBarMain from './SideBarMain';
import InfoModal from './InfoModal';
import MainPage from './MainPage';
import LessonHolder from './LessonHolder';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAnyGameActive: false,
      games: [
        {name: 'EliminationGame',  isActive: false},
        {name: 'WhatsBehind',  isActive: false},
        {name: 'StarsWriting', isActive: false},
        {name: 'WordLotto',    isActive: false},
      ],
    };
  }

  handleHomeClick = () => {
    const games = this.state.games.map(game => {
      game.isActive = false;
      return game
    });
    this.setState({
      isAnyGameActive: false,
      games
    })
  }

  render() {
    const {isAnyGameActive, games} = this.state;
    let content = <MainPage />
    if(isAnyGameActive){
      const activeGame = games.filter(game => game.isActive);
      content = <LessonHolder name={activeGame[0].name}/>
    }
    return (
      <div className="App">
        <SideBarMain handleHomeClick={this.handleHomeClick} />
        <InfoModal />
        {content}
      </div>
    );
  }
}

export default App;