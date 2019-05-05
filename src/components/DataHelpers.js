import React, { useState, useEffect } from "react";
import { Form, Table, Icon, Button, Input } from "semantic-ui-react";

export function DButton({ isAPI, isOneHundy, handleClick }) {
  const [content, setContent] = useState("Submit");

  useEffect(() => {
    function getContent() {
      if (isAPI) {
        return isOneHundy
          ? "Thanks! Submit lesson."
          : "Please complete all the fields marked with red.";
      } else {
        return isOneHundy
          ? "Save and set your data!"
          : "Please enter more vocabulary or expressions";
      }
    }
    const content = getContent();
    setContent(content);
  }, [isAPI, isOneHundy]);

  return (
    <Button
      fluid
      className="submit-data-btn"
      disabled={!isOneHundy}
      onClick={handleClick}
      color={isOneHundy ? "green" : "blue"}
      content={content}
    />
  );
}

export const DForm = ({ handleSubmit, handleChange, text }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Input
        name="Text"
        value={text}
        onChange={handleChange}
        placeholder="ex) tree"
      />
      <Form.Button color="green" type="submit">
        Add
      </Form.Button>
    </Form.Group>
  </Form>
);

export const DTable = ({ data, header, handleDelete, handleEdit }) => {
  // returns list of data for the table below
  const items = data.map((item, i) => (
    <Table.Row key={i + item}>
      <Table.Cell>{item}</Table.Cell>
      <Table.Cell>
        <Icon
          link
          id={i}
          onClick={handleEdit}
          text={item}
          size="large"
          color="blue"
          name="edit"
          style={{ textAlign: "left" }}
        />
        <Icon
          link
          id={i}
          onClick={handleDelete}
          size="large"
          color="red"
          name="delete"
          style={{ textAlign: "right" }}
        />
      </Table.Cell>
    </Table.Row>
  ));
  return (
    <Table celled striped textAlign="center" widths={16}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={12}>{header}</Table.HeaderCell>
          <Table.HeaderCell width={4} />
        </Table.Row>
      </Table.Header>
      <Table.Body>{items}</Table.Body>
    </Table>
  );
};

export const DApiInputs = ({ chapter, title, dispatch }) => {
  const cxChap = `extra-input ${chapter ? "completed" : "incomplete"}`;
  const cxTitl = `extra-input ${title ? "completed" : "incomplete"}`;

  return (
    <div className="extra-inputs">
      <Input
        value={chapter}
        onChange={(e, { value }) => dispatch({ type: "Change_Chapter", value })}
        name="chapter"
        className={cxChap}
        placeholder="Chapter"
        type="number"
        min="1"
        max="15"
      />
      <Input
        value={title}
        onChange={(e, { value }) => dispatch({ type: "Change_Title", value })}
        name="title"
        className={cxTitl}
        placeholder="Title"
      />
    </div>
  );
};
