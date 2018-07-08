import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SideBarMain     from '../components/SideBarMain';
import InfoModal       from '../components/InfoModal';
import MainPage        from '../components/MainPage';
import LessonHolder    from '../components/LessonHolder';
import EliminationGame from '../components/EliminationGame';
import GamesPage       from '../components/GamesPage';
import '../styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAnyGameActive: true,
      games: [
        {name: 'EliminationGame',  isActive: true},
        {name: 'WhatsBehind',      isActive: false},
        {name: 'StarsWriting',     isActive: false},
        {name: 'WordLotto',        isActive: false},
      ],
    };
  }

  handleHomeClick = () => {
    // const games = this.state.games.map(game => {
    //   game.isActive = false;
    //   return game
    // });
    // this.setState({
    //   isAnyGameActive: false,
    //   games
    // });
  }

  render() {
    const data = ['apple', 'banana', 'pear', 'grape', 'strawberry', 'orange', 'raspberry', 'blueberry', 'mango'];
    return (
      <Router>
        <div className="App">
          <SideBarMain handleHomeClick={this.handleHomeClick} />
          <InfoModal />
          <Switch>
            <Route path='/'
                   component={MainPage}
                   exact={true} />
            <Route path='/data' 
                   component={LessonHolder}
                   exact={true} />
            <Route path='/games'
                   component={GamesPage}
                   exact={true} />
            <Route path='/elimination'
                   render={()=> <EliminationGame data={data} />}
                   exact={true} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;