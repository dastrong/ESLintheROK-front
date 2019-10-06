import React, { forwardRef } from "react";
import FitText from "@Reusable/FitText";

// holds some game info text along the top page
const NotebookHead = forwardRef(({ text, handleClick }, ref) => (
  <div className="notebook-head" onClick={handleClick}>
    <FitText text={text} ref={ref} />
  </div>
));

export default NotebookHead;
