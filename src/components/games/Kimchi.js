import React, { Component } from 'react';
import TextBox from '../reusable/TextBox';
import Emoji from '../reusable/Emoji';
import ShowUpdatedSetting from '../reusable/ShowUpdatedSetting';
import { CSSTransition } from 'react-transition-group';
import { setData, getRandomNum, getRandomIndex, addListeners, rmvListeners } from '../../helpers/phase2helpers';
import '../../styles/games/Kimchi.css';

class Kimchi extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.6,
      frequencyPercent: 90,
      isKimchi: null,
      data: [],
      text: '',
      textIndex: undefined,
      showAnswer: false,
    };
    this.setData        = setData.bind(this);
    this.getRandomNum   = getRandomNum.bind(this);
    this.getRandomIndex = getRandomIndex.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
  }

  componentDidMount(){
    this.addListeners();
    this.setData(this.props.expressionData);  
  }

  componentWillUnmount(){ this.rmvListeners() }

  handleGame = (data = this.state.data) => {
    const random = this.getRandomIndex(data.length);
    const isKimchi = this._isKimchiLogic(this.state.frequencyPercent);
    this.setState({
      text: data[random],
      textIndex: random,
      showAnswer: false,
      isKimchi,
    });
  }

  handleClick = () => {
    if(this.state.noClick) return;
    !this.state.showAnswer 
    ? this.setState({showAnswer:true, noClick:true}, () => setTimeout(this._getText, 1000))
    : this.setState({showAnswer:false, noClick:true}, () => setTimeout(this._getIsKimchi, 1000));
  }

  handleKeyEvent = (e) => {
    const { compressor, frequencyPercent, noClick } = this.state;
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick(); 
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.05});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.05});
    // right arrow was clicked; increase the frequent
    if(e.keyCode === 39){
      if(noClick) return;
      if(frequencyPercent >= 1 && frequencyPercent < 99){
        return this.setState(prevSt=>({ 
          freqUpdated: true,
          showAnswer: false, 
          frequencyPercent: prevSt.frequencyPercent + 1 
        }), this._freqChange);
      }
    }
    // left arrow was clicked; decrease the frequent
    if(e.keyCode === 37){
      if(noClick) return;
      if(frequencyPercent > 1 && frequencyPercent <= 99){
        return this.setState(prevSt=>({
          freqUpdated: true,
          showAnswer: false, 
          frequencyPercent: prevSt.frequencyPercent - 1 
        }), this._freqChange);
      }
    }
  };

  _isKimchiLogic = (percent) => this.getRandomNum(100) > percent - 1;

  _freqChange = () => {
    clearInterval(this.intervalID);
    this.intervalID = setTimeout(this._getIsKimchi, 1000)
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
    const { compressor, text, showAnswer, isKimchi, frequencyPercent, freqUpdated } = this.state;
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
      >
        <CSSTransition
          in={!showAnswer}
          timeout={0}
          classNames='kimchiText'
        >
          <TextBox 
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