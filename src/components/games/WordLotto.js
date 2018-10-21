import React, { Component } from "react";
import shuffle from 'lodash/shuffle';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import CardBlock from '../reusable/CardBlock';
import { 
  handleLottoData, handleEvents, handleReset,
} from '../../helpers/phase1helpers';
import { 
  addListeners, rmvListeners, chooseDataSet, setAllData, getRandomNum, addTitle, addGoogEvent
} from '../../helpers/phase2helpers';
import '../../styles/games/WordLotto.css';

class WordLotto extends Component {
	constructor(props){
		super(props);
		this.state = {
			colors: this.props.colors,
			xCount: 3,
      gameData: [],
			Xs: [],
			isVocab: true,
			boxCount: 9,
			isGameOver:  false,
			isAnimating: false,
			isResetting: false,
			compressor: 0.9,
		};
		this.handleLottoData = handleLottoData.bind(this);
    this.handleEvents   = handleEvents.bind(this);
    this.handleReset    = handleReset.bind(this);
    this.addListeners   = addListeners.bind(this);
    this.rmvListeners   = rmvListeners.bind(this);
    this.chooseDataSet  = chooseDataSet.bind(this);
    this.setAllData     = setAllData.bind(this);
		this.getRandomNum   = getRandomNum.bind(this);
    this.addTitle       = addTitle.bind(this);
		this.addGoogEvent   = addGoogEvent.bind(this);
	}

	componentDidMount(){
		this.addTitle();
		this.addListeners();
    const { vocabulary, expressions } = this.props;
    const allData = { vocabulary, expressions };
    this.setAllData(allData);
	}

	componentWillUnmount(){
		this.rmvListeners();
		this._clearTimeOuts();
  }
	
	handleGame = (isVocab = this.state.isVocab) => {
		this.addGoogEvent();
		this._clearTimeOuts();
    const { gameData, Xs, timeouts } = this.handleLottoData(isVocab);
    this.setState(prevState=>({
      gameData, 
			Xs,
			timeouts, 
      clickedIDs: [],
      clickedID: null, 
      targetedIDs : [],
      targetedID: null,
      isVocab: isVocab === undefined
                ? prevState.isVocab 
                : isVocab,                
								isGameOver: false,
			isAnimating: false,
      colors: shuffle([...this.state.colors]),
    }));
	}
	
	_showWinners = () => {
		// if we're already animating return out
		if(this.state.isAnimating) return;
		// set the state so card blocks can start to fade out
		this.setState({isAnimating: true}, ()=>{
			// allow 10 seconds for animations
			// set flag variable to allow clicks again
			this.animationID = setTimeout(()=>{
				this.setState({isGameOver:true}, ()=>{
					// automatically resets the board after 10 seconds
					this.autoResetID = setTimeout(()=>{
						if(!this.state.isGameOver) return;
						this.handleReset()
					}, 10000);
				});
			}, 10000);
		});
	}
	
	_clearTimeOuts = () => {
		clearTimeout(this.resetID);
		clearTimeout(this.animationID);
		clearTimeout(this.autoResetID);
		clearTimeout(this.timeout4);
	}
	
	render(){
		const { gameData, timeouts, compressor, isResetting, isAnimating, isGameOver, Xs, isVocab, colors } = this.state;
		const boxClass = classNames('box',
			{ 'box-grid':  isVocab },
			{ 'box-list': !isVocab });
		const boxes = gameData.map((text,i)=>{
			const isIn = isResetting || !(isAnimating && !Xs.includes(i));
			return (
				<CSSTransition
					key={i}
					in={isIn}
					timeout={0}
					classNames='box'
				>
					<CardBlock 
						classNames='box'
						timeout={!isIn ? timeouts[i] : 0}
						text={text}
						compressor={compressor}
						boxClass={boxClass}
						backColor={colors[i]} />	
				</CSSTransition>
			)}
		);
		return (
			<div 
				className='lotto-container'
				style={{fontFamily: this.props.font}}
				onClick={()=>{
					isGameOver 
						? this.handleReset()
						: this._showWinners();
				}}
			>
				{boxes}
			</div>
		);
	}
}

export default WordLotto;