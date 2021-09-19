import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import DataPastLessonsContent from './PastLessonsContent';

export default function PastLessons() {
  const { dataModalName, storeDispatch } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'past'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      style={{ content: { width: 767 } }}
    >
      <SetterProvider>
        <DataPastLessonsContent />
      </SetterProvider>
    </Modal>
  );
}
