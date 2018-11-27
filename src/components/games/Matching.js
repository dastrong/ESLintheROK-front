import React, { Component } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import ReactFitText from "react-fittext";
import {
  addListeners,
  rmvListeners,
  setData,
  addTitle,
  addGoogEvent,
  resetAndReload
} from "../../helpers/phase2helpers";
import "../../styles/games/Matching.css";

const emptyArr = { clicked: [], matched: [] };
const numBox16 = { numBox: 16, height: "24vh", width: "24vw", ...emptyArr };
const numBox15 = { numBox: 15, height: "19vh", width: "32vw", ...emptyArr };
const numBox12 = { numBox: 12, height: "24vh", width: "32vw", ...emptyArr };
const numBox9 = { numBox: 9, height: "32vh", width: "32vw", ...emptyArr };
const numBox6 = { numBox: 6, height: "32vh", width: "48vw", ...emptyArr };

class Matching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameData: [],
      ...numBox12,
      compressor: 0.6,
      colors: this.props.colors,
      color: 2
    };
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setData = setData.bind(this);
    this.addTitle = addTitle.bind(this);
    this.addGoogEvent = addGoogEvent.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }

  componentDidMount() {
    this.addTitle();
    this.addListeners();
    this.setData(this.props.vocabulary);
  }

  componentWillUnmount() {
    this.rmvListeners();
    this._clearTimeouts();
  }

  componentDidUpdate(x, prevState) {
    this.resetAndReload(1, true);
    const { gameData, clicked, matched } = this.state;
    const gotPoo =
      gameData.length % 2 === 1 && clicked.some(x => gameData[x] === "poo");
    if (
      clicked.length < 2 &&
      prevState.matched.length === matched.length &&
      !gotPoo
    )
      return;
    this.timeoutID = setTimeout(() => this.setState({ clicked: [] }), 1000);
  }

  handleGame = () => {
    this.addGoogEvent();
    this._clearTimeouts();
    const { data, numBox } = this.state;
    const halfData = shuffle(data).slice(0, numBox / 2);
    let gameData = shuffle([
      ...halfData,
      ...halfData,
      ...(numBox % 2 ? ["poo"] : "")
    ]);
    this.setState({
      gameData,
      ...emptyArr
    });
  };

  handleClick = e => {
    const { clicked, matched, gameData } = this.state;
    const isFirst = !clicked.length;
    const isFull = clicked.length === 2;
    const id = Number(e.target.id);
    if (isFull) return;
    if (isFirst) return this.setState({ clicked: [id] });
    if (clicked.includes(id)) return;
    return gameData[clicked[0]] !== gameData[id]
      ? this.setState({ clicked: [...clicked, id] })
      : this.setState({ matched: [...matched, clicked[0], id] });
  };

  handleReset = options =>
    this.setState({ ...options }, () => {
      this.resetID = setTimeout(() => this.handleGame(), 550);
    });

  handleEvents = e => {
    if (this.props.isMenuOpen) return;
    const { compressor } = this.state;
    if (e.type === "wheel") {
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      return e.buttons !== 4
        ? this.setState({ compressor: compressor + c })
        : c < 0
        ? this._increaseBoxes()
        : this._decreaseBoxes();
    }
    // spacebar/enter was clicked; reset the game
    if (e.keyCode === 32 || e.keyCode === 13)
      return this.handleReset({ ...emptyArr });
    // up arrow was clicked; increase the font size
    if (e.keyCode === 38)
      return this.setState({ compressor: compressor - 0.03 });
    // down arrow was clicked; decrease the font size
    if (e.keyCode === 40)
      return this.setState({ compressor: compressor + 0.03 });
    // left arrow was clicked; decrease the num of boxes
    if (e.keyCode === 37) return this._decreaseBoxes();
    // right arrow was clicked; increase the num of boxes
    if (e.keyCode === 39) return this._increaseBoxes();
  };

  _clearTimeouts() {
    clearTimeout(this.timeoutID);
    clearTimeout(this.resetID);
  }

  _increaseBoxes() {
    const { numBox } = this.state;
    if (numBox === 16) return;
    if (numBox === 15) return this.handleReset({ ...numBox16 });
    if (numBox === 12) return this.handleReset({ ...numBox15 });
    if (numBox === 9) return this.handleReset({ ...numBox12 });
    if (numBox === 6) return this.handleReset({ ...numBox9 });
  }

  _decreaseBoxes() {
    const { numBox } = this.state;
    if (numBox === 6) return;
    if (numBox === 16) return this.handleReset({ ...numBox15 });
    if (numBox === 15) return this.handleReset({ ...numBox12 });
    if (numBox === 12) return this.handleReset({ ...numBox9 });
    if (numBox === 9) return this.handleReset({ ...numBox6 });
  }

  render() {
    const {
      compressor,
      gameData,
      clicked,
      matched,
      width,
      height
    } = this.state;
    const boxes = gameData.map((text, i) => {
      const show = clicked.includes(i) || matched.includes(i);
      return (
        <div
          key={i}
          onClick={this.handleClick}
          className="match-holder"
          style={{ width, height }}
        >
          <CSSTransition in={!show} timeout={0} classNames="matcher">
            <div className="match front">{i + 1}</div>
          </CSSTransition>
          <ReactFitText
            compressor={compressor}
            minFontSize={0}
            maxFontSize={100}
          >
            <CSSTransition in={show} timeout={0} classNames="matcher">
              <div className="match back" id={i}>
                {text !== "poo" ? text : "💩"}
              </div>
            </CSSTransition>
          </ReactFitText>
        </div>
      );
    });
    return (
      <div className="match-container" style={{ fontFamily: this.props.font }}>
        {boxes}
      </div>
    );
  }
}

export default Matching;
