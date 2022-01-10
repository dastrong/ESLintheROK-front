import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { FaCheck, FaPlus } from 'react-icons/fa';

import Modal from 'components/Modals';
import Image from 'components/Image';
import Skeleton from 'components/Skeleton';
import Button from 'components/Button';
import type { LessonsLessonsProps, LessonMini } from './Lessons.types';
import { swrFetch } from 'utils/fetchers';
import { cloudinaryLoader } from 'utils/getCloudUrls';

export default function LessonsLessons({
  closeModal,
  chosenBook,
  chosenBookImg,
  dispatch,
  books,
  lessons,
  chosenGrade,
}: LessonsLessonsProps) {
  const [chosenLessons, setChosenLessons] = useState<string[]>([]);

  const { data: fetchedLessons } = useSWR<LessonMini[]>(
    `/book/${chosenBook}/lessons`,
    swrFetch,
    {
      isPaused: () => !!lessons[chosenBook],
      onSuccess: data => {
        dispatch({ type: 'Set_Lessons', bookId: chosenBook, lessons: data });
      },
    }
  );

  const bookData = books[chosenGrade].find(({ _id }) => _id === chosenBook);
  const lessonIds = bookData.lessons.map(lessonId => ({
    _id: lessonId,
  }));

  return (
    <>
      <Modal.Header closeModal={closeModal}>
        Choose a/some lesson(s)
      </Modal.Header>

      <Modal.Content>
        <div className="content_container">
          <div className="left_container">
            <Image
              src={chosenBookImg}
              loader={cloudinaryLoader}
              alt="Chosen Book Cover"
              height={300}
              width={230}
              layout="fixed"
              placeholder="blur"
              style={{ borderRadius: '0.5rem' }}
            />
            <div>
              <Button
                inverted
                size="sm"
                color="transparent"
                bgColor="#424242"
                text="Select All"
                onClick={() =>
                  setChosenLessons(fetchedLessons.map(({ _id }) => _id))
                }
                style={{ width: '49%', textAlign: 'center' }}
              />
              <Button
                inverted
                size="sm"
                color="transparent"
                bgColor="#424242"
                text="Clear All"
                onClick={() => setChosenLessons([])}
                style={{ width: '49%', marginLeft: '2%' }}
              />
            </div>
          </div>

          <ul className="lessons_container">
            {(
              fetchedLessons?.sort((a, b) => a.chapter - b.chapter) || lessonIds
            ).map((lesson: LessonMini) => {
              const checked = chosenLessons.includes(lesson._id);
              return (
                <li key={lesson._id} className="lesson">
                  <Button
                    size="xs"
                    rounded
                    Icon={checked ? FaCheck : FaPlus}
                    color="white"
                    bgColor={checked ? '#1a961a' : '#2185d0'}
                    onClick={() => {
                      setChosenLessons(state => {
                        return checked
                          ? state.filter(id => id !== lesson._id)
                          : [...state, lesson._id];
                      });
                    }}
                  />
                  <span>
                    {lesson.chapter || <Skeleton circle width={18} count={1} />}
                    {':'}
                  </span>
                  <span>
                    {lesson.title || (
                      <Skeleton width={100 + Math.floor(Math.random() * 100)} />
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <style jsx>{`
            .content_container {
              height: 350px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .left_container {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .lessons_container {
              list-style-type: none;
              padding: 0;
              height: 100%;
              margin: 0;
              overflow: hidden auto;
              width: 350px;
              margin-left: 2rem;
            }

            .lesson {
              padding: 0.3rem 0;
              font-size: 1.15rem;
              line-height: 100%;
              display: flex;
              align-items: center;
            }

            .lesson span {
              margin-left: 0.5rem;
            }
          `}</style>
        </div>
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={() => dispatch({ type: 'Step_Decrease' })}
        confirmText="Continue"
        confirmBgColor="green"
        confirmClick={() =>
          dispatch({
            type: 'Choose_Lessons',
            chosenLessons: chosenLessons,
          })
        }
        confirmDisabled={!chosenLessons.length}
      >
        <div>
          Are we missing a lesson? Learn how to contribute{' '}
          <Link href="/contribute">
            <a>here</a>
          </Link>
          .
        </div>
      </Modal.Actions>
    </>
  );
}
