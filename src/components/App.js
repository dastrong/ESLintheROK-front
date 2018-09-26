import React, { Component, Fragment } from 'react';
import Routers from './Routers';
import SideBar   from './navInfo/SideBar';
import InfoModal from './navInfo/InfoModal';
import { withRouter } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  static defaultProps = {
    // vocabularyData: [
    //   {text:'come'},
    //   {text:'Can I'},
    //   {text:'sit'},
    //   {text:'here'},
    //   {text:'touch'},
    //   {text:'sure'},
    //   {text:'sorry'},
    //   {text:'wait'},
    //   {text:'ahead'},
    //   {text:'play'},
    //   {text:'use'},
    //   {text:'cut'},
    // ],
    // expressionData: [
    //   {text:'Can I come in?'},
    //   {text:'Can I sit here?'},
    //   {text:'Can I use it?'},
    //   {text:'Can I play it?'},
    //   {text:'Can I touch it?'},
    //   {text:'Can I cut it?'},
    //   {text:'Sure, go ahead.'},
    //   {text:'Can I come in? Yes, you can.'},
    //   {text:'Can I come in? Sure, go ahead.'},
    //   {text:"Can I come in? No, you can't"},
    //   {text:"Can I come in? Sorry, you can't"},
    //   {text:'Can I sit here? Yes, you can.'},
    //   {text:'Can I sit here? Sure, go ahead.'},
    //   {text:"Can I sit here? No, you can't"},
    //   {text:"Can I sit here? Sorry, you can't"},
    //   {text:'Can I use it? Yes, you can.'},
    //   {text:'Can I use it? Sure, go ahead.'},
    //   {text:"Can I use it? No, you can't"},
    //   {text:"Can I use it? Sorry, you can't"},
    //   {text:'Can I play it? Yes, you can.'},
    //   {text:'Can I play it? Sure, go ahead.'},
    //   {text:"Can I play it? No, you can't"},
    //   {text:"Can I play it? Sorry, you can't"},
    //   {text:'Can I touch it? Yes, you can.'},
    //   {text:'Can I touch it? Sure, go ahead.'},
    //   {text:"Can I touch it? No, you can't"},
    //   {text:"Can I touch it? Sorry, you can't"},
    //   {text:'Can I cut it? Yes, you can.'},
    //   {text:'Can I cut it? Sure, go ahead.'},
    //   {text:"Can I cut it? No, you can't"},
    //   {text:"Can I cut it? Sorry, you can't"},
    //   {text:'Sure, go ahead.'},
    //   {text:'Yes, you can.'},
    //   {text:"Sorry, you can't."},
    //   {text:"No, you can't."},
    // ],
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
      isGameReady: false,
    };
  }

  showSideBar = () => this.setState({ isSideBarVisible: !this.state.isSideBarVisible })

  hideSideBar = () => this.setState({ isSideBarVisible: false })

  setData = (vocabularyData, expressionData) => {
    this.setState({
      vocabularyData, 
      expressionData, 
      isGameReady: true,
    });
  };

  render() {
    const { location } = this.props;
    const index = location.pathname.indexOf('/start'); 
    const showInfoModal = index !== -1;
    return (
      <Fragment>
        <SideBar 
          showSideBar={this.showSideBar}
          hideSideBar={this.hideSideBar}
          isSideBarVisible={this.state.isSideBarVisible} 
          {...location}
        />
        { 
          showInfoModal
            ? <InfoModal path={location.pathname.slice(1,index)} />
            : null 
        }
        <Routers
          sendData={this.setData}
          showSideBar={this.showSideBar}
          hideSideBar={this.hideSideBar}
          isSideBarVisible={this.state.isSideBarVisible}
          {...this.state}
          {...this.props}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);