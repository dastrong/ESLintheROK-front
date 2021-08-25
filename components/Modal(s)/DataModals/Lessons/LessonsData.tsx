import React, { useEffect, useState } from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import { DataScreen } from '../_components';
import type { LessonFull, LessonsDataProps } from './Lessons.types';

export default function LessonsData({
  closeModal,
  dispatch,
  chosenLessons,
}: LessonsDataProps) {
  const { storeDispatch } = useStore();
  const {
    setterDispatch,
    vocabulary,
    expressions,
    sufficientData,
  } = useSetter();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    getLessonData();
  }, []);
  return (
    <>
      <Modal.Header closeModal={closeModal}>
        Review/Edit/Set your data
      </Modal.Header>

      <Modal.Content>
        <DataScreen showPlaceholders={loading} />
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={() => dispatch({ type: 'Step_Decrease' })}
        confirmText="Set Data"
        confirmClick={() => {
          storeDispatch({ type: 'Set_Data', vocabulary, expressions });
        }}
        confirmDisabled={!sufficientData}
      />
    </>
  );
}
