import React, { Component } from 'react';
import ReactFitText from 'react-fittext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { arrOfRandNum } from '../../helpers/phase1helpers';
import { 
  addListeners, rmvListeners, setAllData, chooseDataSet, addTitle, addGoogEvent, resetAndReload
 } from '../../helpers/phase2helpers';
import '../../styles/games/HotPotato.css';

class HotPotato extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      gameData: [],
      isVocab: true,
      numOfText: 3,
      compressor: 1,
    }
    this.Bubbling  = new Audio('https://res.cloudinary.com/dastrong/video/upload/v1540601372/TeacherSite/Media/HotPotato/Bubbling.mp3');
    this.Scream    = new Audio('https://res.cloudinary.com/dastrong/video/upload/v1540601372/TeacherSite/Media/HotPotato/Scream.mp3');
    this.HotPotato = new Audio('https://res.cloudinary.com/dastrong/video/upload/v1540601372/TeacherSite/Media/HotPotato/HotPotato.mp3');
    this.Sizzle    = new Audio('https://res.cloudinary.com/dastrong/video/upload/v1540601372/TeacherSite/Media/HotPotato/Sizzle.mp3');
    this.addListeners = addListeners.bind(this);
    this.rmvListeners = rmvListeners.bind(this);
    this.setAllData   = setAllData.bind(this);
    this.chooseDataSet= chooseDataSet.bind(this);
    this.addTitle     = addTitle.bind(this);
    this.addGoogEvent = addGoogEvent.bind(this);
    this.arrOfRandNum = arrOfRandNum.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }
  
  componentDidMount(){
    const { vocabulary, expressions } = this.props;
    // loops the in game audio
    this.HotPotato.addEventListener('ended', this.HotPotato.play)
    this.addTitle();
    this.addListeners();
    this.setAllData({ vocabulary, expressions });
  }

  componentWillUnmount(){
    this.HotPotato.removeEventListener('ended', this.HotPotato.play);
    this._stopSounds();
    this._clearTimers();
    this.rmvListeners();
  }

  componentDidUpdate(x, prevState){
    this.resetAndReload(2);
    const { countdown, stage, compressor } = this.state;
    if(prevState.compressor !== compressor) return;
    if(prevState === this.state) return;
    if(stage === 2) return this.onStart();
    if(stage === 3) return this.onStop();
    if(countdown === 3) return this.Bubbling.play();
    if(countdown === 1) return this.Scream.play();
  }

  handleGame = () => {
    const { isVocab, numOfText } = this.state;
    this.addGoogEvent();
    this._clearTimers();
    this._stopSounds();
    const chosenData = this.chooseDataSet(isVocab);
    const indexes = arrOfRandNum(chosenData.length, numOfText);
    const gameData = indexes.map(x=>chosenData[x]);
    this.setState({ 
      gameData,
      stage: 1,
      countdown: 0,
    });
  }
 
  handleEvents = (e) => {
    if(this.props.showDataModal) return;
    const { compressor, isVocab, stage } = this.state;
    if(e.type === 'wheel'){
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      const bool = c < 0;
      if(e.buttons === 4) return this._changeSettings({ isVocab: bool, numOfText: bool ? 1 : 3 });
      if(stage !== 3) return;
      return this.setState({ compressor: compressor + c });
    }
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleGame();
    if(e.keyCode === 37) return this._changeSettings({ isVocab: true, numOfText: 3 });
    if(e.keyCode === 39) return this._changeSettings({ isVocab: false, numOfText: 1 });
    if(e.keyCode === 38 && stage === 3) return this.setState({compressor:compressor - 0.03});
    if(e.keyCode === 40 && stage === 3) return this.setState({compressor:compressor + 0.03});  
    if(e.code.includes('Digit')){
      const key = Number(e.key);
      if(!key || key > 3 || !isVocab) return;
      this._changeSettings({ numOfText: key });
    };
  };

  handleClick = () => {
    const { stage, countdown } = this.state;
    if(stage === 1 && !countdown) return this._startCountdown();
    if(stage === 2) return this._stopGame();
    if(stage === 3) return this._changeSettings({ stage:1 });
  }

  onStart = () => { 
    this.HotPotato.volume = 0.05;
    this.soundID = setInterval(()=>{
      if(this.HotPotato.volume < 0.85) return this.HotPotato.volume += 0.15;
      clearInterval(this.soundID);
    }, 400)
    this.HotPotato.play();
  }

  onStop = () => {
    this.HotPotato.pause();
    this.Sizzle.volume = 1;
    this.sizzleID = setInterval(()=>{
      if(this.Sizzle.volume > 0.1) return this.Sizzle.volume -= 0.1;
      clearInterval(this.sizzleID);
    }, 150);
    this.Sizzle.play();
  }

  _clearTimers = () => {
    clearInterval(this.countdownID);
    clearInterval(this.soundID);
    clearInterval(this.sizzleID);
  }

  _stopSounds = () => {
    const sounds = ['Bubbling', 'Scream', 'HotPotato', 'Sizzle'];
    sounds.forEach(sound=>{
      this[sound].pause();
      this[sound].currentTime = 0;
    });
  }

  _changeSettings = options => this.setState({ ...options }, this.handleGame);

  _startCountdown = () => {
    clearInterval(this.countdownID);
    this.setState({ countdown: 3 }, () =>
      this.countdownID = setInterval(()=>{
        this.setState(prevState=> {
          if(prevState.countdown <= 1) {
            clearInterval(this.countdownID);
            return { stage: 2, countdown: prevState.countdown - 1 }
          }
          return { countdown: prevState.countdown - 1 }
        });
      }, 1000)
    );
  }

  _stopGame = () => this.setState({ stage: 3 });

  render(){
    const { compressor, gameData, stage, countdown } = this.state;
    const words = gameData.map((text, i)=>(
      <CSSTransition
        key={i}
        in={stage === 3}
        classNames='hotpotato-text'
        timeout={i * 400}
      >
        <p>{text}</p>
      </CSSTransition>
    ));
    return (
      <div 
        className='hotpotato-container'
        onClick={this.handleClick}
        style={{fontFamily: this.props.font}}
      >
        <CSSTransition
          in={stage === 1}
          classNames='hotpotato-img'
          timeout={550}
        >
          <div className='hotpotato-countdown'>
            <img 
              src='https://res.cloudinary.com/dastrong/image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoesBoiling.gif' 
              alt='potatoes-boiling'
              />
          </div>
        </CSSTransition>
        <CSSTransition
          in={stage === 2}
          classNames='hotpotato-img'
          timeout={550}
        >
          <div className='hotpotato-active'>
            <img
              src='https://res.cloudinary.com/dastrong/image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoDancing.gif'
              alt='potato-dancing'
              />
          </div>
        </CSSTransition>
        <CSSTransition
          in={stage === 3}
          classNames='hotpotato-img'
          timeout={550}
        >
          <div className='hotpotato-finished'>
            <img
              src='https://res.cloudinary.com/dastrong/image/upload/f_auto,q_50/v1540469924/TeacherSite/Media/HotPotato/potatoCooling.gif'
              alt='potato-relaxing'
            />
            <TransitionGroup>
              <ReactFitText
                compressor={compressor}
                minFontSize={0}
                maxFontSize={500}
              >
                <div className='hotpotato-text'>
                  {words}
                </div>
              </ReactFitText>
            </TransitionGroup>
          </div>
        </CSSTransition>
        { countdown && <p className='countdown-timer'>{countdown}</p> }
      </div>
    );
  }
}

export default HotPotato;