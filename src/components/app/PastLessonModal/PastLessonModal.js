import React, { useState, useEffect } from "react";
import { Modal, Button, List, Message } from "semantic-ui-react";
import { useStore } from "store";
import useFirstRun from "hooks/useFirstRun";
import { createNewPastLesson, saveLatestLessonData } from "helpers/lessons";
import "./PastLessonModal.css";

// get the last lesson entered
const isLastLesson = localStorage.getItem("previousLessonData");
const lastLesson = !!isLastLesson && JSON.parse(isLastLesson);

export default function PastLessonModal() {
  const isFirstRun = useFirstRun();
  const [{ pastLessons, showPastLessons }, storePatch] = useStore();
  const [selected, setSelected] = useState([]);

  const [showMsg, setShowMsg] = useState(lastLesson);
  const closeMsg = () => setShowMsg(false);

  useEffect(() => {
    if (!showMsg) return;
    const id = setTimeout(closeMsg, 30000);
    return () => clearTimeout(id);
  }, [showMsg]);

  if (isFirstRun && showMsg) {
    return <PastLessonMessage close={closeMsg} date={lastLesson.usedOn} />;
  }

  if (!showPastLessons) return null;

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
    if (updatedLessons.length) return;
    // if there's no other past lessons delete previous lesson data
    localStorage.removeItem("previousLessonData");
  }

  function deleteAllLessons() {
    localStorage.removeItem("lessonData");
    localStorage.removeItem("previousLessonData");
    storePatch({ type: "setPastLessons", pastLessons: [] });
    setSelected([]);
  }

  function selectionUpdater(id) {
    return selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
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
    if (filtered.length > 1) {
      // two lessons are combined, that would make it a new lesson
      createNewPastLesson(storePatch, data, pastLessons);
    } else {
      // reusing a lesson, update the latest(previous) lesson localStorage
      saveLatestLessonData(storePatch, data);
    }
    storePatch({ type: "togglePastLessons", bool: false });
    setSelected([]);
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
        <List.Item>No Lessons Found</List.Item>
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

const PastLessonMessage = ({ close, date }) => (
  <Message
    className="past-lessons-msg"
    floating
    info
    onDismiss={close}
    header="We've automatically set some lesson data for you"
    content={`It was last used on: ${date}`}
  />
);
