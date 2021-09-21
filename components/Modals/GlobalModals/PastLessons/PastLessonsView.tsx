import React from 'react';
import useSWR from 'swr';
import { useSetter } from 'contexts/setter';
import { swrFetch } from 'utils/fetchers';
import Modal from 'components/Modals';
import { DataScreen } from '../_components';
import { PastLesson, PastLessonDispatch } from './PastLessons.types';

export default function PastLessonsView({
  id,
  dispatch,
}: {
  id: string;
  dispatch: PastLessonDispatch;
}) {
  const { setterDispatch } = useSetter();

  // fetch the details of the past lesson for the given id prop
  const { data, isValidating } = useSWR<PastLesson>(
    `/past-lesson/id/${id}`,
    swrFetch,
    {
      onSuccess: result =>
        setterDispatch({
          type: 'Set_Both',
          vocabulary: result.vocabulary,
          expressions: result.expressions,
        }),
    }
  );

  return (
    <>
      <Modal.Content>
        <h2>{data?.title || 'Untitled'}</h2>
        <p>{new Date(data?.createdAt).toDateString()}</p>
        <style jsx>{`
          h2 {
            margin: 0 auto 0.5rem;
            text-align: center;
            color: #414141;
            font-size: 2rem;
            font-weight: normal;
          }

          p {
            margin: 0 auto 0.5rem;
            text-align: center;
            color: #505050;
            font-size: 1.1rem;
            text-decoration: solid underline #489dca;
          }
        `}</style>
        <DataScreen hideForms disableHover showPlaceholders={isValidating} />
      </Modal.Content>

      <Modal.Actions
        cancelColor="white"
        cancelBgColor="#b964ce"
        cancelClick={() => dispatch({ type: 'Set_Showing', showing: 'list' })}
        cancelText="Back to List"
        confirmColor="white"
        confirmBgColor="#489dca"
        confirmClick={() => dispatch({ type: 'Edit_Lesson', id })}
        confirmText="Go To Edit"
      />
    </>
  );
}
