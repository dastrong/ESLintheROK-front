import React from "react";
import { CSSTransition } from "react-transition-group";
import "./ShowUpdatedSetting.css";

const ShowUpdatedSetting = ({ isIn, text, symbol }) => (
  <CSSTransition in={isIn} timeout={0} classNames="updated-settings-cover">
    <div className="updated-settings-cover">
      {text}
      {symbol}
    </div>
  </CSSTransition>
);

export default ShowUpdatedSetting;
