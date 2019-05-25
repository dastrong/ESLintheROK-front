import React from "react";
import ReactFitText from "react-fittext";
import "./TextBox.css";

// ReactFitText will ruin the page transition
// Once the game's handleGame function runs it'll load ReactFitText
const TextBox = ({ text, compressor, gameReady, width, height }) =>
  !gameReady ? (
    <div className="textbox" style={{ width, height }}>
      {text}
    </div>
  ) : (
    <ReactFitText compressor={compressor} minFontSize={0} maxFontSize={500}>
      <div className="textbox" style={{ width, height }}>
        {text}
      </div>
    </ReactFitText>
  );

export default TextBox;
