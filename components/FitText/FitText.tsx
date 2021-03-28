import React, { forwardRef } from 'react';
import classNames from 'classnames';

export default forwardRef<HTMLSpanElement, { text: string; cx?: string }>(
  ({ text, cx }, ref) => {
    const className = classNames('fittext', { [cx]: cx });

    return (
      <span className={className} ref={ref}>
        {text}

        <style jsx>{`
          span {
            font-size: 5vw;
            line-height: 130%;
            opacity: 0;
            text-align: center;
            position: absolute;
          }
        `}</style>
      </span>
    );
  }
);
