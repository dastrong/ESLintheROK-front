import React from 'react';
import Modal from 'components/Modal(s)';
import type { LessonsBooksProps } from './types';
import Carousel from 'components/Carousel';

export default function LessonsBooks({
  closeModal,
  decreaseStep,
  increaseStep,
  dispatch,
  chosenGrade,
  grades,
  books,
}: LessonsBooksProps) {
  // manipulate the fetches grades into a format the Carousel can understand
  const carouselItems = grades
    .sort((a, b) => a.grade - b.grade)
    .map(({ grade, _id }) => ({ text: `Grade ${grade}`, id: _id }));

  // determine the number of books there are for the chosenGrade
  const numOfBooks = grades.find(({ _id }) => _id === chosenGrade).books.length;

  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Book</Modal.Header>

      <Modal.Content>
        <div className="grade_button_container">
          <Carousel
            width="500px"
            itemColorScale={['#a56eec', '#138039']}
            items={carouselItems}
            activeItem={chosenGrade}
            numOfItemsToShow={Math.min(5, carouselItems.length)}
            handleClick={(chosenGrade: string) => {
              dispatch({ type: 'Choose_Grade', chosenGrade });
            }}
          />
          <style jsx>{`
            .grade_button_container {
              margin: 1rem auto 2rem;
              display: flex;
              justify-content: center;
              width: 450px;
            }
          `}</style>
        </div>

        <div className="books_container">
          <style jsx>{`
            .books_container {
            }
          `}</style>
        </div>
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={decreaseStep}
        confirmText="Select Above"
        confirmClick={increaseStep}
        confirmDisabled
      />
    </>
  );
}
