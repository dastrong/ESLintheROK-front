import React from 'react';
import DataCustom from './DataCustom';
import DataEdit from './DataEdit';
import Lessons from './Lessons';
import DataPastLessons from './DataPastLessons';

export default function DataModals() {
  return (
    <>
      <DataCustom />
      <DataEdit />
      <Lessons />
      <DataPastLessons />
    </>
  );
}
