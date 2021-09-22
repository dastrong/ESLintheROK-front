import React from 'react';
import DataCustom from './DataCustom';
import DataEdit from './DataEdit';
import Lessons from './Lessons';
import PastLessons from './PastLessons';
import Settings from './Settings';
import Gif from './Gif';

export default function DataModals() {
  return (
    <>
      <DataCustom />
      <DataEdit />
      <Lessons />
      <PastLessons />
      <Settings />
      <Gif />
    </>
  );
}
