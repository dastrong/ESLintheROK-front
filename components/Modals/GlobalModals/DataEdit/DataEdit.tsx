import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import DataEditContent from './DataEditContent';

export default function DataEdit() {
  const { dataModalName, storeDispatch, vocabulary, expressions } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'edit'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      style={{ content: { width: 767 } }}
    >
      <SetterProvider vocabulary={vocabulary} expressions={expressions}>
        <DataEditContent />
      </SetterProvider>
    </Modal>
  );
}
