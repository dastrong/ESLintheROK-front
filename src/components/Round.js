import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/Round.css';

const Round = ({num, isIn, timeout, classname}) => (
	<div className='outer-round'>
		<CSSTransition
			in={isIn}
			timeout={timeout}
			classNames={classname}
		>
			<div className='inner-round'>
				{num}
			</div>
		</CSSTransition>
	</div>
)

export default Round;