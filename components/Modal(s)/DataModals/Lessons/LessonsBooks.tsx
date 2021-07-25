import React from 'react';
import useSwr from 'swr';
import Modal from 'components/Modal(s)';
import Skeleton from 'components/Skeleton';
import Image from 'components/Image';
import LessonsGradeCarousel from './LessonsGradeCarousel';
import type { Book, LessonsBooksProps } from './types';

export default function LessonsBooks({
  closeModal,
  dispatch,
  chosenGrade,
  grades,
  books,
}: LessonsBooksProps) {
  // fetch the books for this grade if we haven't already
  const { data: fetchedBooks } = useSwr<Book[]>(
    `/grade/${chosenGrade}/books`,
    (url: string) =>
      fetch('http://localhost:4000/api' + url)
        .then(r => r.json())
        .then((data: Book[]) => {
          dispatch({ type: 'Set_Books', books: data, gradeId: chosenGrade });
          return data;
        }),
    { isPaused: () => !!books[chosenGrade] }
  );

  const bookIds = grades.find(({ _id }) => _id === chosenGrade).books;

  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Book</Modal.Header>

      <Modal.Content>
        <div className="container">
          <div className="grade_button_container">
            <LessonsGradeCarousel
              grades={grades}
              dispatch={dispatch}
              activeItem={chosenGrade}
            />
          </div>

          <div className="books_container">
            {bookIds.map((bookId, i) => {
              const book = fetchedBooks && fetchedBooks[i];
              const bookTitle = book
                ? `${book?.publisher} ~ ${book?.author}`
                : '';
              const handleChooseBook = () => {
                dispatch({
                  type: 'Choose_Book',
                  chosenBook: bookId,
                  chosenBookImg: book?.imageURL,
                });
              };
              return (
                <div
                  className="book"
                  key={bookId}
                  onClick={handleChooseBook}
                  onKeyPress={handleChooseBook}
                  role="button"
                  tabIndex={0}
                >
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
          </div>

          <style jsx>{`
            .container {
              height: 350px;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .grade_button_container {
              margin: 0rem auto 2rem;
              display: flex;
              justify-content: center;
              width: 450px;
            }

            .books_container {
              display: flex;
              justify-content: space-evenly;
              width: 100%;
              margin-bottom: 0.5rem;
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
        cancelClick={() => dispatch({ type: 'Step_Decrease' })}
      />
    </>
  );
}
