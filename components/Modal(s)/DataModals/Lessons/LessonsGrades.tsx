import React, { useEffect } from 'react';
import Link from 'next/link';
import { animated, useSpring, config } from 'react-spring';

import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import Carousel from 'components/Carousel';
import LessonsGradesSVG from './LessonsGradesSVG';
import type { LessonsGradesProps, Grade } from './types';

export default function LessonsGrades({
  closeModal,
  increaseStep,
  currentStep,
  grades,
  dispatch,
}: LessonsGradesProps) {
  const isLoading = currentStep === 'LOADING';

  const { storeDispatch } = useStore();

  // animations that run once the grades have been loaded
  const svgStyles = useSpring({
    transform: `translateX(${isLoading ? -50 : -128}%)`,
    config: config.wobbly,
  });
  const contentStyles = useSpring({
    opacity: isLoading ? 0 : 1,
    delay: 300,
  });

  useEffect(() => {
    const getGrades = () =>
      fetch('http://localhost:4000/api/grades')
        .then(resp => resp.json())
        .then((grades: Grade[]) => dispatch({ type: 'Set_Grades', grades }))
        .then(increaseStep)
        .catch(console.log);

    if (!grades.length) getGrades();
  }, []);

  const carouselItems = grades
    .sort((a, b) => a.grade - b.grade)
    .map(({ grade, _id }) => ({ text: `Grade ${grade}`, id: _id }));

  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Grade</Modal.Header>

      <Modal.Content>
        <div className="container">
          <animated.div
            style={{ position: 'absolute', left: '50%', ...svgStyles }}
          >
            <LessonsGradesSVG isSleeping={isLoading} />
          </animated.div>

          <animated.div
            style={{ position: 'absolute', left: '41%', ...contentStyles }}
          >
            <h4>Choose your grade now!</h4>
            <Carousel
              width="100%"
              itemColorScale={['#a56eec', '#138039']}
              items={carouselItems}
              numOfItemsToShow={Math.min(5, carouselItems.length)}
              handleClick={(chosenGrade: string) => {
                dispatch({ type: 'Choose_Grade', chosenGrade });
              }}
            />
            <hr />
            <div>
              <h5>Don't see your grade above?</h5>
              <p>
                If you're in a hurry? Simply create a{' '}
                <button
                  className="text_button"
                  onClick={() =>
                    storeDispatch({
                      type: 'Open_Data_Modal',
                      dataModalName: 'custom',
                    })
                  }
                >
                  custom lesson
                </button>{' '}
                now.
              </p>
              <p>
                Otherwise, please read{' '}
                <Link href="/contribute/teacher">
                  <a className="text_button">this</a>
                </Link>
                .
              </p>
            </div>
          </animated.div>
        </div>
      </Modal.Content>

      <Modal.Actions
        cancelText="Exit"
        cancelClick={closeModal}
        confirmText="Select One Above"
        confirmClick={increaseStep}
        confirmDisabled
      >
        {isLoading && 'Please wait while we fetch available grades'}
      </Modal.Actions>

      <style jsx>{`
        .container {
          position: relative;
          height: 350px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h4 {
          margin: 1rem 0 1.25rem;
          font-size: 1.5rem;
        }

        hr {
          margin: 2rem 0;
          border-color: rgba(34, 36, 38, 0.15);
        }

        h5 {
          margin: 0 0 1rem;
          font-size: 1.25rem;
          color: #2d2d2d;
        }

        p {
          margin: 0 0 1rem;
          color: #2d2d2d;
        }

        .text_button {
          background: none;
          color: inherit;
          padding: 0;
          text-decoration: underline;
        }

        .text_button:hover {
          color: #731373;
        }
      `}</style>
    </>
  );
}
