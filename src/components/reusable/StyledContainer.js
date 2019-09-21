import React from "react";
import classnames from "classnames";
import "./StyledContainer.css";

export default function StyledContainer({ cx, children }) {
  const className = classnames("content-info", cx);
  return (
    <div className="page-container">
      <div className={className}>{children}</div>
    </div>
  );
}
