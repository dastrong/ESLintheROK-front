import React, { useCallback, useReducer } from "react";
import { Accordion, Icon, Progress } from "semantic-ui-react";
import { DForm, DTable, DButton, DApiInputs } from "./DataHelpers";
import { useStore } from "../store";
import useProgress from "../hooks/useProgress";
import "./Data.css";

const getInitialState = data => ({
  ...data,
  text: "",
  chapter: "",
  title: "",
  activeContent: "Vocabulary",
});

function reducer(state, action) {
  const { type, text, value, activeContent, id } = action;
  const { vocabulary, expressions } = state;
  switch (type) {
    case "Set_Text":
      return { ...state, text };
    case "Add_Vocabulary":
      return { ...state, text: "", vocabulary: [state.text, ...vocabulary] };
    case "Add_Expression":
      return { ...state, text: "", expressions: [state.text, ...expressions] };
    case "Edit_Vocabulary":
      return { ...state, text, vocabulary: vocabulary.filter((x, i) => i !== id) };
    case "Edit_Expression":
      return { ...state, text, expressions: expressions.filter((x, i) => i !== id) };
    case "Delete_Vocabulary":
      return { ...state, vocabulary: vocabulary.filter((x, i) => i !== id) };
    case "Delete_Expression":
      return { ...state, expressions: expressions.filter((x, i) => i !== id) };
    case "Change_Title":
      return { ...state, title: value };
    case "Change_Chapter":
      return { ...state, chapter: value };
    case "Set_Active_Content":
      return { ...state, activeContent, text: "" };
    default:
      return state;
  }
}

export default function Data({ isAPI, setScreen, postURL, data }) {
  const initialState = useCallback(getInitialState(data), [data]);
  const [{ pastLessons }, storePatch] = useStore();
  const [
    { text, vocabulary, expressions, chapter, title, activeContent },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { percent, color } = useProgress(isAPI, vocabulary, expressions, chapter, title);

  function toggleAccordion() {
    dispatch({
      type: "Set_Active_Content",
      activeContent: activeContent === "Vocabulary" ? "Expression" : "Vocabulary",
    });
  }

  function handleChange(e, { value }) {
    dispatch({ type: "Set_Text", text: value });
  }

  function handleEdit(e, { id, text }) {
    dispatch({ type: `Edit_${activeContent}`, id, text });
  }

  function handleDelete(e, { id }) {
    dispatch({ type: `Delete_${activeContent}`, id });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: `Add_${activeContent}`, text });
  }

  function setData() {
    const data = { vocabulary, expressions };
    // add 1 to the largest id or start at 1 - to avoid duplicates
    const id = !!pastLessons.length
      ? Math.max(...pastLessons.map(lesson => lesson.id)) + 1
      : 1;
    // create the data string
    const date = new Date();
    const day = date.toDateString();
    const time = date.toLocaleTimeString();
    const createdOn = `${day} at ${time}`;
    // add the new one at the end of all the other lessons
    const updatedStorage = [...pastLessons, { ...data, createdOn, id }];
    localStorage.setItem("lessonData", JSON.stringify(updatedStorage));
    storePatch({ type: "setData", ...data });
    storePatch({ type: "setPastLessons", pastLessons: updatedStorage });
    storePatch({ type: "closeDataModal" });
  }

  async function createLesson() {
    try {
      const data = { vocabulary, expressions, chapter, title };
      const url = process.env.REACT_APP_LESSONS_API_URL + postURL;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      setScreen(2);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="data-container">
      <Progress percent={percent} color={color} attached="top" />
      <DButton
        isAPI={isAPI}
        isOneHundy={percent === 100}
        handleClick={isAPI ? createLesson : setData}
      />
      <Progress percent={percent} color={color} attached="bottom" />

      {isAPI && <DApiInputs chapter={chapter} title={title} dispatch={dispatch} />}

      <Accordion fluid className={isAPI ? "isAPI" : ""}>
        <Accordion.Accordion>
          <Accordion.Title
            active={activeContent === "Vocabulary"}
            index={"Vocabulary"}
            onClick={toggleAccordion}
            className={vocabulary.length >= 9 ? "complete" : "incomplete"}
          >
            <Icon name="dropdown" />
            {`${vocabulary.length ? "Edit" : "Enter"} your vocabulary here!`}
          </Accordion.Title>
          <Accordion.Content active={activeContent === "Vocabulary"}>
            <DForm handleChange={handleChange} handleSubmit={handleSubmit} text={text} />
            <DTable
              data={vocabulary}
              header="Vocabulary"
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Accordion.Content>
        </Accordion.Accordion>
        <Accordion.Accordion>
          <Accordion.Title
            active={activeContent === "Expression"}
            index={"Expression"}
            onClick={toggleAccordion}
            className={expressions.length >= 6 ? "complete" : "incomplete"}
          >
            <Icon name="dropdown" />
            {`${expressions.length ? "Edit" : "Enter"} your expressions here!`}
          </Accordion.Title>
          <Accordion.Content active={activeContent === "Expression"}>
            <DForm handleChange={handleChange} handleSubmit={handleSubmit} text={text} />
            <DTable
              data={expressions}
              header="Expressions"
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Accordion.Content>
        </Accordion.Accordion>
      </Accordion>
    </div>
  );
}
