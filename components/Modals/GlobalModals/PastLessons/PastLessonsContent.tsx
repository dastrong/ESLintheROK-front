import React, { useState } from 'react';

import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import useUserSession from 'hooks/useUserSession';

import Modal from 'components/Modals';
import PastLessonsList from './PastLessonsList';
import PastLessonsAuthNotice from './PastLessonsAuthNotice';

export default function PastLessonsContent() {
  const { session } = useUserSession();
  const { vocabulary, expressions, sufficientData } = useSetter();
  const { storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Data_Modal' });

  // array of _id's that have been clicked
  const [selectedPastLessons, setSelectedPastLesson] = useState<string[]>([]);

  // and/remove an _id each time the leftmost button is clicked
  const toggleSelection = (id: string) => {
    setSelectedPastLesson(state => {
      if (state.includes(id)) {
        return state.filter(x => x !== id);
      } else {
        return [...state, id];
      }
    });
  };

  return (
    <>
      <Modal.Header closeModal={closeModal}>Past Lessons Used</Modal.Header>

      <Modal.Content style={{ height: 350, overflowY: 'scroll' }}>
        {session ? (
          <PastLessonsList
            selectedPastLessons={selectedPastLessons}
            toggleSelection={toggleSelection}
          />
        ) : (
          <PastLessonsAuthNotice />
        )}
      </Modal.Content>

      <Modal.Actions
        cancelText="Delete All"
        cancelClick={closeModal}
        confirmText="Set Data"
        confirmClick={() => {
          storeDispatch({
            type: 'Set_Data',
            vocabulary,
            expressions,
          });
        }}
        confirmDisabled={!sufficientData}
      />
    </>
  );
}
