import React from 'react';
import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import { Styles } from '../_components';

export default function DataPastLessons() {
  const { dataModalName, storeDispatch, vocabulary, expressions } = useStore();

  return (
    <Modal
      isOpen={dataModalName === 'past'}
      closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      className={Styles.contentCSS.className}
      styles={Styles.contentCSS.styles}
    >
      <SetterProvider vocabulary={vocabulary} expressions={expressions}>
        {/* CONTENT */}
      </SetterProvider>
    </Modal>
  );
}
