import React, { useState } from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';

import { Styles } from '../_components';
import LessonsGrades from './LessonsGrades';
import LessonsBooks from './LessonsBooks';
import LessonsLessons from './LessonsLessons';
import LessonsData from './LessonsData';
import type { Steps } from './types';

const steps: Steps[] = [
  'LOADING',
  'CHOOSE_GRADE',
  'CHOOSE_BOOK',
  'CHOOSE_LESSONS',
  'EDIT_DATA',
];

export default function Lessons() {
  const { dataModalName, storeDispatch } = useStore();

  const [grades, setGrades] = useState([]);
  const [books, setBooks] = useState([]);
  const [lessons, setLessons] = useState([]);

  // STEP INFO
  const [step, setStep] = useState(0);
  if (step < 0 || step >= steps.length) throw 'Step Threshold Exceeded';
  const currentStep = steps[step];

  const closeModal = () => storeDispatch({ type: 'Close_Data_Modal' });
  const decreaseStep = () => setStep(state => state - 1);
  const increaseStep = () => setStep(state => state + 1);

  return (
    <Modal
      isOpen={dataModalName === 'lessons'}
      closeModal={closeModal}
      className={Styles.contentCSS.className}
      styles={Styles.contentCSS.styles}
    >
      <SetterProvider>
        {currentStep === 'EDIT_DATA' ? (
          <LessonsData closeModal={closeModal} decreaseStep={decreaseStep} />
        ) : currentStep === 'CHOOSE_LESSONS' ? (
          <LessonsLessons
            closeModal={closeModal}
            decreaseStep={decreaseStep}
            increaseStep={increaseStep}
          />
        ) : currentStep === 'CHOOSE_BOOK' ? (
          <LessonsBooks
            closeModal={closeModal}
            decreaseStep={decreaseStep}
            increaseStep={increaseStep}
          />
        ) : (
          <LessonsGrades
            closeModal={closeModal}
            increaseStep={increaseStep}
            currentStep={currentStep}
          />
        )}
      </SetterProvider>
    </Modal>
  );
}
