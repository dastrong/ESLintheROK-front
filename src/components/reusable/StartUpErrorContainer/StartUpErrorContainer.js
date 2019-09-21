import React from "react";
import PageHeader from "@Reusable/PageHeader";
import "./StartUpErrorContainer.css";

export default function StartUpErrorContainer({ icon, children }) {
  return (
    <>
      <PageHeader icon={icon} text="Welco... nvm." outerScopeError={true} />
      <div className="start-up-error-container">
        <div className="start-up-error-inner">{children}</div>
      </div>
    </>
  );
}
