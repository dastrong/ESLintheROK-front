import React, { Component } from 'react';
import TextBox from '../reusable/TextBox';
import Emoji from '../reusable/Emoji';
import ShowUpdatedSetting from '../reusable/ShowUpdatedSetting';
import { CSSTransition } from 'react-transition-group';
import { 
  setData, getRandomNum, getRandomIndex, addListeners, rmvListeners, addTitle, addGoogEvent, resetAndReload
} from '../../helpers/phase2helpers';
import '../../styles/games/Kimchi.css';

class Kimchi extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.8,
      frequencyPercent: 50,
      isKimchi: null,
      data: [],
      text: '',
      textIndex: undefined,
      showAnswer: false,
      gameReady: false,
    };
    this.setData        = setData.bind(this);
    this.getRandomNum   = getRandomNum.bind(this);
    this.getRandomIndex = getRandomIndex.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
    this.addTitle       = addTitle.bind(this);
    this.addGoogEvent   = addGoogEvent.bind(this);
    this.resetAndReload = resetAndReload.bind(this);
  }

  componentDidMount(){
    this.addTitle();
    this.addListeners();
    this.setData(this.props.expressions);  
  }

  componentWillUnmount(){ 
    this.rmvListeners();
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeoutID);
  }

  componentDidUpdate(){
    this.resetAndReload(1);
  }

  handleGame = (data = this.state.data) => {
    this.addGoogEvent();
    const random = this.getRandomIndex(data.length);
    const isKimchi = this._isKimchiLogic(this.state.frequencyPercent);
    this.setState({
      text: data[random],
      textIndex: random,
      showAnswer: false,
      isKimchi,
      gameReady: true,
    });
  }

  handleClick = () => {
    if(this.state.noClick) return;
    !this.state.showAnswer 
    ? this.setState({showAnswer:true, noClick:true}, () => this.timeout1 = setTimeout(this._getText, 1000))
    : this.setState({showAnswer:false, noClick:true}, () => this.timeout2 = setTimeout(this._getIsKimchi, 1000));
  }

  handleEvents = (e) => {
    if(this.props.showDataModal) return;
    const { compressor } = this.state;
    if(e.type === 'wheel'){
      const c = e.deltaY < 0 ? -0.05 : 0.05;
      return e.buttons !== 4 
        ? this.setState({ compressor: compressor + c })
        : c < 0
          ? this._increaseFreq()
          : this._decreaseFreq()
    }
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick(); 
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.05});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.05});
    // right arrow was clicked; increase the frequent
    if(e.keyCode === 39) return this._increaseFreq();
    // left arrow was clicked; decrease the frequent
    if(e.keyCode === 37) return this._decreaseFreq();
  };

  _increaseFreq = () => {
    const { frequencyPercent, noClick } = this.state;
    if(noClick) return;
    if(frequencyPercent >= 1 && frequencyPercent < 99) {
      this.setState(prevSt=> ({ 
        freqUpdated: true,
        showAnswer: false, 
        frequencyPercent: prevSt.frequencyPercent + 1 
      }), this._freqChange);
    }
  }

  _decreaseFreq = () => {
    const { frequencyPercent, noClick } = this.state;
    if(noClick) return;
    if(frequencyPercent > 1 && frequencyPercent <= 99) {
      this.setState(prevSt=>({ 
        freqUpdated: true,
        showAnswer: false, 
        frequencyPercent: prevSt.frequencyPercent - 1 
      }), this._freqChange);
    }
  }
    
  
  _isKimchiLogic = (percent) => this.getRandomNum(100) > percent - 1;

  _freqChange = () => {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this._getIsKimchi, 1000)
  }

  _getIsKimchi = () => {
    const isKimchi = this._isKimchiLogic(this.state.frequencyPercent);
    this.setState({isKimchi, freqUpdated:false, noClick:false});
  }

  _getText = (data = this.state.data) => {
    const random = this.getRandomIndex(data.length);
    this.setState({
      text: data[random],
      textIndex: random,
      noClick: false
    });
  }
  
  render(){
    const { compressor, gameReady, text, showAnswer, isKimchi, frequencyPercent, freqUpdated } = this.state;
    const pic = isKimchi
                  ? <img 
                      alt='kimchi'
                      className='kim-img' 
                      src='https://www.sarang.sg/wp-content/uploads/2015/07/kimchi_im.png'
                    />
                  : <Emoji
                      className='poo-img'
                      label='poo emoji'
                      symbol='💩'
                    />;
    return (
      <div 
        className='kim-container'
        onClick={this.handleClick}
        style={{fontFamily: this.props.font}}
      >
        <CSSTransition
          in={!showAnswer}
          timeout={0}
          classNames='kimchiText'
        >
          <TextBox 
            gameReady={gameReady}
            text={text}
            height='100vh'
            width='100%'
            compressor={compressor} 
          />
        </CSSTransition>
        <CSSTransition
          in={showAnswer}
          timeout={0}
          classNames='kimchiImg'
        >
          {pic}
        </CSSTransition>
        <ShowUpdatedSetting 
          isIn={freqUpdated}
          text={frequencyPercent}
          symbol='%'
        />
      </div>
    )
  }
}

export default Kimchi;