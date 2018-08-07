import React, { Component } from 'react';
import TextBox from '../components/TextBox';
import Emoji from '../components/Emoji';
import ShowUpdatedSetting from '../components/ShowUpdatedSetting';
import { CSSTransition } from 'react-transition-group';
import '../styles/Kimchi.css';

class Kimchi extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.6,
      frequencyPercent: 10,
      isKimchi: null,
      data: [],
      text: '',
      textIndex: undefined,
      showAnswer: false,
    };
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    const data = this.props.data.map(val=>val.text); 
    this.setState({data}, ()=>this.handleGame());    
  }

  componentWillUnmount(){ 
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  handleGame = (data = this.state.data) => {
    const random = this.getRandomIndex(data.length);
    const isKimchi = this.handleLogic(this.state.frequencyPercent);
    this.setState({
      text: data[random],
      textIndex: random,
      showAnswer: false,
      isKimchi,
    });
  }

  getRandomIndex = (length) => {
    const { textIndex } = this.state;
    let i = undefined;
    while(i === undefined || i === textIndex){
      i = this.getRandomNum(length);
    }
    return i;
  }

  getRandomNum = (length) => Math.floor(Math.random()*length);

  handleLogic = (percent) => this.getRandomNum(100) > percent - 1;

  handleKeyEvent = (e) => {
    const { compressor, frequencyPercent } = this.state;
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick(); 
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.05});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.05});
    // right arrow was clicked; increase the frequent
    if(e.keyCode === 39){
      if(frequencyPercent >= 1 && frequencyPercent < 99){
        return this.setState(prevSt=>({ 
          freqUpdated: true,
          showAnswer: false, 
          frequencyPercent: prevSt.frequencyPercent + 1 
        }), this._handleChange);
      }
    }
    // left arrow was clicked; decrease the frequent
    if(e.keyCode === 37){
      if(frequencyPercent > 1 && frequencyPercent <= 99){
        return this.setState(prevSt=>({
          freqUpdated: true,
          showAnswer: false, 
          frequencyPercent: prevSt.frequencyPercent - 1 
        }), this._handleChange);
      }
    }
  };

  _handleChange(){
    clearInterval(this.intervalID);
    this.intervalID = setTimeout(this.getIsKimchi, 1000)
  }
  
  handleClick = (e) => {
    if(this.state.noClick) return;
    !this.state.showAnswer 
    ? this.setState({showAnswer:true, noClick:true}, () => setTimeout(this.getText, 1000))
    : this.setState({showAnswer:false, noClick:true}, () => setTimeout(this.getIsKimchi, 1000));
  }
  
  getIsKimchi = () => {
    const isKimchi = this.handleLogic(this.state.frequencyPercent);
    this.setState({isKimchi, freqUpdated:false, noClick:false});
  }

  getText = (data = this.state.data) => {
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