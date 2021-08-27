import React from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import PastLessonsContentList from './PastLessonsContentList';

export default function PastLessonsContent() {
  const { storeDispatch } = useStore();
  const { vocabulary, expressions, sufficientData } = useSetter();

  return (
    <>
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      >
        Past Lessons Used
      </Modal.Header>

      <Modal.Content>
        <PastLessonsContentList />
      </Modal.Content>

      <Modal.Actions
        cancelText="Delete All"
        cancelClick={() => storeDispatch({ type: 'Close_Data_Modal' })}
        confirmText="Set Data"
        confirmClick={() => {
          storeDispatch({
            type: 'Set_Data',
            vocabulary,
            expressions,
          });
        }}
        confirmDisabled={!sufficientData}
      >
        <span>
          <b>Note:</b> The following are only available on this computer
        </span>
      </Modal.Actions>
    </>
  );
}
