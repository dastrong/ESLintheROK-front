import React, { Component } from 'react';
import ReactFitText from 'react-fittext';
import { CSSTransition } from 'react-transition-group';
import { 
  setData, getRandomNum, getRandomIndex, addListeners, rmvListeners, addTitle, addGoogEvent
} from '../../helpers/phase2helpers';
import '../../styles/games/Nunchi.css';

class Nunchi extends Component {
  constructor(props){
    super(props);
    this.state = {
      compressor: 0.8,
      data: [],
      text: '',
      textIndex: undefined,
      showReady: true,
    };
    this.setData        = setData.bind(this);
    this.getRandomNum   = getRandomNum.bind(this);
    this.getRandomIndex = getRandomIndex.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
    this.addTitle       = addTitle.bind(this);
    this.addGoogEvent   = addGoogEvent.bind(this);
  }

  componentDidMount(){
    this.addTitle();
    this.addListeners();
    this.setData(this.props.expressions);  
  }

  componentWillUnmount(){ 
    this.rmvListeners();
  }

  componentDidUpdate(x, prevState){
    if(prevState.showReady === this.state.showReady) return;
    if(!this.state.showReady) return this.handleGame();
  } 

  handleGame = (data = this.state.data) => {
    this.addGoogEvent();
    const random = this.getRandomIndex(data.length);
    this.setState({
      text: data[random],
      textIndex: random,
    });
  }

  handleEvents = (e) => {
    const { compressor } = this.state;
    if(e.type === 'wheel'){
      const c = e.deltaY < 0 ? -0.03 : 0.03;
      return this.setState({ compressor: compressor + c })
    }
    // spacebar/enter was clicked; reset the game
    if(e.keyCode === 32 || e.keyCode === 13) return this.handleClick(); 
    // up arrow was clicked; increase the font size
    if(e.keyCode === 38) return this.setState({compressor:compressor - 0.03});
    // down arrow was clicked; decrease the font size
    if(e.keyCode === 40) return this.setState({compressor:compressor + 0.03});
  };

  handleClick = () => this.setState(prevState=> ({showReady: !prevState.showReady}));
  
  render(){
    const { compressor, showReady, text } = this.state;
    return (
      <div 
        className='nunchi-container'
        onClick={this.handleClick}
        style={{fontFamily: this.props.font}}
      >
        <div className='nunchi-text-holder'>
          <CSSTransition
            in={showReady}
            classNames='nunchi-ready'
            timeout={0}
          >
            <p className='nunchi-text nunchi-ready'>Ready?</p> 
          </CSSTransition>
          <ReactFitText
            compressor={compressor}
            minFontSize={0}
            maxFontSize={350}
          >
            <CSSTransition
              in={!showReady}
              classNames='nunchi-text'
              timeout={0}
            >
              <p className='nunchi-text'>{text}</p> 
            </CSSTransition>
          </ReactFitText>
        </div>
      </div>
    )
  }
}

export default Nunchi;