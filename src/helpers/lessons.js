// used when user chooses to reuse multiple past lessons
// or simply when setting a new lesson
export function createNewPastLesson(storePatch, data, pastLessons) {
  // add 1 to the largest id or start at 1 - to avoid duplicates
  const id = !!pastLessons.length
    ? Math.max(...pastLessons.map(lesson => lesson.id)) + 1
    : 1;
  const date = createDate();
  // add the new one at the end of all the other lessons
  const updatedStorage = [...pastLessons, { ...data, createdOn: date, id }];
  localStorage.setItem("lessonData", JSON.stringify(updatedStorage));
  storePatch({ type: "setPastLessons", pastLessons: updatedStorage });
  saveLatestLessonData(storePatch, data, date);
}

// used when user chooses to reuse only l past lesson
export function saveLatestLessonData(storePatch, data, date) {
  const usedOn = date || createDate();
  const lesson = { ...data, usedOn };
  localStorage.setItem("previousLessonData", JSON.stringify(lesson));
  storePatch({ type: "setData", ...data });
}

function createDate() {
  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();
  return `${day} at ${time}`;
}
