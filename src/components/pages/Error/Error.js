import React from "react";
import { Message } from "semantic-ui-react";
import useDocumentTitle from "hooks/useDocumentTitle";
import PageHeader from "@Reusable/PageHeader";
import TextLink from "@Reusable/TextLink";
import "./Error.css";

export default function Error(props) {
  useDocumentTitle("Error - ESL in the ROK");

  return (
    <>
      <PageHeader icon="exclamation" color="red" text="Please report your errors" />
      <div className="error-container">
        <Message
          className="error-container-msg"
          error
          size="large"
          header={props.header || "Sorry... that page doesn't exist."}
          content={props.content || <ErrorMsg />}
        />
        <img
          className="error-container-img"
          src="https://res.cloudinary.com/dastrong/image/upload/f_auto,q_45/v1539070526/TeacherSite/Misc/ErrorMeme.jpg"
          alt="fry-meme"
        />
      </div>
    </>
  );
}

const ErrorMsg = () => (
  <p>
    Double check the URL and go back to the
    <TextLink path="" text=" home page" />.
  </p>
);
