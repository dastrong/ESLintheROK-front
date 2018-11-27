import React, { Component } from "react";
import ReactFitText from "react-fittext";
import { arrOfRandNum } from "../../helpers/phase1helpers";
import {
  addListeners,
  rmvListeners,
  setData,
  addTitle,
  addGoogEvent,
  resetAndReload
} from "../../helpers/phase2helpers";
import "../../styles/games/RedAndBlue.css";

class RedAndBlue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameData: [],
      compressor: 0.6
    };
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setData = setData.bind(this);
    this.addTitle = addTitle.bind(this);
    this.addGoogEvent = addGoogEvent.bind(this);
    this.arrOfRandNum = arrOfRandNum.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }

  componentDidMount() {
    this.addTitle();
    this.addListeners();
    this.setData(this.props.vocabulary);
  }

  componentWillUnmount() {
    this.rmvListeners();
  }

  componentDidUpdate() {
    this.resetAndReload(1, true);
  }

  handleGame = () => {
    this.addGoogEvent();
    const indexes = arrOfRandNum(this.state.data.length, 2);
    const gameData = indexes.map(x => this.state.data[x]);
    this.setState({ gameData });
  };

  handleEvents = e => {
    if (this.props.isMenuOpen) return;
    const { compressor } = this.state;
    if (e.type === "wheel") {
      if (e.buttons) return;
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      return this.setState({ compressor: compressor + c });
    }
    // spacebar/enter was clicked; reset the game
    if (e.keyCode === 32 || e.keyCode === 13) return this.handleGame();
    // up arrow was clicked; increase the font size
    if (e.keyCode === 38)
      return this.setState({ compressor: compressor - 0.03 });
    // down arrow was clicked; decrease the font size
    if (e.keyCode === 40)
      return this.setState({ compressor: compressor + 0.03 });
  };

  render() {
    const { compressor, gameData } = this.state;
    const boxes = gameData.map((text, i) => {
      const color = i ? "blue" : "red";
      return (
        <div key={color} className={`outer-color ${color}`}>
          <hr className="st-line" />
          <hr className="nd-line" />
          <hr className="rd-line" />
          <hr className="th-line" />
          <ReactFitText
            compressor={compressor}
            minFontSize={0}
            maxFontSize={500}
          >
            <div className={`inner-color ${color}`}>{text}</div>
          </ReactFitText>
        </div>
      );
    });
    return (
      <div
        className="redblue-container"
        onClick={this.handleGame}
        style={{ fontFamily: this.props.font }}
      >
        {boxes}
      </div>
    );
  }
}

export default RedAndBlue;
