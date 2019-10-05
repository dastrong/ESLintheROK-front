import React from "react";
import Notebook from "@Reusable/Notebook";

// show alphabet, not blank spaces
const showBlank = false;
const getHeaderTemplate = editsLeft => `${editsLeft} Mistake${editsLeft > 1 ? "s" : ""}`;

const FixTheMistake = props => (
  <Notebook {...props} getHeaderTemplate={getHeaderTemplate} showBlank={showBlank} />
);

export default FixTheMistake;
