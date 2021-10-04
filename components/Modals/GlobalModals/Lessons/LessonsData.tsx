import React, { useEffect, useState } from 'react';

import { useSetter } from 'contexts/setter';
import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import { DataActionMessage, DataScreen, SaveDataScreen } from '../_components';
import type { LessonFull, LessonsDataProps } from './Lessons.types';
import { apiFetch } from 'utils/fetchers';
import useUserSession from 'hooks/useUserSession';

function getNumOfChanges(initialData: string[], updatedData: string[]) {
  const allSet = new Set([...initialData, ...updatedData]);
  return allSet.size - updatedData.length + allSet.size - initialData.length;
}

function checkIfInOrder(arr: number[]) {
  return arr.every((a, i, aa) => !i || aa[i - 1] === a - 1);
}

export default function LessonsData({
  closeModal,
  dispatch,
  chosenLessons,
  grade,
  publisher,
}: LessonsDataProps) {
  const { session } = useUserSession();

  const { storeDispatch } = useStore();
  const {
    setterDispatch,
    vocabulary,
    expressions,
    sufficientData,
  } = useSetter();

  const [initialData, setInitialData] = useState(null);
  const [showSubmissionScreen, setShowSubmissionScreen] = useState(false);

  useEffect(() => {
    const getLessonData = async () => {
      const urls = chosenLessons.map(lessonId => `/lesson/${lessonId}`);
      const data = await Promise.all<LessonFull>(
        urls.map(url => apiFetch(url))
      );
      // create a lesson string for titles like so ...
      // ... ex) L1-4 or L1,2,5,6
      const lessons = data.map(lesson => lesson.chapter).sort((a, b) => a - b);
      const dashedLessonString = checkIfInOrder(lessons);
      const lessonString = dashedLessonString
        ? `${lessons[0]}-${lessons[lessons.length - 1]}`
        : lessons.join(',');

      // combine every lesson's data array into one
      const { vocabulary, expressions } = data.reduce(
        (acc, cVal) => ({
          vocabulary: [...acc.vocabulary, ...cVal.vocabulary],
          expressions: [...acc.expressions, ...cVal.expressions],
        }),
        { vocabulary: [], expressions: [] }
      );

      // set the data setter context
      setterDispatch({ type: 'Set_Both', vocabulary, expressions });
      // set the initial data, so we may compare the final result with it, to see...
      // ...if has edited the given data enough that we can offer a save for them
      setInitialData({ vocabulary, expressions, lessonString });
    };

    getLessonData();
  }, []);

  let numOfChanges = 0;
  if (initialData) {
    const vocabChanges = getNumOfChanges(initialData?.vocabulary, vocabulary);
    const expressChanges = getNumOfChanges(
      initialData?.expressions,
      expressions
    );
    numOfChanges = vocabChanges + expressChanges;
  }

  return (
    <>
      <Modal.Header closeModal={closeModal}>
        Review/Edit/Set your data
      </Modal.Header>

      <Modal.Content style={{ position: 'relative' }}>
        <DataScreen showPlaceholders={!initialData} />
        <SaveDataScreen
          show={showSubmissionScreen}
          setShow={setShowSubmissionScreen}
          vocabulary={vocabulary}
          expressions={expressions}
          defaultTitle={`G${grade}_${publisher}_L${
            initialData?.lessonString || ''
          }`}
        />
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={() => dispatch({ type: 'Step_Decrease' })}
        confirmText="Set Data"
        confirmClick={() =>
          // check if a user is signed in and they've edited the data more than 10 times
          session && numOfChanges > 10
            ? setShowSubmissionScreen(true)
            : storeDispatch({ type: 'Set_Data', vocabulary, expressions })
        }
        confirmDisabled={!sufficientData || showSubmissionScreen}
      >
        <DataActionMessage />
      </Modal.Actions>
    </>
  );
}
