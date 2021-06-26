import React from 'react';
import Modal from 'components/Modal(s)';
import type { Props } from './types';

export default function LessonsLessons({
  closeModal,
  decreaseStep,
  increaseStep,
}: Props) {
  return (
    <>
      <Modal.Header closeModal={closeModal}>
        Choose a/some lesson(s)
      </Modal.Header>

      <Modal.Content>Book Cover and Lesson List Here</Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={decreaseStep}
        confirmText="Continue"
        confirmClick={increaseStep}
        // confirmDisabled={false}
      />
    </>
  );
}
