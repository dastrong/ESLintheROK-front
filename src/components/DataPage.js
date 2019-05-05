import React from "react";
import Data from "./Data";
import useDocumentTitle from "../hooks/useDocumentTitle";
import PageHeader from "./reusable/PageHeader";

export default function DataPage() {
  useDocumentTitle("Custom Lesson - ESL in the ROK");

  return (
    <>
      <PageHeader icon="keyboard" text="Enter your own lesson data below" color="blue" />
      <div className="page-container">
        <div className="page-container-inner">
          <Data />
        </div>
      </div>
    </>
  );
}
