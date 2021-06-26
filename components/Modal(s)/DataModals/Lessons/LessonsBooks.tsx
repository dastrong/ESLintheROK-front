import React from 'react';
import Button from 'components/Button';
import Modal from 'components/Modal(s)';
import type { Props } from './types';

const gradeButtonColors = ['#6856d5', '#087942', '#a62463', '#3c768f'];

export default function LessonsBooks({
  closeModal,
  decreaseStep,
  increaseStep,
  grades = ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
}: Props & { grades?: string[] }) {
  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Book</Modal.Header>

      <Modal.Content>
        <div className="grade_button_container">
          {grades.map((grade, i) => (
            <Button
              key={grade}
              rounded
              text={grade}
              color="white"
              bgColor={gradeButtonColors[i]}
              style={{ margin: '0 0.25rem' }}
            />
          ))}
          <style jsx>{`
            .grade_button_container {
              margin: 1rem auto 2rem;
              display: flex;
              justify-content: center;
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
        // confirmDisabled
      />
    </>
  );
}
