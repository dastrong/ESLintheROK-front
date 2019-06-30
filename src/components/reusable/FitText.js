import React, { forwardRef } from "react";
import classNames from "classnames";
import "./FitText.css";

// can pass additional style through a style props
// for certain games like Kimchi where we need to cover the whole screen
// a width style should be used to break/wrap the text
// a className may be passed down for further styling
export default forwardRef(({ text, style, cx }, ref) => {
  const className = classNames("fittext", { [cx]: cx });
  return (
    <span className={className} style={style} ref={ref}>
      {text}
    </span>
  );
});
