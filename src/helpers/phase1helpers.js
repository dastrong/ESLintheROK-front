import classNames from 'classnames';

// returns an array of numbers
export function arrOfRandNum(maxNum, numCount, options){
  if(options) {
    const { minStars, maxStars } = options;
    return [...Array(numCount)].map(()=>minStars + Math.floor(Math.random()*(maxStars+1-minStars)));
  }
  let arr = [];
  while(arr.length < numCount){
    const randNum = Math.floor(Math.random()*maxNum);
    if(arr.indexOf(randNum) === -1) arr.push(randNum);
  }
  return arr;
}

// ELIMINATION, WHATSBEHIND, STARS
export function handleGameData(isVocab = this.state.isVocab){
  const { xCount, options } = this.state;
  // chooses which set of data to use
  const data = this.chooseDataSet(isVocab);
  // chooses how many boxes we need to fill with data and their height
  const [boxCount, height] = isVocab 
    ? [this.state.boxCount || 8, '25vh'] 
    : [this.state.boxCount || 6, '33.4vh']; 
  const arrOfNum = arrOfRandNum(data.length, boxCount, false);
  const Xs = arrOfRandNum(boxCount, xCount, options);
  // adds an id, the text from the data array, and sets the beginning values used for animations
  const gameData = arrOfNum.map((val, i) => ({ 
    text: data[val], 
    id: i, 
    clickTarget: {isCompleted: false, inProgress: false}
  }));
  return {gameData, Xs, height};
};

export function handleLottoData(isVocab = this.state.isVocab){
  const { options } = this.state;
  // chooses which set of data to use
  const data = this.chooseDataSet(isVocab);
  // chooses how many boxes we need to fill with data and their height
  const boxCount = isVocab ? 9 : 4;
  const xCount = isVocab ? 3 : 1;
  const arrOfNum = arrOfRandNum(data.length, boxCount, false);
  const Xs = arrOfRandNum(boxCount, xCount, options);
  const gameData = arrOfNum.map(val=>data[val]);
  const timeouts = [...Array(boxCount)].map(()=> this.getRandomNum(8000)+500);
  return {gameData, Xs, timeouts};
}

// handling resets use arrOfRandNum function
// need to edit this on other games
// ELIMINATION, WHATSBEHIND, STARS
export function handleReset(isVocab = this.state.isVocab){
  this.setState({ isResetting:true }, this.handleGame(isVocab));
  this.timeout4 = setTimeout(()=> this.setState({ isResetting:false, handlingClick:false }), 1000);
};

// ELIMINATION, WHATSBEHIND, STARS
export function handleEvents(e){
  const { isResetting, isVocab, compressor } = this.state;
  if(isResetting) return;
  if(e.type === 'wheel'){
    const c = e.deltaY < 0 ? -0.05 : 0.05;
    return e.buttons === 4
      ? this.handleReset(c < 0)
      : this.setState({ compressor: compressor + c });
  }
  // spacebar/enter was clicked; reset the game
  if(e.keyCode === 32 || e.keyCode === 13) return this.handleReset(isVocab);
  // right arrow was clicked; reset the state and uses sentences
  if(e.keyCode === 39) return this.handleReset(false);
  // left arrow was clicked; reset the game and use vocab
  if(e.keyCode === 37) return this.handleReset(true);
  // up arrow was clicked; increase the font size
  if(e.keyCode === 38) return this.setState({ compressor: compressor - 0.05 });
  // down arrow was clicked; decrease the font size
  if(e.keyCode === 40) return this.setState({ compressor: compressor + 0.05 });
  // if theres more game specific event handlers handle now
  return this.handleMoreEvents ? this.handleMoreEvents(e) : null;
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
  this.timeout1 = setTimeout(()=>{
    const { Xs, clickedIDs, isResetting, isVocab } = this.state;
    // if everything has been found stop the game
    if(Xs.every(X=>clickedIDs.includes(X))) return this.timeout2 = setTimeout(()=>{
      this.setState(({counter}) => ({
        counter: counter + 1,
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
      this.timeout3 = setTimeout(()=>{
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