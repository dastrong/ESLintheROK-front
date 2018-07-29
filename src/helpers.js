import shuffle from 'shuffle-array';
import classNames from 'classnames';

// ELIMINATION, WHATSBEHIND, STARS
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
};

// handling resets use getXs function
// need to edit this on other games
// ELIMINATION, WHATSBEHIND, STARS
export function handleReset(){
  // returns a new array of shuffled data
  const gameData = this.handleGameData();
  // returns a new array of chosen numbers
  const Xs = this._getXs(gameData.length, 3);
  // sets the height of our rows
  const height = this.state.isVocab ? '25vh' : '33.4vh';
  // refresh our state
  this.setState({
    gameData,
    Xs,
    height,
    clickedIDs: [],
    targetedID: null,
    targetedIDs : [],
    isResetting: true,
    isGameOver: false,
    colors: shuffle(this.state.colors, {'copy': true}),
  }, () => {
    setTimeout(()=>{
      // fades the whole container in and out
      // resets our flag variables
      this.setState({
        isResetting: false, 
        handlingClick: false, 
      });
    },1000)
  });
};

// ELIMINATION, WHATSBEHIND, STARS
export function handleKeyEvent(e){
  // spacebar/enter was clicked; reset the game
  if(e.keyCode === 32 || e.keyCode === 13){
    this.handleReset();
  }
  // right arrow was clicked; reset the state and uses sentences
  if(e.keyCode === 39){
    this.setState({isVocab:false}, () => this.handleReset());
  }
  // left arrow was clicked; reset the game and use pvocab
  if(e.keyCode === 37){
    this.setState({isVocab:true}, () => this.handleReset());
  }
  // up arrow was clicked; increase the font size
  if(e.keyCode === 38){
    const compressor = this.state.compressor - 0.05;
    this.setState({compressor})
  }
  // down arrow was clicked; decrease the font size
  if(e.keyCode === 40){
    const compressor = this.state.compressor + 0.05;
    this.setState({compressor})
  }
};

// ELIMINATION, WHATSBEHIND
export function handleClick(e){
  // return if we're still running an animation
  if(this.state.handlingClick) return;
  // gets the id from the clicked card
  let clickedID = Number(e.target.id);
  // sets the id of the card to the left/right for animations
  let targetedID = clickedID % 2 === 0 ? clickedID + 1 : clickedID - 1;
  // flips the cards boolean to show the backside
  const gameData = this.state.gameData.map((data, i) => {
    if(i === clickedID) { 
      // sets inProgress for the flip animation
      data = {
        ...data,
        clickTarget: {isCompleted:false, inProgress: true}
      };
    }
    return data;
  });
  // adds index/id of card that was clicked
  // used to keep track of what needs animations
  const clickedIDs = [...this.state.clickedIDs, clickedID];
  // sets the state and calls our animations function
  // this will flip the clicked card
  // sets targetedID as null and passes the targetedID value as a param for animation timing purposes
  // sets handlingClick flag variable to restrict clickability until animations are complete
  this.setState({gameData, clickedIDs, targetedID: null, handlingClick: true}, this.handleAnimations(targetedID));
};

// ELIMINATION, WHATSBEHIND
export function handleAnimations(targetedID){
  // handles the secondary animations
  // will execute once the clicked card has been flipped
  setTimeout(()=>{
    const { Xs, clickedIDs, isResetting, isVocab } = this.state;
    // if everything has been found stop the game
    if(Xs.every(X=>clickedIDs.includes(X))) return setTimeout(()=>{
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
        isGameOver:true
    }))},3000);
    // stops the following if we're isResetting
    if(isResetting) return;
    const height = handleHeight(isVocab, clickedIDs);
    // determines if the card to the left/right has already been clicked
    // if it is then we don't need to animate it
    // if it isn't then we'll update the state with it to expand that card
    if(clickedIDs.includes(targetedID)) targetedID = null;
    // get a new array
    // isCompleted moves the flipped card off the screen
    const gameData = this.state.gameData.map(data => {
      if(data.clickTarget.inProgress){
        data = {...data, clickTarget: {isCompleted:true, inProgress: true}}
      }
      return data;
    });
    // add our targetedID to it's own array
    // used to keep track of future animations
    this.setState({gameData, height, targetedID, targetedIDs: [...this.state.targetedIDs, targetedID]}, ()=>{
      // recalls the state after all the animations are done to resize the text
      // resets the handlingClick flag variable to restore clickabilty
      setTimeout(()=>{
        this.setState({handlingClick: false});
      }, 1000)
    })
  },1000)
};

// ELIMINATION, WHATSBEHIND
export function handleClasses(card, i){
  const { height, clickedIDs, targetedID, targetedIDs, isVocab } = this.state;
  const CardClasses = classNames('flipper', {
    'flipping':     card.clickTarget.inProgress,
    'expanding':    targetedID === i,
    'expanded':     targetedIDs.includes(i),
    'slideLeft':    card.clickTarget.isCompleted && i % 2 === 0 && !targetedIDs.includes(i),
    'slideRight':   card.clickTarget.isCompleted && i % 2 !== 0 && !targetedIDs.includes(i),
  });
  return isVocab ? 
    classNames(CardClasses, {
      'slideUp':      card.clickTarget.isCompleted && height !== '25vh',
      'vert33':      !card.clickTarget.isCompleted && height === '33.4vh',
      'vert50':      !card.clickTarget.isCompleted && height === '50vh',
      'vert100':     !card.clickTarget.isCompleted && height === '100vh',
      'enlargeText': height !== '25vh' && !clickedIDs.includes(i)
    }) :
    classNames(CardClasses, {
      'slideUp':      card.clickTarget.isCompleted && height !== '33.4vh',
      'vert33':       height === '33.4vh',
      'vert50':      !card.clickTarget.isCompleted && height === '50vh',
      'vert100':     !card.clickTarget.isCompleted && height === '100vh',
      'enlargeText': height !== '33.4vh' && !clickedIDs.includes(i)
    });
};

// STARS
export function handleStarClasses(card, i){
  const { height, clickedIDs, targetedID, targetedIDs, isVocab } = this.state;
  const CardClasses = classNames('flipper', {
    'flipping':     card.clickTarget.inProgress,
    'expanding':    targetedID === i,
    'expanded':     targetedIDs.includes(i),
    'slideLeft':    card.clickTarget.isCompleted && i % 2 === 0 && !targetedIDs.includes(i),
    'slideRight':   card.clickTarget.isCompleted && i % 2 !== 0 && !targetedIDs.includes(i),
  });
  return isVocab ? 
    classNames(CardClasses, {
      'slideUp':      card.clickTarget.isCompleted && height !== '25vh',
      'vert33':      !card.clickTarget.isCompleted && height === '33.4vh',
      'vert50':      !card.clickTarget.isCompleted && height === '50vh',
      'vert100':     !card.clickTarget.isCompleted && height === '100vh',
      'enlargeText': height !== '25vh' && !clickedIDs.includes(i)
    }) :
    classNames(CardClasses, {
      'slideUp':      card.clickTarget.isCompleted && height !== '33.4vh',
      'vert33':       height === '33.4vh',
      'vert50':      !card.clickTarget.isCompleted && height === '50vh',
      'vert100':     !card.clickTarget.isCompleted && height === '100vh',
      'enlargeText': height !== '33.4vh' && !clickedIDs.includes(i)
    });
};

function handleHeight(isVocab, clickedIDs){
  // determines how many cards have been CLICKED IN A ROW
  // used to adjust the cards height
  // returns height variable
  if(isVocab){
    const rows = clickedIDs.reduce((acc, cVal) => {
      if(cVal <= 1) acc.row1++;
      if(cVal >= 6) acc.row4++;
      if(cVal === 2 || cVal === 3) acc.row2++;
      if(cVal === 4 || cVal === 5) acc.row3++;
      return acc;
    }, {'row1': 0, 'row2': 0, 'row3': 0, 'row4': 0})
    const num_Rows_Flipped = Object.values(rows).filter(val=>val===2);
    if(num_Rows_Flipped.length === 0) return;
    if(num_Rows_Flipped.length === 1) return '33.4vh';
    if(num_Rows_Flipped.length === 2) return '50vh';
    if(num_Rows_Flipped.length === 3) return '100vh';
  } else {
    const rows = clickedIDs.reduce((acc, cVal) => {
      if(cVal <= 1) acc.row1++;
      if(cVal >= 4) acc.row3++;
      if(cVal === 2 || cVal === 3) acc.row2++;
      return acc;
    }, {'row1': 0, 'row2': 0, 'row3': 0})
    const num_Rows_Flipped = Object.values(rows).filter(val=>val===2);
    if(num_Rows_Flipped.length === 0) return '33.4vh';
    if(num_Rows_Flipped.length === 1) return '50vh';
    if(num_Rows_Flipped.length === 2) return '100vh';
  }
};