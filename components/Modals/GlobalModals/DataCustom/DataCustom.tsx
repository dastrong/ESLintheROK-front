import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import DataCustomContent from './DataCustomContent';

export default function DataCustom() {
  const { dataModalName, storeDispatch } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'custom'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      style={{ content: { width: 767 } }}
    >
      <SetterProvider>
        <DataCustomContent />
      </SetterProvider>
    </Modal>
  );
}
