import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar         from './navInfo/SideBar';
import InfoModal       from './navInfo/InfoModal';
import MainPage        from './pages/MainPage';
import GamesPage       from './pages/GamesPage';
import DataEntryPage   from './pages/dataEntry/DataEntryPage';
import Elimination     from './games/Elimination';
import Stars           from './games/Stars';
import WhatsBehind     from './games/WhatsBehind';
import WordLotto       from './games/WordLotto';
import Sparkle         from './games/Sparkle';
import Kimchi          from './games/Kimchi';
import Bowling         from './games/Bowling';
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
      {text:'pink'},
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
    ],
    colors: [
      'chocolate', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive', 'violet'
    ],
  }
  constructor(props){
    super(props);
    this.state = {
      vocabularyData: [],
      expressionData: [],
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

  render() {
    const { vocabularyData, expressionData, isDataReady } = this.state;
    const { colors } = this.props;
    let data;
    // if there's no data, send default props
    if(vocabularyData.length < 8 && expressionData.length < 6){
      data = {vocabularyData: this.props.vocabularyData, expressionData: this.props.expressionData}
    } else {
      data = {vocabularyData, expressionData};
    }
    return (
      <Router>
        <div className="App">
          <SideBar />
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
                   render={()=> <Elimination data={data} colors={colors} />}
                   exact={true} />
            <Route path='/whatsbehind'
                   render={()=> <WhatsBehind data={data} colors={colors} />}
                   exact={true} />
            <Route path='/stars'
                   render={()=> <Stars data={data} colors={colors} />}
                   exact={true} />
            <Route path='/lotto'
                   render={()=> <WordLotto data={data} colors={colors} />}
                   exact={true} />
            <Route path='/sparkle'
                   render={()=> <Sparkle data={data.expressionData} />}
                   exact={true} />
            <Route path='/kimchi'
                   render={()=> <Kimchi data={data.expressionData} />}
                   exact={true} />
            <Route path='/bowling'
                   render={()=> <Bowling data={data.vocabularyData} colors={colors} />}
                   exact={true} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;