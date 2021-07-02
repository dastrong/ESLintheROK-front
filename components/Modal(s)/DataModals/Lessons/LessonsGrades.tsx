import React, { useState } from 'react';
import Modal from 'components/Modal(s)';
import type { Props } from './types';
import LessonsGradesSVG from './LessonsGradesSVG';
import { useEffect } from 'react';

export default function LessonsGrades({
  closeModal,
  increaseStep,
  currentStep,
}: Props & { currentStep: 'LOADING' | 'CHOOSE_GRADE' }) {
  const [grades, setGrades] = useState<null | []>(null);

  useEffect(() => {
    const getGrades = () =>
      fetch('http://localhost:4000/api/grades')
        .then(resp => resp.json())
        .then(setGrades)
        .then(() => setTimeout(increaseStep, 3000))
        .catch(console.log);

    if (!grades) getGrades();
  }, []);

  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Grade</Modal.Header>

      <Modal.Content>
        <LessonsGradesSVG isSleeping={currentStep === 'LOADING'} />
      </Modal.Content>

      <Modal.Actions
        cancelText="Exit"
        cancelClick={closeModal}
        confirmText="Select Above"
        confirmClick={increaseStep}
        // confirmDisabled
      >
        {currentStep === 'LOADING' &&
          'Please wait while we fetch available grades'}
      </Modal.Actions>
    </>
  );
}
