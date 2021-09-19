import React, { useState } from 'react';
import useSWR from 'swr';
import {
  FaCheck,
  FaPlus,
  FaRegEdit,
  FaSearch,
  FaShareAlt,
  FaTrash,
} from 'react-icons/fa';

import useUserSession from 'hooks/useUserSession';
import Button from 'components/Button';
import PastLessonsListItem from './PastLessonsListItem';
import { apiTokenFetch } from 'utils/fetchers';

type PastLesson = {
  _id: string;
  title?: string;
  vocabulary?: string[];
  vocabularyCount?: number;
  expressions?: string[];
  expressionsCount?: number;
  createdAt: string;
  expires: string;
};

type Props = {
  selectedPastLessons: string[];
  toggleSelection: (id: string) => void;
};

export default function PastLessonsList({
  selectedPastLessons,
  toggleSelection,
}: Props) {
  // grab session to fetch user lessons
  const { session } = useUserSession();

  // fetch the user's past lessons
  const { data, isValidating } = useSWR<PastLesson[]>(
    ['/past-lesson', session?.accessToken],
    apiTokenFetch
    // { revalidateIfStale: false }
  );
  console.log(data, isValidating);

  return (
    <ul>
      {data?.map(
        ({ _id, createdAt, title, vocabularyCount, expressionsCount }) => {
          const checked = selectedPastLessons.includes(_id);
          return (
            <li key={_id}>
              <div className="left_side">
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
              </div>

              <div>
                <Button
                  rounded
                  Icon={FaSearch}
                  color="white"
                  bgColor="#C534EA"
                  onClick={() => console.log('Viewed')}
                  style={{ margin: 4 }}
                />
                <Button
                  rounded
                  Icon={FaShareAlt}
                  color="white"
                  bgColor="#33C7E8"
                  onClick={() => console.log('Shared')}
                  style={{ margin: 4 }}
                />
                <Button
                  rounded
                  Icon={FaRegEdit}
                  color="white"
                  bgColor="#EF8D32"
                  onClick={() => console.log('Edited')}
                  style={{ margin: 4 }}
                />
                <Button
                  rounded
                  Icon={FaTrash}
                  color="white"
                  bgColor="#F03C47"
                  onClick={() => console.log('Deleted')}
                  style={{ margin: 4 }}
                />
              </div>
            </li>
          );
        }
      )}
      <style jsx>{`
        ul {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #d6d6d6;
          width: 100%;
          margin: 0 auto;
        }

        li:first-child {
          padding-top: 0;
        }

        li:last-child {
          border: none;
          padding-bottom: 0;
        }

        .left_side {
          display: flex;
          align-items: center;
        }

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
    </ul>
  );
}
