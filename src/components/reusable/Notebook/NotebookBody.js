import React, { forwardRef } from "react";
import NotebookSide from "./NotebookSide";
import NotebookText from "./NotebookText";

// holds everything in the lined section
const NotebookBody = forwardRef((props, ref) => {
  const { text, dispatch, indexesTargeted, indexesShown } = props;

  return (
    <div className="notebook-body">
      <NotebookSide
        dispatch={dispatch}
        indexesTargeted={indexesTargeted}
        indexesShown={indexesShown}
      />
      <NotebookText ref={ref} text={text} />
    </div>
  );
});

export default NotebookBody;
