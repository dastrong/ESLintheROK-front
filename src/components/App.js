import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import Routers from "./Routers";
import SideBar from "./navInfo/SideBar";
import InfoModal from "./navInfo/InfoModal";
import DataModal from "./navInfo/DataModal";
import { withRouter } from "react-router-dom";
import { games } from "../helpers/data";
import "typeface-bree-serif";
import "typeface-mali";
import "typeface-niramit";
import "typeface-poppins";
import "typeface-muli";
import "typeface-quicksand";
import "../styles/App.css";

class App extends Component {
  static defaultProps = {
    colors: [
      "chocolate",
      "purple",
      "darkslateblue",
      "aqua",
      "teal",
      "fuchsia",
      "plum",
      "olive",
      "violet"
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      vocabulary: [],
      expressions: [],
      isGameReady: false,
      showDataModal: false,
      showSideBar: false,
      font: "Poppins, sans-serif"
    };
  }

  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
    const page = this.props.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  componentDidUpdate(prevProps) {
    if (this.state.dataUpdated) return this.setState({ dataUpdated: false });
    const lastPage = prevProps.location.pathname;
    const currentPage = this.props.location.pathname;
    if (currentPage === lastPage) return;
    ReactGA.set({ page: currentPage });
    ReactGA.pageview(currentPage);
  }

  setData = (vocabulary, expressions) => {
    this.setState({
      vocabulary,
      expressions,
      isGameReady: true,
      showDataModal: false,
      showSideBar: false,
      dataUpdated: true
    });
  };

  changeFont = newFont => this.setState({ font: newFont });

  openDataModal = name =>
    this.setState({ showDataModal: true, dataModalName: name });

  closeDataModal = () => this.setState({ showDataModal: false });

  openSideBar = () => this.setState({ showSideBar: !this.state.showSideBar });

  closeSideBar = () => this.setState({ showSideBar: false });

  render() {
    const { isGameReady, font, showDataModal, showSideBar } = this.state;
    const { location } = this.props;
    const inGame = location.pathname.includes("start");
    const [gameData] = games.filter(({ router }) =>
      location.pathname.includes(router.path)
    );
    return (
      <Fragment>
        <SideBar
          opacity={location.pathname === "/" ? 1 : 0}
          openDataModal={this.openDataModal}
          isGameReady={isGameReady}
          showSideBar={showSideBar}
          openSideBar={this.openSideBar}
          closeSideBar={this.closeSideBar}
          {...location}
        />
        {inGame && isGameReady && (
          <InfoModal
            inGame={true}
            opacity={0}
            gameData={gameData}
            changeFont={this.changeFont}
            font={font}
          />
        )}
        <DataModal
          closeModal={this.closeDataModal}
          sendData={this.setData}
          {...this.state}
        />
        <Routers
          sendData={this.setData}
          // stops a games handleEvents function from running if either are open
          isMenuOpen={showDataModal || showSideBar}
          openDataModal={this.openDataModal}
          closeDataModal={this.closeDataModal}
          openData={this.openData}
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
