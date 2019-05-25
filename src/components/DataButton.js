import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

export default function DataButton({ isAPI, isOneHundy, handleClick }) {
  const [content, setContent] = useState("Submit");

  useEffect(() => {
    function getContent() {
      if (isAPI) {
        return isOneHundy
          ? "Thanks! Submit lesson."
          : "Please complete all the fields marked with red.";
      } else {
        return isOneHundy
          ? "Save and set your data!"
          : "Please enter more vocabulary or expressions";
      }
    }
    const content = getContent();
    setContent(content);
  }, [isAPI, isOneHundy]);

  return (
    <Button
      fluid
      className="submit-data-btn"
      disabled={!isOneHundy}
      onClick={handleClick}
      color={isOneHundy ? "green" : "blue"}
      content={content}
    />
  );
}
