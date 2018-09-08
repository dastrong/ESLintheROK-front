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
import ChaseTheVocab   from './games/ChaseTheVocab';
import '../styles/App.css';

class App extends Component {
  static defaultProps = {
    vocabularyData: [
      {text:'went'},
      {text:'saw'},
      {text:'rode'},
      {text:'swam'},
      {text:'was'},
      {text:'read'},
      {text:'visited'},
      {text:'played'},
      {text:'ate'},
    ],
    expressionData: [
      {text:'How was your weekend?'},
      {text:'How was your vacation?'},
      {text:'What did you do?'},
      {text:'It was great.'},
      {text:'It was good.'},
      {text:'It was not good.'},
      {text:'I went to a science museum.'},
      {text:'I saw a future car.'},
      {text:'I rode my bike.'},
      {text:'I saw a robot.'},
      {text:'I visited my grandpa.'},
      {text:'I visited my grandma.'},
      {text:'I play computer games.'},
      {text:'I ate delicious food.'},
      {text:'I read many books.'},
      {text:'I swam in a river.'},
      {text:'I went to Jeju-do.'},
      {text:'How was your weekend? It was great.'},
      {text:'How was your vacation? It was great.'},
      {text:'How was your weekend? It was good.'},
      {text:'How was your vacation? It was good.'},
      {text:'How was your weekend? It was not good.'},
      {text:'How was your vacation? It was not good.'},
      {text:'What did you do? I went to a science museum.'},
      {text:'What did you do? I saw a future car.'},
      {text:'What did you do? I rode my bike.'},
      {text:'What did you do? I saw a robot.'},
      {text:'What did you do? I visited my grandpa.'},
      {text:'What did you do? I visited my grandma.'},
      {text:'What did you do? I play computer games.'},
      {text:'What did you do? I ate delicious food.'},
      {text:'What did you do? I read many books.'},
      {text:'What did you do? I swam in a river.'},
      {text:'What did you do? I went to Jeju-do.'},
    ],
    colors: [
      'chocolate', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive', 'violet'
    ],
  }
  constructor(props){
    super(props);
    this.state = {
      isSideBarVisible: false,
      vocabularyData: [],
      expressionData: [],
    };
  }

  showSideBar = () => this.setState({ isSideBarVisible: !this.state.isSideBarVisible });

  hideSideBar = () => this.setState({ isSideBarVisible: false })

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
    const { isSideBarVisible, vocabularyData, expressionData, isDataReady } = this.state;
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
        <Route render={({location})=>{
          const pathName = location.pathname.slice(1,location.pathname.length);
          return (
          <div className="App">
            <SideBar 
              showSideBar={this.showSideBar}
              hideSideBar={this.hideSideBar}
              isSideBarVisible={isSideBarVisible} 
            />
            <InfoModal 
              pathName={pathName}
            />
            <Switch>
              <Route 
                path='/'
                render={()=>
                  <MainPage 
                    showSideBar={this.showSideBar}
                    hideSideBar={this.hideSideBar}
                    isSideBarVisible={isSideBarVisible} 
                  />}
                exact={true}
              />
              <Route 
                path='/data' 
                render={()=> 
                  <DataEntryPage 
                    vocabularyData={vocabularyData}
                    expressionData={expressionData}
                    isDataReady={isDataReady}
                    onSave={this.onSave} 
                    onEdit={this.onEdit} 
                  />}
                exact={true}
              />
              <Route 
                path='/games'
                component={GamesPage}
                exact={true}
              />
              <Route 
                path='/elimination'
                render={()=> 
                  <Elimination 
                      data={data}
                      colors={colors}
                  />}
                exact={true}
              />
              <Route 
                path='/whatsbehind'
                render={()=> 
                  <WhatsBehind 
                    data={data} 
                    colors={colors}
                  />}
                exact={true}
              />
              <Route 
                path='/stars'
                render={()=> 
                  <Stars 
                    data={data} 
                    colors={colors}
                  />}
                exact={true}
              />
              <Route 
                path='/lotto'
                render={()=> 
                  <WordLotto 
                    data={data} 
                    colors={colors}
                  />}
                exact={true}
              />
              <Route 
                path='/sparkle'
                render={()=> 
                  <Sparkle 
                    data={data.expressionData}
                  />}
                exact={true}
              />
              <Route 
                path='/kimchi'
                render={()=> 
                  <Kimchi 
                    data={data.expressionData}
                  />}
                exact={true}
              />
              <Route 
                path='/bowling'
                render={()=> 
                  <Bowling 
                    data={data.vocabularyData}
                    colors={colors}
                  />}
                exact={true}
              />
              <Route 
                path='/chase'
                render={()=> 
                  <ChaseTheVocab
                    data={data.vocabularyData}
                    colors={colors}
                  />}
                exact={true}
              />
            </Switch>
          </div>
        )}} />
      </Router>
    );
  }
}

export default App;