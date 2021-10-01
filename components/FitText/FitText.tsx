import React, { forwardRef } from 'react';
import classNames from 'classnames';

interface ChildrenProp {
  text?: never;
  children: React.ReactNode;
}
interface StringProp {
  text: string;
  children?: never;
}
type Props = { cx?: string } & (ChildrenProp | StringProp);

export default forwardRef<HTMLSpanElement, Props>(
  ({ children, text, cx }, ref) => {
    const className = classNames('fittext', { [cx]: cx });

    return (
      <span className={className} ref={ref}>
        {text || children}

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
