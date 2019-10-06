import React, { forwardRef } from "react";
import FitText from "@Reusable/FitText";

// right side of the vertical lines
// holds the gameData and answer
const NotebookText = forwardRef((props, ref) => {
  const { text } = props;

  return (
    <div className="notebook-text">
      <FitText ref={ref} text={text} />
    </div>
  );
});

export default NotebookText;
