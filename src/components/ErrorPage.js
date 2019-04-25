import React from "react";
import { Message } from "semantic-ui-react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import PageHeader from './reusable/PageHeader'

const containerStyle = {
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const messageStyle = {
  textAlign: "center",
  width: "100%",
  margin: "0",
};

const imgStyle = { margin: "auto" };

export default function Error() {
    useDocumentTitle("Error - ESL in the ROK");

    const { header, content } = this.props;
    return (
      <>
      <PageHeader icon="exclamation" color="red" text="Report your errors" />
      <div style={containerStyle}>
        <Message
          style={messageStyle}
          error
          size="big"
          header={header}
          content={content}
        />
        <img
          style={imgStyle}
          src="https://res.cloudinary.com/dastrong/image/upload/f_auto,q_45/v1539070526/TeacherSite/Misc/ErrorMeme.jpg"
          alt="fry-meme"
        />
      </div>
      </>
    );
  }
}