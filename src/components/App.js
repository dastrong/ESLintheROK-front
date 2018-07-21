import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBarMain     from '../components/SideBarMain';
import InfoModal       from '../components/InfoModal';
import MainPage        from '../components/MainPage';
import DataEntryPage   from '../components/dataEntry/DataEntryPage';
import EliminationGame from '../components/EliminationGame';
import StarsWritingGame from '../components/StarsWritingGame';
import WhatsBehind     from '../components/WhatsBehind';
import GamesPage       from '../components/GamesPage';
import '../styles/App.css';

class App extends Component {
  static defaultProps = {
    vocabularyData: [
      {text:'fruit'},
      {text:'banana'},
      {text:'grape'},
      {text:'purple'},
      {text:'green'},
      {text:'red'},
      {text:'blue'},
      {text:'raspberry'},
    ],
    expressionData: [
      {text:'I like fruit.'},
      {text:'I like banana.'},
      {text:'I like grape.'},
      {text:'I like purple.'},
      {text:'I like green.'},
      {text:'I like red.'},
      {text:'I like blue.'},
      {text:'I like raspberry.'},
    ]
  }
  constructor(props){
    super(props);
    this.state = {
      vocabularyData: [],
      expressionData: [],
      isDataReady: false, 
      games: [
        {name: 'EliminationGame',  isActive: true},
        {name: 'WhatsBehind',      isActive: false},
        {name: 'StarsWriting',     isActive: false},
        {name: 'WordLotto',        isActive: false},
      ],
    };
  }

  // save a new entry
  onSave = (newEntry, isVocab) => {
    // const data = isVocab ? 'vocabularyData' : 'expressionsData';
    if(isVocab){
      const vocabularyData = [...this.state.vocabularyData, newEntry];
      const isDataReady = vocabularyData.length >= 8;
      this.setState({vocabularyData, isDataReady});
    } else {
      const expressionData = [...this.state.expressionData, newEntry];
      const isDataReady = expressionData.length >= 8;
      this.setState({expressionData, isDataReady});
    }
  }
  // redeclare the whole state to reflect our edited/deleted item
  onEdit = (data, isVocab) => {
    if(isVocab){
      const isDataReady = data.length >= 8;
      this.setState({vocabularyData:data, isDataReady});
    } else {
      const isDataReady = data.length >= 8;
      this.setState({expressionData:data, isDataReady});
    }
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
    const { vocabularyData, expressionData, isDataReady } = this.state;
    let data;
    // if there's no data, send default props
    if(vocabularyData.length<8 && expressionData.length<6){
      data = {vocabularyData: this.props.vocabularyData, expressionData: this.props.expressionData}
    } else {
      data = {vocabularyData, expressionData};
    }
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
                   render={()=> 
                    <DataEntryPage 
                      vocabularyData={vocabularyData}
                      expressionData={expressionData}
                      isDataReady={isDataReady}
                      onSave={this.onSave} 
                      onEdit={this.onEdit} 
                   />}
                   exact={true} />
            <Route path='/games'
                   component={GamesPage}
                   exact={true} />
            <Route path='/elimination'
                   render={()=> <EliminationGame data={data} />}
                   exact={true} />
            <Route path='/stars'
                   render={()=> <StarsWritingGame data={data} />}
                   exact={true} />
            <Route path='/whatsbehind'
                   render={()=> <WhatsBehind data={data} />}
                   exact={true} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;