import React from 'react';
import useSWR from 'swr';
import { animated, useSpring } from 'react-spring';
import {
  FaCheck,
  FaPlus,
  FaRegEdit,
  FaSearch,
  FaShareAlt,
  FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCopyToClipboard } from 'react-use';

import useUserSession from 'hooks/useUserSession';
import { apiFetchToken, swrFetchToken } from 'utils/fetchers';
import Button from 'components/Button';
import Modal from 'components/Modals';
import { PastLesson, Props, State } from './PastLessons.types';
import * as Styles from './PastLessonsList.styles';

export default function PastLessonsList({
  selectedPastLessons = [],
  toggleSelection,
  dispatch,
  deleteId,
  deleteTitle,
  shareId,
  shareTitle,
}: Props & State) {
  // grab session to fetch user lessons
  const { session } = useUserSession();
  const copyToClipboard = useCopyToClipboard()[1];

  // fetch the user's past lessons
  const { data, mutate } = useSWR<PastLesson[]>(
    ['/past-lesson', session?.accessToken],
    swrFetchToken
  );

  // animation styles in Modal.Actions for delete, share and placeholder content
  const deleteDivSpring = useSpring({
    opacity: deleteId ? 1 : 0,
    x: deleteId ? 0 : -1000,
    delay: deleteId && !shareId ? 250 : 0,
  });
  const shareDivSpring = useSpring({
    opacity: shareId ? 1 : 0,
    x: shareId ? 0 : 1000,
    delay: shareId && !deleteId ? 250 : 0,
  });
  const noteDivSpring = useSpring({
    opacity: !deleteId && !shareId ? 1 : 0,
    y: !deleteId && !shareId ? 0 : 75,
    delay: !deleteId && !shareId ? 250 : 0,
  });

  const handleDelete = async (id: string) => {
    await apiFetchToken(
      `/past-lesson/${id}`,
      { method: 'DELETE' },
      session?.accessToken
    );
    mutate(data.filter(({ _id }) => _id !== id));
    dispatch({ type: 'Reset_Delete_Share' });
  };

  const handleShare = async (id: string) => {
    let shareUrl = `${window.location.host}/lesson/`;
    const targetedLesson = data.find(lesson => lesson._id === id);
    if (targetedLesson?.shortId) {
      shareUrl += targetedLesson.shortId;
    } else {
      const data = await apiFetchToken(
        `/past-lesson/${id}/shortId`,
        {},
        session?.accessToken
      );
      shareUrl += data.shortId;
    }
    copyToClipboard(shareUrl);
    dispatch({ type: 'Reset_Delete_Share' });
    return shareUrl;
  };

  return (
    <>
      <Modal.Content style={{ height: 350, overflowY: 'scroll' }}>
        <ul className={Styles.ListContainerCSS.className}>
          {data?.map(
            ({ _id, createdAt, title, vocabularyCount, expressionsCount }) => {
              const checked = selectedPastLessons.includes(_id);
              return (
                <li
                  key={_id}
                  className={Styles.ListItemCSS.className}
                  style={{
                    transform: `scale(${
                      [deleteId, shareId].includes(_id) ? 0.95 : 1
                    })`,
                  }}
                >
                  <div className={Styles.LeftSideCSS.className}>
                    <Button
                      size="lg"
                      rounded
                      Icon={checked ? FaCheck : FaPlus}
                      color="white"
                      bgColor={checked ? '#1a961a' : '#616161'}
                      onClick={() => toggleSelection(_id)}
                    />
                    <div className="text_container">
                      <h3>{title || createdAt}</h3>
                      <div>
                        <span>{vocabularyCount} Vocabulary</span>
                        <span>·</span>
                        <span>{expressionsCount} Expressions</span>
                      </div>
                    </div>
                    <style jsx>{`
                      .text_container {
                        margin-left: 1rem;
                      }

                      .text_container div {
                        color: #5e5e5e;
                      }

                      .text_container h3 {
                        margin: 0;
                        margin-bottom: 0.5rem;
                        font-size: 1.4rem;
                        color: #565656;
                      }

                      .text_container div span {
                        font-size: 1.1rem;
                      }

                      .text_container div span:nth-of-type(2) {
                        font-weight: bold;
                        margin-inline: 0.75rem;
                      }
                    `}</style>
                  </div>

                  <div>
                    <Button
                      rounded
                      Icon={FaSearch}
                      color="white"
                      bgColor="#C534EA"
                      onClick={() => dispatch({ type: 'View_Lesson', id: _id })}
                      style={{ margin: 4 }}
                    />
                    <Button
                      rounded
                      Icon={FaShareAlt}
                      color="white"
                      bgColor="#33C7E8"
                      onClick={() =>
                        dispatch({
                          type: 'Share_Lesson',
                          id: _id,
                          title: title,
                        })
                      }
                      style={{ margin: 4 }}
                      disabled={_id === shareId}
                    />
                    <Button
                      rounded
                      Icon={FaRegEdit}
                      color="white"
                      bgColor="#EF8D32"
                      onClick={() => dispatch({ type: 'Edit_Lesson', id: _id })}
                      style={{ margin: 4 }}
                    />
                    <Button
                      rounded
                      Icon={FaTrash}
                      color="white"
                      bgColor="#F03C47"
                      onClick={() =>
                        dispatch({
                          type: 'Delete_Lesson',
                          id: _id,
                          title: title,
                        })
                      }
                      style={{ margin: 4 }}
                      disabled={_id === deleteId}
                    />
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </Modal.Content>

      <Modal.Actions
        hideActions
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <animated.div
          className={Styles.ActionDivCSS.className}
          style={{ textAlign: 'right', ...deleteDivSpring }}
        >
          <span>
            Are you sure you want to <u>delete</u>: <br />
            <strong>{deleteTitle}</strong>
          </span>
          <Button
            rounded
            size="sm"
            color="white"
            bgColor="#067706"
            text="Yes, delete."
            onClick={() =>
              toast.promise(handleDelete(deleteId), {
                loading: 'Deleting...',
                success: <b>Deleted.</b>,
                error: err => (
                  <span>
                    <b>Could Not Delete:</b> {err}
                  </span>
                ),
              })
            }
            style={{ margin: 4, marginLeft: 16 }}
          />
          <Button
            inverted
            rounded
            size="sm"
            color="white"
            bgColor="red"
            text="Cancel"
            onClick={() => dispatch({ type: 'Reset_Delete_Share' })}
            style={{ margin: 4 }}
          />
        </animated.div>

        <animated.div
          className={Styles.ActionDivCSS.className}
          style={{ textAlign: 'right', ...shareDivSpring }}
        >
          <span>
            Do you want a <u>sharable</u> link for: <br />
            <strong>{shareTitle}</strong>
          </span>
          <Button
            rounded
            size="sm"
            color="white"
            bgColor="#067706"
            text="Yes, copy to my clipboard."
            onClick={() =>
              toast.promise(handleShare(shareId), {
                loading: 'Wait a second...',
                success: url => <b>Copied: {url}</b>,
                error: err => (
                  <span>
                    <b>Error:</b> {err}
                  </span>
                ),
              })
            }
            style={{ margin: 4, marginLeft: 16 }}
          />
          <Button
            inverted
            rounded
            size="sm"
            color="white"
            bgColor="red"
            text="Nope"
            onClick={() => dispatch({ type: 'Reset_Delete_Share' })}
            style={{ margin: 4 }}
          />
        </animated.div>

        <animated.div
          className={Styles.ActionDivCSS.className}
          style={{ textAlign: 'center', ...noteDivSpring }}
        >
          You may have a maximum of 30 saved lessons.
          <br />
          Lessons that haven't been used in half a year will automatically be
          removed.
        </animated.div>
      </Modal.Actions>

      {Styles.ListContainerCSS.styles}
      {Styles.ListItemCSS.styles}
      {Styles.LeftSideCSS.styles}
      {Styles.ActionDivCSS.styles}
    </>
  );
}
