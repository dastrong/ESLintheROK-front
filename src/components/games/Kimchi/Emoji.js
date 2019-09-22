import React from 'react';

const Emoji = ({className, label, symbol}) => (
    <span
        className={className}
        role='img'
        aria-label={label ? label : ''}
        aria-hidden={!label}
    >
        {symbol}
    </span>
);

export default Emoji;