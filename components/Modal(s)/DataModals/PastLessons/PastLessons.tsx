import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import DataPastLessonsContent from './PastLessonsContent';
import { Styles } from '../_components';

export default function PastLessons() {
  const { dataModalName, storeDispatch } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'past'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      className={Styles.contentCSS.className}
      styles={Styles.contentCSS.styles}
    >
      <SetterProvider>
        <DataPastLessonsContent />
      </SetterProvider>
    </Modal>
  );
}
