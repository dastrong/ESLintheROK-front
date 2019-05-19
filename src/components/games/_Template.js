import React, { Component } from "react";
import ReactFitText from "react-fittext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import shuffle from "lodash/shuffle";
import classNames from "classnames";
import { arrOfRandNum } from "../../helpers/phase1helpers";
import {
  addListeners,
  rmvListeners,
  setData,
  setAllData,
  addTitle,
  addGoogEvent,
  resetAndReload,
} from "../../helpers/phase2helpers";
// import "./CSSFILEHERE.css";
import { sampleData } from "../../helpers/data";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameData: [],
      isVocab: true,
      compressor: 0.6,
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
    // choose data source
    // const { vocabulary, expressions } = this.props;
    // const allData = { vocabulary, expressions };
    // this.setAllData(sampleData);
    // this.setData(sampleData.vocabulary);
  }

  componentWillUnmount() {
    this.rmvListeners();
  }

  handleEvents = e => {};

  render() {
    return <div>Game Here</div>;
  }
}

export default Template;
