import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import DataCustomContent from './DataCustomContent';
import { Styles } from '../_components';

export default function DataCustom() {
  const { dataModalName, storeDispatch } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'custom'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      className={Styles.contentCSS.className}
      styles={Styles.contentCSS.styles}
    >
      <SetterProvider>
        <DataCustomContent />
      </SetterProvider>
    </Modal>
  );
}
