import React from "react";
import classNames from "classnames";

// left side of the vertical lines
// key holes will be buttons to show answers
const NotebookSide = ({ dispatch, indexesTargeted, indexesShown }) => (
  <div className="notebook-side">
    {indexesTargeted.map(target => {
      const shown = indexesShown.includes(target);
      const cx = classNames("notebook-side-hole", { active: shown });
      return (
        <div
          key={`click-handler-${target}`}
          className={cx}
          onClick={shown ? null : () => dispatch({ type: "Show_Character", target })}
        ></div>
      );
    })}
  </div>
);

export default NotebookSide;
