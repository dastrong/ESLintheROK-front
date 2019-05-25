import React, { useState, useEffect } from "react";
import { Modal, Button, List } from "semantic-ui-react";
import { useStore } from "../store";
import "./PastLessonModal.css";

export default function PastLessonModal() {
  const [{ pastLessons, showPastLessons }, storePatch] = useStore();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const isLessons = localStorage.getItem("lessonData");
    if (!!isLessons) {
      const pastLessons = JSON.parse(isLessons);
      storePatch({ type: "setPastLessons", pastLessons });
    }
  }, [storePatch]);

  useEffect(() => {
    setSelected([]);
  }, [pastLessons]);

  function handleSelection(id) {
    const updatedArr = selectionUpdater(id);
    setSelected(updatedArr);
  }

  function deleteLesson(id) {
    const updatedArr = selectionUpdater(id);
    const updatedLessons = pastLessons.filter(lesson => lesson.id !== id);
    localStorage.setItem("lessonData", JSON.stringify(updatedLessons));
    storePatch({ type: "setPastLessons", pastLessons: updatedLessons });
    setSelected(updatedArr);
  }

  function deleteAllLessons() {
    localStorage.removeItem("lessonData");
    storePatch({ type: "setPastLessons", pastLessons: [] });
  }

  function selectionUpdater(id) {
    return selected.includes(id)
      ? selected.filter(x => x !== id)
      : [...selected, id].sort((a, b) => a - b);
  }

  function setData() {
    const filtered = pastLessons.filter(lesson => selected.includes(lesson.id));
    const data = filtered.reduce(
      (acc, cVal) => {
        acc.vocabulary = [...acc.vocabulary, ...cVal.vocabulary];
        acc.expressions = [...acc.expressions, ...cVal.expressions];
        return acc;
      },
      { vocabulary: [], expressions: [] }
    );
    storePatch({ type: "setData", ...data });
    storePatch({ type: "togglePastLessons", bool: false });
  }

  return (
    <Modal
      open={showPastLessons}
      closeIcon
      className="past-lesson-modal"
      onClose={() => storePatch({ type: "togglePastLessons", bool: false })}
    >
      <Modal.Header>
        Past Lessons Used
        <span> - Note: The following are only available on this computer</span>
      </Modal.Header>

      <LessonList
        lessons={pastLessons}
        selected={selected}
        handleSelection={handleSelection}
        deleteLesson={deleteLesson}
      />

      <Modal.Actions>
        {/* <div>
          <span>Tips:</span>
          <p>combine past lessons to review past vocab</p>
          <p>edit lessons after submission through the left sidebar</p>
          <p>if you want to savea  submitted lesson from here open the edit menu and click save</p>
        </div> */}
        <Button
          negative
          disabled={!pastLessons.length}
          size="large"
          content="Delete All"
          onClick={deleteAllLessons}
        />
        <Button
          primary
          disabled={!selected.length}
          size="large"
          content="Set Data"
          onClick={setData}
        />
      </Modal.Actions>
    </Modal>
  );
}

const LessonList = ({ lessons, handleSelection, selected, deleteLesson }) => (
  <Modal.Content scrolling>
    <List divided verticalAlign="middle" className="past-lesson-list">
      {!lessons.length ? (
        <List.Item className="no-past-lessons">No Lessons Found</List.Item>
      ) : (
        lessons.map(({ id, vocabulary, expressions, createdOn }) => {
          const isSelected = selected.includes(id);
          return (
            <List.Item key={id}>
              <List.Icon
                id={id}
                circular
                inverted
                size="big"
                verticalAlign="middle"
                name={isSelected ? "check" : "plus"}
                color={isSelected ? "green" : "grey"}
                onClick={() => handleSelection(id)}
              />
              <List.Content>
                <List.Header>{createdOn}</List.Header>
                <JoinedList data={vocabulary} title="Vocabulary" />
                <JoinedList data={expressions} title="Expressions" />
              </List.Content>
              <Button
                negative
                circular
                size="big"
                icon="trash alternate outline"
                onClick={() => deleteLesson(id)}
              />
            </List.Item>
          );
        })
      )}
    </List>
  </Modal.Content>
);

const JoinedList = ({ data, title }) => (
  <List.Description className="joined-list">
    <span>{title}: </span>
    {data.filter(x => x).join(", ") || "None Found"}
  </List.Description>
);
