import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useStore } from 'contexts/store';
import { apiFetch, swrFetch } from 'utils/fetchers';
import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';

export default function SharedLessonPage() {
  const router = useRouter();
  const { storeDispatch } = useStore();

  const { data, error } = useSWR(
    `/past-lesson/shortId/${router.query.shortId}`,
    swrFetch,
    {
      isPaused: () => !router.query.shortId,
      onSuccess: async data => {
        storeDispatch({
          type: 'Set_Data',
          vocabulary: data.vocabulary,
          expressions: data.expressions,
        });
        await apiFetch(`/past-lesson/${data._id}/expiry`, { method: 'PUT' });
      },
    }
  );

  return (
    <SeoWrapper
      title="Shared Lesson"
      description="Have a shared lesson code? Use it here to get and set that lesson's data."
    >
      <PageHeading>Shared Lesson</PageHeading>
      <PageSubHeading>
        {error ||
          (!data && !error
            ? 'Please wait a moment while we get that data for you.'
            : `Lesson (${
                data?.title || 'Untitled'
              }) data has been set. Have a good class 👍`)}
      </PageSubHeading>

      <div>
        <Link href="/games" passHref>
          <Button
            as="a"
            color="white"
            bgColor="#2b7cd0"
            text="Go To Games Screen"
            style={{ textAlign: 'center' }}
          />
        </Link>

        <Button
          inverted
          color="white"
          bgColor="#e428bc"
          text="Customize Lesson Data"
          onClick={() => {
            storeDispatch({ type: 'Open_Data_Modal', dataModalName: 'edit' });
          }}
          style={{ marginLeft: 8 }}
        />

        <style jsx>{`
          div {
            display: flex;
            justify-content: center;
            width: 500px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
