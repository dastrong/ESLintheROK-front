import React, { Component } from "react";
import shuffle from "lodash/shuffle";
import { CSSTransition } from "react-transition-group";
import CardBlock from "../reusable/CardBlock";
import { arrOfRandNum } from "../../helpers/phase1helpers";
import {
  addListeners,
  rmvListeners,
  setAllData,
  addTitle,
  addGoogEvent,
  resetAndReload,
  getRandomNum,
  chooseDataSet,
} from "../../helpers/phase2helpers";
import "./BattleGround.css";
import { pubgStats } from "../../helpers/data";

class BattleGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameData: [],
      items: [],
      isVocab: false,
      scaled: 0,
      stage: 0,
      compressor: 0.6,
    };
    this.CountdownTimer = new Audio(
      "https://res.cloudinary.com/dastrong/video/upload/f_auto/v1543135345/TeacherSite/Media/BattleGround/countdownAudio.mp3"
    );
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setAllData = setAllData.bind(this);
    this.chooseDataSet = chooseDataSet.bind(this);
    this.addTitle = addTitle.bind(this);
    this.addGoogEvent = addGoogEvent.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }

  componentDidMount() {
    const { vocabulary, expressions } = this.props;
    this.addTitle();
    this.addListeners();
    this.setAllData({ vocabulary, expressions });
  }

  componentWillUnmount() {
    this.CountdownTimer.pause();
    this._clearTimers();
    this.rmvListeners();
  }

  componentDidUpdate() {
    this.resetAndReload(2);
  }

  handleGame = () => {
    this.addGoogEvent();
    this._clearTimers();
    this.CountdownTimer.pause();
    const chosenData = this.chooseDataSet(this.state.isVocab);
    const vocabIdx = arrOfRandNum(chosenData.length, 4);
    const items = shuffle(
      vocabIdx.map((x, i) => pubgStats[i][getRandomNum(pubgStats[i].length)])
    );
    const gameData = vocabIdx.map(x => chosenData[x]);
    this.setState({ gameData, items, stage: 0, countdown: 0 });
  };

  handleClick = () => {
    const { stage } = this.state;
    !stage
      ? this._startCountdown()
      : stage === 1
      ? this.setState({ countdown: 0 }, this._startCountdown)
      : stage === 2
      ? this.setState({ stage: 3 })
      : this.handleGame();
  };

  handleReset = () => {
    this._clearTimers();
    this.setState({ scaled: 0 }, this.handleGame);
  };

  handleEvents = e => {
    if (this.props.isMenuOpen) return;
    const { compressor, stage } = this.state;
    if (e.type === "wheel") {
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      const bool = c < 0;
      if (e.buttons === 4) return this._changeSettings({ isVocab: bool });
      if (stage === 3) return;
      return this.setState({ compressor: compressor + c });
    }
    if (e.keyCode === 32 || e.keyCode === 13) return this.handleReset();
    if (e.keyCode === 37) return this._changeSettings({ isVocab: true });
    if (e.keyCode === 39) return this._changeSettings({ isVocab: false });
    if (e.keyCode === 38) return this.setState({ compressor: compressor - 0.03 });
    if (e.keyCode === 40) return this.setState({ compressor: compressor + 0.03 });
  };

  _changeSettings = settingsObj => this.setState(settingsObj, this.handleGame);

  _startCountdown = () => {
    this._clearTimers();
    this.CountdownTimer.currentTime = 0;
    this.CountdownTimer.play();
    this.countdownIdtime = setTimeout(() => {
      this.setState(
        { countdown: 10, stage: 1 },
        () =>
          (this.countdownIDintv = setInterval(() => {
            this.setState(prevState => {
              if (prevState.countdown <= 1) {
                clearInterval(this.countdownIDintv);
                return {
                  stage: 2,
                  countdown: prevState.countdown - 1,
                  scaled: prevState.scaled + 0.03,
                };
              }
              return { countdown: prevState.countdown - 1 };
            });
          }, 1000))
      );
    }, 4500);
  };

  _clearTimers = () => {
    clearTimeout(this.countdownIdtime);
    clearInterval(this.countdownIDintv);
  };

  render() {
    const { scaled, stage, gameData, items, compressor, countdown } = this.state;

    const cornersText = gameData.map((text, i) => (
      <CSSTransition key={text + i} in={stage !== 3} classNames="cornersItem" timeout={0}>
        <CardBlock text={text} compressor={compressor} id={text} boxClass="corner" />
      </CSSTransition>
    ));

    const cornersItem = items.map((item, i) => {
      const color = item.points.includes("-") ? "red" : "green";
      return (
        <CSSTransition
          key={item.name + i}
          timeout={0}
          in={stage === 3}
          classNames="cornersItem"
        >
          <div
            className="corner cornersItem"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dastrong/image/upload/f_auto/v1543130357/TeacherSite/Media/BattleGround/images/${
                item.name
              }.png)`,
              color,
            }}
          >
            {item.points}
          </div>
        </CSSTransition>
      );
    });

    return (
      <div
        className="battleground-container"
        onClick={this.handleClick}
        style={{ fontFamily: this.props.font }}
      >
        <div
          className="blue-zone"
          style={{ transform: `scale(${stage === 1 ? 0.97 : 1}` }}
        />
        <img
          src="https://res.cloudinary.com/dastrong/image/upload/f_auto/v1543135348/TeacherSite/Media/BattleGround/pubgMap.jpg"
          alt="map background"
          style={{
            transform: `scale(${1 + scaled}) translate(-${scaled * 12}vw, ${scaled}vh)`,
          }}
        />
        <div className="corner-holder">{cornersText}</div>
        <div className="corner-holder">{cornersItem}</div>
        {countdown && <div className="countdown-timer">{countdown}</div>}
      </div>
    );
  }
}

export default BattleGround;
