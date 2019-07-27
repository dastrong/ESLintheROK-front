import React, { forwardRef } from "react";
import classnames from "classnames";
import FitText from "./FitText";
import "./Card.css";

// returns a div containing two divs that are back to back
// need to specify a width/height in your CSS
export default forwardRef((props, ref) => {
  const {
    textFront,
    textBack,
    colorFront,
    colorBack,
    handleClick,
    id,
    flipMe,
    slideMe,
  } = props;
  const cx = classnames("flipper-card", { flipMe, slideMe });
  return (
    <div className={cx} id={id} onClick={handleClick}>
      <div className="flipper-card front" style={{ backgroundColor: colorFront }}>
        <FitText text={textFront} ref={ref} />
      </div>
      <div className="flipper-card back" style={{ backgroundColor: colorBack }}>
        {textBack}
      </div>
    </div>
  );
});
