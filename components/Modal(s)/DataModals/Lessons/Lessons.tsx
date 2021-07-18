import React, { useReducer } from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';

import { Styles } from '../_components';
import LessonsGrades from './LessonsGrades';
import LessonsBooks from './LessonsBooks';
import LessonsLessons from './LessonsLessons';
import LessonsData from './LessonsData';
import type { Steps, State, Action } from './types';

const steps: Steps[] = [
  'LOADING',
  'CHOOSE_GRADE',
  'CHOOSE_BOOK',
  'CHOOSE_LESSONS',
  'EDIT_DATA',
];

const initialState: State = {
  step: 0,
  grades: [],
  lessons: [],
  chosenGrade: '',
  chosenBook: '',
  chosenLesson: '',
};

const reducer = (state: State, action: Action): State => {
  console.log(state, action);
  switch (action.type) {
    case 'Step_Increase':
      return { ...state, step: state.step + 1 };
    case 'Step_Decrease':
      return { ...state, step: state.step - 1 };
    case 'Set_Grades':
      return { ...state, grades: action.grades };
    case 'Set_Lessons':
      return { ...state, lessons: action.lessons };
    case 'Choose_Grade':
      return { ...state, chosenGrade: action.chosenGrade, step: 2 };
    case 'Choose_Book':
      return { ...state, chosenBook: action.chosenBook, step: 3 };
    case 'Choose_Lesson':
      return { ...state, chosenLesson: action.chosenLesson, step: 4 };
  }
};

export default function Lessons() {
  const { dataModalName, storeDispatch } = useStore();

  // REDUCER THAT HOLDS THE LOGIC AND INFO FOR THE WHOLE FLOW
  const [state, dispatch] = useReducer(reducer, initialState);

  // STEP CHECKER
  if (state.step < 0 || state.step >= steps.length) {
    throw 'Step Threshold Exceeded';
  }
  const currentStep = steps[state.step];

  const closeModal = () => storeDispatch({ type: 'Close_Data_Modal' });
  const decreaseStep = () => dispatch({ type: 'Step_Decrease' });
  const increaseStep = () => dispatch({ type: 'Step_Increase' });

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
            dispatch={dispatch}
            chosenGrade={state.chosenGrade}
            grades={state.grades}
          />
        ) : (
          <LessonsGrades
            closeModal={closeModal}
            increaseStep={increaseStep}
            dispatch={dispatch}
            currentStep={currentStep}
            grades={state.grades}
          />
        )}
      </SetterProvider>
    </Modal>
  );
}
