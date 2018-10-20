import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import Routers from './Routers';
import SideBar   from './navInfo/SideBar';
import InfoModal from './navInfo/InfoModal';
import { withRouter } from 'react-router-dom';
import { games } from '../helpers/data';
import "typeface-bree-serif";
import "typeface-mali";
import "typeface-niramit";
import "typeface-poppins";
import "typeface-muli";
import "typeface-quicksand";
import '../styles/App.css';

class App extends Component {
  static defaultProps = {
    colors: [
      'chocolate', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive', 'violet'
    ],
  }
  constructor(props){
    super(props);
    this.state = {
      vocabulary: [],
      expressions: [],
      isGameReady: false,
      font: 'Poppins, sans-serif'
    };
  }

  setData = (vocabulary, expressions) => {
    this.setState({
      vocabulary, 
      expressions, 
      isGameReady: true,
    });
  };

  changeFont = (newFont) => this.setState({font:newFont})

  componentDidMount(){
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
    const page = this.props.location.pathname;
    ReactGA.set({page})
    ReactGA.pageview(page)
  }

  componentDidUpdate(prevProps){
    const lastPage = prevProps.location.pathname;
    const currentPage = this.props.location.pathname;
    if(currentPage === lastPage) return;
    ReactGA.set({page: currentPage})
    ReactGA.pageview(currentPage)
  }

  render() {
    const { location } = this.props;
    const inGame = location.pathname.includes('start');
    const [gameData] = games.filter(({ router }) => location.pathname.includes(router.path));
    return (
      <Fragment>
        <SideBar
          opacity={location.pathname === '/' ? 1 : 0}
          {...location}
        />
        {inGame && this.state.isGameReady && 
          <InfoModal 
            opacity={0}
            gameData={gameData}
            changeFont={this.changeFont}
            font={this.state.font}
          /> }
        <Routers
          sendData={this.setData}
          changeFont={this.changeFont}
          gameData={gameData}
          {...this.state}
          {...this.props}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);