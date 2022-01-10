import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';

import useUserSession from 'hooks/useUserSession';
import { useSetter } from 'contexts/setter';
import { apiFetchToken, swrFetch } from 'utils/fetchers';
import Modal from 'components/Modals';
import { DataScreen, DataActionMessage } from '../_components';
import { PastLesson, PastLessonDispatch } from './PastLessons.types';

export default function PastLessonsEdit({
  id,
  dispatch,
}: {
  id: string;
  dispatch: PastLessonDispatch;
}) {
  const { session } = useUserSession();

  const { setterDispatch, vocabulary, expressions, sufficientData } =
    useSetter();

  // fetch the details of the past lesson for the given id prop
  const { data, isValidating, mutate } = useSWR<PastLesson>(
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

  // handle updating the title here
  const [title, setTitle] = useState(data?.title || 'Untitled');

  useEffect(() => {
    if (data?.title) setTitle(data.title);
  }, [isValidating]);

  // function to send the new data to our API to update it
  const handleUpdate = async () => {
    const updatedLesson: PastLesson = await apiFetchToken(
      `/past-lesson/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ title, vocabulary, expressions }),
      },
      session?.accessToken
    );
    mutate(updatedLesson);
    dispatch({ type: 'Set_Showing', showing: 'list' });
  };

  return (
    <>
      <Modal.Content>
        <input
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <p>{new Date(data?.createdAt).toDateString()}</p>
        <style jsx>{`
          input {
            margin: 0 auto 0.5rem;
            text-align: center;
            color: #414141;
            font-size: 2rem;
            font-weight: normal;
            display: block;
            width: 400px;
            border: 1px solid transparent;
            border-radius: 0.5rem;
          }

          input:hover {
            border: 1px solid #489dca;
          }

          p {
            margin: 0 auto 1.5rem;
            text-align: center;
            color: #505050;
            font-size: 1.1rem;
            text-decoration: solid underline #489dca;
          }
        `}</style>
        <DataScreen showPlaceholders={isValidating} />
      </Modal.Content>

      <Modal.Actions
        cancelColor="white"
        cancelBgColor="#b964ce"
        cancelClick={() => dispatch({ type: 'Set_Showing', showing: 'list' })}
        cancelText="Back to List"
        confirmColor="white"
        confirmBgColor="#489dca"
        confirmClick={() =>
          toast.promise(handleUpdate(), {
            loading: 'Saving...',
            success: <b>Updated.</b>,
            error: err => (
              <span>
                <b>Could Not Save:</b> {err}
              </span>
            ),
          })
        }
        confirmText="Update"
        confirmDisabled={!sufficientData || !title}
      >
        <DataActionMessage
          loading={isValidating}
          message="Requirements met. Update your lesson whenever."
        />
      </Modal.Actions>
    </>
  );
}
