import React from "react";
import ChooseLesson from "./ChooseLesson";
import PageHeader from "./reusable/PageHeader";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function ChooseLessonPage({ location }) {
  const isAPI = location.pathname.includes("/api");

  useDocumentTitle(`${isAPI ? "Create" : "Choose"} Lesson - ESL in the ROK`);

  return (
    <>
      <PageHeader icon="book" text="Get your book's lesson data below" color="blue" />
      <div className="page-container">
        <div className="page-container-inner">
          <ChooseLesson isAPI={isAPI} />
        </div>
      </div>
    </>
  );
}
