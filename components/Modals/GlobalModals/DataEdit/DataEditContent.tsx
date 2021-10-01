import React from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import { DataScreen, DataActionMessage } from '../_components';

export default function DataEditContent() {
  const { vocabulary, expressions, sufficientData } = useSetter();
  const { storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Data_Modal' });

  return (
    <>
      <Modal.Header closeModal={closeModal}>Edit Lesson</Modal.Header>

      <Modal.Content>
        <DataScreen />
      </Modal.Content>

      <Modal.Actions
        cancelText="Cancel"
        cancelClick={closeModal}
        confirmText="Update Data"
        confirmClick={() => {
          storeDispatch({
            type: 'Set_Data',
            vocabulary,
            expressions,
          });
        }}
        confirmDisabled={!sufficientData}
      >
        <DataActionMessage />
      </Modal.Actions>
    </>
  );
}
