import React from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import { DataScreen, DataActionMessage } from '../_components';

export default function DataCustomContent() {
  const { storeDispatch } = useStore();
  const {
    vocabulary,
    expressions,
    sufficientData,
    setterDispatch,
  } = useSetter();

  return (
    <>
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      >
        Custom Lesson
      </Modal.Header>

      <Modal.Content>
        <DataScreen />
      </Modal.Content>

      <Modal.Actions
        cancelText="Clear All"
        cancelClick={() => setterDispatch({ type: 'Clear_All' })}
        confirmText="Set Data"
        confirmClick={() => {
          storeDispatch({ type: 'Set_Data', vocabulary, expressions });
        }}
        confirmDisabled={!sufficientData}
      >
        <DataActionMessage />
      </Modal.Actions>
    </>
  );
}
