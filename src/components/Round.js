import React from 'react';
import '../styles/Round.css';

const Round = ({num}) => (
	<div className='outer-round'>
		<div className='inner-round'>
			{num}
		</div>
	</div>
)

export default Round;