import React from 'react';
import useSwr from 'swr';
import Modal from 'components/Modal(s)';
import Carousel from 'components/Carousel';
import Skeleton from 'components/Skeleton';
import Image from 'components/Image';
import type { Book, LessonsBooksProps } from './types';

export default function LessonsBooks({
  closeModal,
  decreaseStep,
  increaseStep,
  dispatch,
  chosenGrade,
  grades,
}: LessonsBooksProps) {
  const { data: books } = useSwr<Book[]>(`/grade/${chosenGrade}/books`);

  const bookIds = grades.find(({ _id }) => _id === chosenGrade).books;

  // manipulate the fetches grades into a format the Carousel can understand
  const carouselItems = grades
    .sort((a, b) => a.grade - b.grade)
    .map(({ grade, _id }) => ({ text: `Grade ${grade}`, id: _id }));

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
          {bookIds.map((bookId, i) => {
            const book = books && books[i];
            const bookTitle = book
              ? `${book?.publisher} ~ ${book?.author}`
              : '';
            return (
              <div className="book" key={bookId}>
                <Image
                  key={bookId}
                  src={book?.imageURL || ''}
                  alt={`Book Cover ${bookTitle}`}
                  height={160}
                  width={123}
                  style={{ borderRadius: '0.5rem' }}
                />
                <h4>
                  {bookTitle || (
                    <Skeleton addStyle={{ width: '90%', marginLeft: '5%' }} />
                  )}
                </h4>
              </div>
            );
          })}
          <style jsx>{`
            .books_container {
              display: flex;
              justify-content: space-evenly;
              width: 100%;
              margin-bottom: 1.5rem;
            }

            h4 {
              margin: 0.5rem 0 0;
              text-align: center;
              color: #4a4a4a;
            }

            .book {
              cursor: pointer;
              position: relative;
              transition: filter 250ms;
            }

            .book:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0.5rem;
              background-color: #2b91de;
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
              opacity: 0;
              transform: translateY(8px);
              transition-property: transform, opacity;
              transition-duration: 150ms;
              transition-delay: 100ms;
            }

            .book:hover {
              filter: grayscale(75%);
            }
            .book:hover :after {
              opacity: 1;
              transform: translateY(16px);
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
