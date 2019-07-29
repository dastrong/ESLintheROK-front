import React, { forwardRef } from "react";
import classNames from "classnames";
import "./FitText.css";

// a className (cx) may be passed down for further styling
export default forwardRef(({ text, cx }, ref) => {
  const className = classNames("fittext", { [cx]: cx });
  return (
    <span className={className} ref={ref}>
      {text}
    </span>
  );
});
