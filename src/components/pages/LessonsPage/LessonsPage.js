import React from "react";
import Lessons from "@Lessons";
import PageHeader from "@Reusable/PageHeader";
import useDocumentTitle from "hooks/useDocumentTitle";

export default function LessonsPage({ location }) {
  const isAPI = location.pathname.includes("/api");

  useDocumentTitle(`${isAPI ? "Create" : "Choose"} Lesson - ESL in the ROK`);

  return (
    <>
      <PageHeader icon="book" text="Get your book's lesson data below" color="blue" />
      <div className="page-container">
        <div className="page-container-inner">
          <Lessons isAPI={isAPI} />
        </div>
      </div>
    </>
  );
}
