import React, { useEffect } from 'react';
import { useSetter } from 'contexts/setter';
import Modal from 'components/Modal(s)';
import { DataScreen } from '../_components';
import type { LessonFull, LessonsDataProps } from './types';

export default function LessonsData({
  closeModal,
  dispatch,
  chosenLessons,
}: LessonsDataProps) {
  const { setterDispatch } = useSetter();

  useEffect(() => {
    const getLessonData = async () => {
      const urls = chosenLessons.map(lessonId => `/lesson/${lessonId}`);
      const data = await Promise.all<LessonFull>(
        urls.map(url =>
          fetch(`http://localhost:4000/api${url}`).then(r => r.json())
        )
      );
      const { vocabulary, expressions } = data.reduce(
        (acc, cVal) => ({
          vocabulary: [...acc.vocabulary, ...cVal.vocabulary],
          expressions: [...acc.expressions, ...cVal.expressions],
        }),
        { vocabulary: [], expressions: [] }
      );
      setterDispatch({ type: 'Set_Both', vocabulary, expressions });
    };

    getLessonData();
  }, []);
  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Book</Modal.Header>

      <Modal.Content>
        <DataScreen />
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={() => dispatch({ type: 'Step_Decrease' })}
        confirmText="Set Data"
        confirmClick={() => dispatch({ type: 'Step_Increase' })}
        confirmDisabled={false}
      />
    </>
  );
}
