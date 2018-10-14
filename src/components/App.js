import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import Routers from './Routers';
import SideBar   from './navInfo/SideBar';
import InfoModal from './navInfo/InfoModal';
import { withRouter } from 'react-router-dom';
import '../styles/App.css';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

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
    };
  }

  setData = (vocabulary, expressions) => {
    this.setState({
      vocabulary, 
      expressions, 
      isGameReady: true,
    });
  };

  componentDidMount(){
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
    const index = location.pathname.indexOf('/start'); 
    const showInfoModal = index !== -1;
    return (
      <Fragment>
        <SideBar {...location} />
        { showInfoModal && <InfoModal path={location.pathname.slice(0,index)} /> }
        <Routers
          sendData={this.setData}
          {...this.state}
          {...this.props}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);