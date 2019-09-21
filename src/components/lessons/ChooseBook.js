import React, { useState } from "react";
import classNames from "classnames";
import { Icon, Button, Dropdown, Pagination } from "semantic-ui-react";
import ImgWithPlaceHolder from "@Reusable/ImgWithPlaceholder";
import { apiRequest } from "helpers/api";

export default function ChooseBook({
  activeGradeId,
  books,
  setScreen,
  setPostURL,
  setData,
  isAPI,
}) {
  const [isLoadingLessons, setLoader] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [lessons, setLessons] = useState([]);
  const [isSendingData, setSender] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [targetLessons, setTargetLessons] = useState([]);

  function openBook(e) {
    const id = e.currentTarget.id;
    const { x, width } = e.target.getBoundingClientRect();
    const middlePoint = window.innerWidth / 2;
    const targetLoca = middlePoint - (x + width / 2);
    setTargetLocation(targetLoca);
    setBookId(id);
    fetchLessons(id);
  }

  function closeBook() {
    setBookId(null);
    setTargetLocation(null);
    setLoader(true);
    setSender(false);
    setLessons([]);
    setTargetLessons([]);
  }

  async function fetchLessons(bookId) {
    const data = await apiRequest(`${activeGradeId}/${bookId}`);
    setLessons(data.lessons);
    setLoader(false);
  }

  async function fetchLessonData() {
    setSender(true);
    const halfURL = `${activeGradeId}/${bookId}`;
    const urls = targetLessons.map(url => `${halfURL}/${url}`);
    const data = await Promise.all(urls.map(url => apiRequest(url)));
    const combinedData = data.reduce(
      (acc, cVal) => ({
        vocabulary: [...acc.vocabulary, ...cVal.vocabulary],
        expressions: [...acc.expressions, ...cVal.expressions],
      }),
      { vocabulary: [], expressions: [] }
    );
    setData(combinedData);
    setScreen(3);
  }

  function apiSetScreen() {
    const postURL = `${activeGradeId}/${bookId}`;
    setScreen(3);
    setPostURL(postURL);
  }

  const whichPages = activePage === 1 ? [0, 5] : [5, books.length];

  const options = lessons
    .sort((a, b) => a.chapter - b.chapter)
    .map(({ _id, chapter, title }) => ({
      key: _id,
      value: _id,
      text: `${chapter}: ${title}`,
    }));

  const labels = label => ({
    color: "blue",
    content: `${label.text.slice(0, label.text.indexOf(":"))}`,
  });

  const items = books
    .sort((a, b) => a.publisher > b.publisher)
    .slice(...whichPages)
    .map(({ lessons, publisher, author, imageURL, _id }, i) => {
      const active = bookId === _id;
      const leftOrRight = i < 3 ? "+" : "-";
      const cO = classNames({ active: active });
      const cX = classNames({ notActive: !active && bookId });
      const style = active
        ? {
            transform: `translateX(${targetLocation}px) rotateY(${leftOrRight}180deg) scale(2)`,
          }
        : null;
      return (
        <div key={i} className={`book-item ${cO + cX}`} style={style}>
          <div className={`book-front ${cO}`} onClick={openBook} id={_id}>
            <div className="book-image">
              <ImgWithPlaceHolder src={imageURL} alt="book-cover" />
            </div>
            <div className="book-author">
              <p>{`${publisher}, ${author}`}</p>
              <Icon color={lessons.length > 0 ? "green" : "red"} name="folder open" />
            </div>
          </div>
          <div className={`book-back ${cO}`}>
            <Button
              fluid
              color="green"
              content={isAPI ? "Create Lesson" : "Continue"}
              disabled={!(isAPI || targetLessons.length)}
              loading={isSendingData}
              onClick={isAPI ? apiSetScreen : fetchLessonData}
            />
            <Dropdown
              fluid
              multiple
              selection
              compact
              value={targetLessons}
              disabled={isAPI}
              placeholder={
                isAPI
                  ? "Please don't recereate lessons!"
                  : isLoadingLessons
                  ? "Loading..."
                  : lessons.length
                  ? "Select your lesson"
                  : "No lessons found"
              }
              open={!isLoadingLessons}
              options={options}
              renderLabel={labels}
              onChange={(e, { value }) => (!isAPI ? setTargetLessons(value) : null)}
            />
            <Icon
              name="x"
              size="big"
              color="red"
              className="close-book"
              onClick={closeBook}
            />
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="book-holder">{items}</div>
      <Pagination
        disabled={books.length < 6}
        activePage={activePage}
        onPageChange={setActivePage}
        totalPages={Math.ceil(books.length / 5)}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        prevItem={null}
        nextItem={null}
      />
    </>
  );
}
