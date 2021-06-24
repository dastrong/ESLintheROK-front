import React from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import { DataScreen, DataActionMessage } from '../_components';

export default function DataEditContent() {
  const { storeDispatch } = useStore();
  const { vocabulary, expressions, sufficientData } = useSetter();

  return (
    <>
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      >
        Edit Lesson
      </Modal.Header>

      <Modal.Content>
        <DataScreen />
      </Modal.Content>

      <Modal.Actions
        cancelText="Cancel"
        cancelClick={() => storeDispatch({ type: 'Close_Data_Modal' })}
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
