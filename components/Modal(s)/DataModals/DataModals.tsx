import React from 'react';
import DataCustom from './DataCustom';
import DataEdit from './DataEdit';
import DataLessons from './DataLessons';
import DataPastLessons from './DataPastLessons';

export default function DataModals() {
  return (
    <>
      <DataCustom />
      <DataEdit />
      <DataLessons />
      <DataPastLessons />
    </>
  );
}
