import React, { Component } from "react";
import shuffle from 'shuffle-array';
import CardBlock from '../reusable/CardBlock';
import '../../styles/games/WordLotto.css';

class WordLotto extends Component {
	constructor(props){
		super(props);
		this.state = {
			allData: {},
      gameData: [],
			Xs: [],
			isVocab: true,
			boxCount: 9,
			xCount: 3,
			isGameOver:  false,
			isAnimating: false,
			isResetting: false,
			compressor: 0.6,
			colors: this.props.colors,
		};
	}

	componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
		const { xCount, boxCount } = this.state;
		const { data } = this.props;
		const vocabularyData = data.vocabularyData.map(data=>data.text);
    const expressionData = data.expressionData.map(data=>data.text);
		const allData = {vocabularyData, expressionData};
		// returns an array of shuffled data equal to our boxCount variable
    const gameData = this.handleGameData(allData);
    // returns the winning cards location
    const Xs = this._getXs(boxCount, xCount);
    this.setState({allData, gameData, Xs})
	}

	componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }
	
	handleGameData = (allData = this.state.allData) => {
		const { isVocab, boxCount } = this.state;
		// chooses which set of data to use
		const data = isVocab 
									? allData.vocabularyData.slice() 
									: allData.expressionData.slice();
		// shuffles our data and trims it
		return shuffle(data).slice(0, boxCount);
	}

	_getXs = (boxCount, xCount) => {
    let arr = [];
    // used when our component mounts
    // randomly chooses an 'xCount' amount of numbers
    while(arr.length < xCount){
      const randNum = Math.floor(Math.random()*boxCount);
      if(!arr.includes(randNum)) arr.push(randNum);
    }
    return arr;
	}
	
	handleReset = () => {
		const { boxCount, xCount } = this.state;
		// if(isGameOver) return;
		// returns a new array of shuffled data
		const gameData = this.handleGameData();
		// returns a new array of chosen numbers
		const Xs = this._getXs(boxCount, xCount);
		// refresh our state
		this.setState({
			gameData,
			Xs,
			colors: shuffle(this.state.colors, {'copy': true}),
			isResetting: true,
			isAnimating: false,
			isGameOver: false,
		}, () => {
			// resets our flag variables
			setTimeout(()=>this.setState({isResetting: false}),1000)
		});
	}

	showWinners = () => {
		// if we're already animating return out
		if(this.state.isAnimating) return;
		// set the state so card blocks can start to fade out
		this.setState({isAnimating: true}, ()=>{
			// allow 10 seconds for animations
			// set flag variable to allow clicks again
			setTimeout(()=>{
				this.setState({isGameOver:true}, ()=>{
					// automatically resets the board after 8 seconds
					setTimeout(()=>{
						if(!this.state.isGameOver) return;
						this.handleReset()
					}, 8000);
				});
			}, 10000);
		});
	}

	handleKeyEvent = (e) => {
    // spacebar/enter was clicked
    if(e.keyCode === 32 || e.keyCode === 13){
			this.state.isGameOver 
				? this.handleReset()
				: this.showWinners();
    }
    // right arrow was clicked; reset the state and use sentences
    if(e.keyCode === 39){
      this.setState({
				isVocab: false,
				boxCount: 4,
				xCount: 1
			}, () => this.handleReset());
    }
    // left arrow was clicked; reset the game and use vocab
    if(e.keyCode === 37){
			this.setState({
				isVocab: true,
				boxCount: 9,
				xCount: 3
			}, () => this.handleReset());
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
  }

	render(){
		const { gameData, compressor, isResetting, isAnimating, isGameOver, Xs, isVocab, colors } = this.state;
		const boxes = gameData.map((text,i)=>(
			<CardBlock 
				key={i}
				classNames='box'
				text={text}
				shouldAnimate={isResetting || !(isAnimating && !Xs.includes(i))}
				timeout={Math.floor(Math.random()*8*1000)+500}
				compressor={compressor}
				boxClass={isVocab ? 'box box-square' : 'box box-rectan'}
				backColor={colors[i]} />	
		));
		return (
			<div 
				className='container' 
				onClick={()=>{
					isGameOver 
						? this.handleReset()
						: this.showWinners();
				}} >
					{boxes}
			</div>
		);
	}
}

export default WordLotto;