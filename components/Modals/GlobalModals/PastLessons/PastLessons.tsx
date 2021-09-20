import React, { useReducer } from 'react';
import { Toaster } from 'react-hot-toast';

import { SetterProvider } from 'contexts/setter';
import { useStore } from 'contexts/store';
import useUserSession from 'hooks/useUserSession';
import Modal from 'components/Modals';

import { reducer, initialState } from './PastLessons.state';
import PastLessonsAuthNotice from './PastLessonsAuthNotice';
import PastLessonsList from './PastLessonsList';
import PastLessonsView from './PastLessonsView';
import PastLessonsEdit from './PastLessonsEdit';

export default function PastLessons() {
  const { session } = useUserSession();
  const { dataModalName, storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Data_Modal' });

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal
      isOpen={dataModalName === 'past'}
      closeModal={closeModal}
      style={{ content: { width: 767 } }}
    >
      <Toaster />

      <Modal.Header closeModal={closeModal}>Past Lessons</Modal.Header>

      {/* The following components have Modal.Content and Modal.Actions to customize the viewing experience */}
      {!session ? (
        <PastLessonsAuthNotice />
      ) : state.showing === 'list' ? (
        <PastLessonsList dispatch={dispatch} {...state} />
      ) : state.showing === 'view' ? (
        <SetterProvider vocabulary={[]} expressions={[]}>
          <PastLessonsView dispatch={dispatch} id={state.viewingId} />
        </SetterProvider>
      ) : state.showing === 'edit' ? (
        <SetterProvider vocabulary={[]} expressions={[]}>
          <PastLessonsEdit dispatch={dispatch} id={state.viewingId} />
        </SetterProvider>
      ) : null}
    </Modal>
  );
}
