import shuffle from 'shuffle-array';

function getRandomNum(length) { return Math.floor(Math.random()*length) }

function getRandomIndex(length) {
  const { textIndex } = this.state;
  let i = undefined;
  while(i === undefined || i === textIndex){
    i = this.getRandomNum(length);
  }
  return i;
}

function chooseDataSet(allData) {
  return this.state.isVocab ? allData.vocabularyData.slice() : allData.expressionData.slice();
}

function splitText(text) { return shuffle(text.split('')) }

function setData(data){
  this.setState({data: data.map(val=>val.text)}, this.handleGame);    
}

function addListeners() { document.addEventListener('keydown', this.handleKeyEvent) }

function rmvListeners() { document.removeEventListener('keydown', this.handleKeyEvent) }

export { setData, getRandomIndex, getRandomNum, splitText, chooseDataSet, addListeners, rmvListeners };