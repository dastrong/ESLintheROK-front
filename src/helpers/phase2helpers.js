import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import ReactGA from 'react-ga';

function getRandomNum(length) { return Math.floor(Math.random()*length) }

function getRandomIndex(length) {
  const { textIndex } = this.state;
  let i = undefined;
  while(i === undefined || i === textIndex){
    i = this.getRandomNum(length);
  }
  return i;
}

// use if you need to decide which type of data to use
function chooseDataSet(isVocab) {
  const { vocabulary, expressions } = this.state;
  return isVocab ? vocabulary.slice() : expressions.slice();
}

function splitText(text) { return shuffle(text.split('')) }

// use if game uses only ONE type of data
function setData(data){
  this.setState({data: stripData(data)}, this.handleGame);    
}

// use if games uses both vocabulary and expressions
function setAllData({vocabulary, expressions}, ...rest){
  const extras = Object.assign({}, ...rest)
  this.setState({
    vocabulary: stripData(vocabulary),
    expressions: stripData(expressions),
    ...extras,
  }, this.handleGame)
}

// strips data object down to an array of text values
function stripData(data){ return data.map(val=>val.text); }

function addTitle() {
  document.title = `Playing: ${this.props.title} - ESL in the ROK`;
}

function addListeners() { 
  document.addEventListener('keydown', throttle(this.handleEvents, 200));
  document.addEventListener('wheel', throttle(this.handleEvents, 200));
}

function rmvListeners() { 
  document.removeEventListener('keydown', this.handleEvents);
  document.removeEventListener('wheel', this.handleEvents);
}

function addGoogEvent(){
  ReactGA.event({
    category: 'Games',
    action: `New Round - ${this.props.title}`,
    label: this.props.title
  });
}

function goFullScreen() {
  if(window.screen.height !== window.innerHeight) {
    window.confirm("It's time to go fullscreen. \n If you play on a second screen, drag the window over now before clicking OK") 
      ? document.documentElement.webkitRequestFullScreen() 
      : alert('Press F11 if you change your mind'); 
  }  
}

export { 
  setData, setAllData, chooseDataSet, stripData,
  getRandomIndex, getRandomNum, splitText, 
  addListeners, rmvListeners, addTitle, addGoogEvent, goFullScreen
};