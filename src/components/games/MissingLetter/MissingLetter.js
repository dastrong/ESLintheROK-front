import React from "react";
import Notebook from "@Reusable/Notebook";

// show blank spaces, not alphabet character
const showBlank = true;
const getHeaderTemplate = editsLeft => `${editsLeft} Missing`;

const MissingLetter = props => (
  <Notebook {...props} getHeaderTemplate={getHeaderTemplate} showBlank={showBlank} />
);

export default MissingLetter;
