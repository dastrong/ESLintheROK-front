import React, { useState, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import * as Screen from "./ChooseLessonScreens";
import { apiRequest } from "../helpers/api";
import "./ChooseLesson.css";

function createOptions(grades) {
  return grades
    .sort((a, b) => a.grade - b.grade)
    .map(({ grade, _id }) => ({ key: _id, text: grade, id: _id, value: _id }));
}

export default function Lessons({ isAPI }) {
  const [screenNum, setScreen] = useState(1);
  const [isServerAwake, wakeUpServer] = useState(false);
  const [placeholder, setPlaceholder] = useState("Waking up..");
  const [activeGrade, setActiveGrade] = useState({ num: "", id: "" });
  const [grades, setGrades] = useState([]);
  const [books, setBooks] = useState([]);
  const [data, setData] = useState({ vocabulary: [], expressions: [] });

  console.log(isAPI);

  useEffect(() => {
    // updates messaging during long heroku cold starts
    const id = setTimeout(() => setPlaceholder("Almost there.."), 2000);
    // onMount fetch and setGrades
    async function fetchGrades() {
      const grades = await apiRequest("");
      clearTimeout(id);
      setPlaceholder("Choose one");
      setGrades(grades);
      wakeUpServer(true);
    }
    fetchGrades();
  }, []);

  async function handleGradeSelection(e, { value }) {
    const data = await apiRequest("/" + value);
    setBooks(data.books);
    setActiveGrade({ num: data.grade, value: data._id });
    setScreen(2);
  }

  const options = createOptions(grades);

  return (
    <TransitionGroup className="lessons-container">
      <Screen.First
        isIn={screenNum === 1}
        options={options}
        setGrades={setGrades}
        handleGradeSelection={handleGradeSelection}
        isServerAwake={isServerAwake}
        placeholder={placeholder}
      />
      <Screen.Second
        isIn={screenNum === 2}
        isAPI={isAPI}
        options={options}
        activeGrade={activeGrade}
        books={books}
        setScreen={setScreen}
        setData={setData}
        handleGradeSelection={handleGradeSelection}
      />
      <Screen.Third isIn={screenNum === 3} isAPI={isAPI} data={data} />
    </TransitionGroup>
  );
}
