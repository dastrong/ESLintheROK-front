import React, { useState } from 'react';
import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import useUserSession from 'hooks/useUserSession';
import Modal from 'components/Modals';
import { DataScreen, DataActionMessage, SaveDataScreen } from '../_components';

export default function DataCustomContent() {
  const { session } = useUserSession();

  const { storeDispatch } = useStore();
  const {
    vocabulary,
    expressions,
    sufficientData,
    setterDispatch,
  } = useSetter();

  const [showSubmissionScreen, setShowSubmissionScreen] = useState(false);

  return (
    <>
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      >
        Custom Lesson
      </Modal.Header>

      <Modal.Content style={{ position: 'relative' }}>
        <DataScreen />
        <SaveDataScreen
          show={showSubmissionScreen}
          setShow={setShowSubmissionScreen}
          vocabulary={vocabulary}
          expressions={expressions}
        />
      </Modal.Content>

      <Modal.Actions
        cancelText="Clear All"
        cancelClick={() => setterDispatch({ type: 'Clear_All' })}
        confirmText="Set Data"
        confirmClick={() => {
          session
            ? setShowSubmissionScreen(true)
            : storeDispatch({ type: 'Set_Data', vocabulary, expressions });
        }}
        confirmDisabled={!sufficientData || showSubmissionScreen}
      >
        <DataActionMessage />
      </Modal.Actions>
    </>
  );
}
