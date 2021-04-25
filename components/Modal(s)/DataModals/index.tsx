import React from 'react';
import { useStore } from 'contexts/store';
import ModalDataCustom from './ModalDataCustom';
import ModalDataEdit from './ModalDataEdit';
import ModalDataLessons from './ModalDataLessons';
import ModalDataPastLessons from './ModalDataPastLessons';

export default function DataModals() {
  const { dataModalName, storeDispatch } = useStore();

  const closeDataModal = () => storeDispatch({ type: 'closeDataModal' });

  return (
    <>
      <ModalDataCustom
        closeModal={closeDataModal}
        dataModalName={dataModalName}
      />
      <ModalDataEdit
        closeModal={closeDataModal}
        dataModalName={dataModalName}
      />
      <ModalDataLessons
        closeModal={closeDataModal}
        dataModalName={dataModalName}
      />
      <ModalDataPastLessons
        closeModal={closeDataModal}
        dataModalName={dataModalName}
      />
    </>
  );
}
