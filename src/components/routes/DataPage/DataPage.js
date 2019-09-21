import React from "react";
import Data from "@Data";
import PageHeader from "@Reusable/PageHeader";
import useDocumentTitle from "hooks/useDocumentTitle";

const data = { vocabulary: [], expressions: [] };

export default function DataPage() {
  useDocumentTitle("Custom Lesson - ESL in the ROK");

  return (
    <>
      <PageHeader icon="keyboard" text="Enter your own lesson data below" color="blue" />
      <div className="page-container">
        <div className="page-container-inner">
          <Data data={data} />
        </div>
      </div>
    </>
  );
}
