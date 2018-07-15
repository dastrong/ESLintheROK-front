export function handleGameData(allData = this.state.allData){
  // chooses which set of data to use
  const data = this.state.isVocab ? allData.vocabularyData.slice() : allData.expressionData.slice();
  // chooses how many boxes we need to fill with data
  const boxCount = this.state.isVocab ? 8 : 6;
  let arr = [];
  // creates a shuffled array of numbers
  while(arr.length < boxCount){
    const randNum = Math.floor(Math.random()*data.length);
    if(arr.indexOf(randNum) === -1) arr.push(randNum);
  }
  // adds an id, the text from the data array, and sets the beginning values used for animations
  return arr.map((val, i) => ({ 
    text: data[val], 
    id: i, 
    clickTarget: {isCompleted: false, inProgress: false}
  }));
}

export function handleAnimations(targetedId){
  // handles the secondary animations
  // will execute once the clicked card has been flipped
  setTimeout(()=>{
    // stops the following if we're resetting
    if(this.state.abort) return;
    let height;
    // determines how many cards have been CLICKED IN A ROW
    // used to adjust the cards height
    if(this.state.isVocab){
      const rows = this.state.clicked.reduce((acc, cVal) => {
        if(cVal <= 1) acc.row1++;
        if(cVal >= 6) acc.row4++;
        if(cVal === 2 || cVal === 3) acc.row2++;
        if(cVal === 4 || cVal === 5) acc.row3++;
        return acc;
      }, {'row1': 0, 'row2': 0, 'row3': 0, 'row4': 0})
      const num_Rows_Flipped = Object.values(rows).filter(val=>val===2);
      height = this.state.height;
      if(num_Rows_Flipped.length === 1) height='33.4vh';
      if(num_Rows_Flipped.length === 2) height='50vh';
      if(num_Rows_Flipped.length === 3) height='100vh';
    } else {
      const rows = this.state.clicked.reduce((acc, cVal) => {
        if(cVal <= 1) acc.row1++;
        if(cVal >= 4) acc.row3++;
        if(cVal === 2 || cVal === 3) acc.row2++;
        return acc;
      }, {'row1': 0, 'row2': 0, 'row3': 0})
      const num_Rows_Flipped = Object.values(rows).filter(val=>val===2);
      height = this.state.height;
      if(num_Rows_Flipped.length === 1) height='50vh';
      if(num_Rows_Flipped.length === 2) height='100vh';
    }
    // determines if the card to the left/right has already been clicked
    // if it is then we don't need to animate it
    // if it isn't then we'll update the state with it to expand that card
    if(this.state.clicked.includes(targetedId)) targetedId = null;
    // get a new array
    // isCompleted moves the flipped card off the screen
    const gameData = this.state.gameData.map(data => {
      if(data.clickTarget.inProgress){
        data = {...data, clickTarget: {isCompleted:true, inProgress: true}}
      }
      return data;
    });
    // add our targetedId to it's own array
    // used to keep track of future animations
    this.setState({gameData, height, targetedId, targetedIds: [...this.state.targetedIds, targetedId]}, ()=>{
      // recalls the state after all the animations are done to resize the text
      // resets the handlingClick flag variable to restore clickabilty
      setTimeout(()=>{
        this.setState({handlingClick: false});
      }, 1000)
    })
  },1000)
};

export function getXs(dataLength, xCount){
  let arr = [];
  // used when our component mounts
  // randomly chooses an 'xCount' amount of numbers
  while(arr.length < xCount){
    const randNum = Math.floor(Math.random()*dataLength);
    if(arr.indexOf(randNum) === -1) arr.push(randNum);
  }
  return arr;
}

export function handleReset(){
  // returns a new array of shuffled data
  const gameData = this.handleGameData();
  // returns a new array of chosen numbers
  const Xs = this.getXs(gameData.length, 3);
  // sets the height of our rows
  const height = this.state.isVocab ? '25vh' : '33.4vh';
  // refresh our state
  this.setState({
    gameData,
    Xs,
    height,
    clicked: [],
    targetedId: null,
    targetedIds : [],
    resetting: true,
    abort: true,
  }, () => {
    setTimeout(()=>{
      // fades the whole container in and out
      // resets our flag variables
      this.setState({
        resetting: false, 
        handlingClick: false, 
        abort: false
      });
    },1000)
  });
}