import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';

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
  const { vocabularyData, expressionData } = this.state;
  return isVocab ? vocabularyData.slice() : expressionData.slice();
}

function splitText(text) { return shuffle(text.split('')) }

// use if game uses only ONE type of data
function setData(data){
  this.setState({data: stripData(data)}, this.handleGame);    
}

// use if games uses both vocabulary and expressions
function setAllData({vocabularyData, expressionData}, ...rest){
  const extras = Object.assign({}, ...rest)
  this.setState({
    vocabularyData: stripData(vocabularyData),
    expressionData: stripData(expressionData),
    ...extras,
  }, this.handleGame)
}

// strips data object down to an array of text values
function stripData(data){ return data.map(val=>val.text); }

function addListeners() { 
  document.addEventListener('keydown', throttle(this.handleEvents, 200));
  document.addEventListener('wheel', throttle(this.handleEvents, 200));
}

function rmvListeners() { 
  document.removeEventListener('keydown', this.handleEvents);
  document.removeEventListener('wheel', this.handleEvents);
}

export { 
  setData, setAllData, chooseDataSet, stripData,
  getRandomIndex, getRandomNum, splitText, 
  addListeners, rmvListeners, 
};