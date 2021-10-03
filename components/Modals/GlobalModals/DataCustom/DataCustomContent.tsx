import React, { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { toast, Toaster } from 'react-hot-toast';

import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import useUserSession from 'hooks/useUserSession';
import { apiFetchToken } from 'utils/fetchers';

import Modal from 'components/Modals';
import Button from 'components/Button';
import InlineForm from 'components/InlineForm';
import { DataScreen, DataActionMessage } from '../_components';

export default function DataCustomContent() {
  const { session } = useUserSession();

  const { storeDispatch } = useStore();
  const {
    vocabulary,
    expressions,
    sufficientData,
    setterDispatch,
  } = useSetter();

  const [title, setTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);

  const handleSaveAndSet = async () => {
    // function to send the new data to our API to update it
    await apiFetchToken(
      `/past-lesson`,
      {
        method: 'POST',
        body: JSON.stringify({ title, vocabulary, expressions }),
      },
      session?.accessToken
    );
    storeDispatch({ type: 'Set_Data', vocabulary, expressions });
  };

  return (
    <>
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Data_Modal' })}
      >
        Custom Lesson
      </Modal.Header>

      <Modal.Content style={{ position: 'relative' }}>
        <DataScreen />
        <Toaster />
        <div
          style={{
            opacity: showTitleInput ? 1 : 0,
            pointerEvents: showTitleInput ? 'inherit' : 'none',
          }}
        >
          <InlineForm
            placeholder="Give this lesson a title here"
            value={title}
            onChange={setTitle}
            onSubmit={() =>
              toast.promise(handleSaveAndSet(), {
                loading: 'One moment please...',
                success: <b>Saved and set.</b>,
                error: err => err,
              })
            }
            disabled={!title}
            Icon={RiSendPlaneFill}
            style={{ margin: '0 1rem 0 0' }}
          />
          <Button
            color="white"
            bgColor="orangered"
            text="Cancel"
            onClick={() => setShowTitleInput(false)}
            style={{
              height: 44,
              boxShadow: '0 0.25rem 0.25rem 0 rgb(34 36 38 / 15%)',
            }}
          />

          <style jsx>{`
            div {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: linear-gradient(
                180deg,
                #fff,
                var(--siteBgColor),
                #fff
              );
              transition: opacity 1s;
            }
          `}</style>
        </div>
      </Modal.Content>

      <Modal.Actions
        cancelText="Clear All"
        cancelClick={() => setterDispatch({ type: 'Clear_All' })}
        confirmText={session ? 'Save and Set Lesson' : 'Set Data'}
        confirmClick={() => {
          session
            ? setShowTitleInput(true)
            : storeDispatch({ type: 'Set_Data', vocabulary, expressions });
        }}
        confirmDisabled={!sufficientData || showTitleInput}
      >
        <DataActionMessage />
      </Modal.Actions>
    </>
  );
}
