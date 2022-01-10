import React from 'react';
import { useStore } from 'contexts/store';
import { PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import ReminderSVG from 'components/Svgs/reminder.svg';

export default function GameWrapperDataNotice() {
  const { storeDispatch } = useStore();

  return (
    <>
      <ReminderSVG
        style={{
          display: 'block',
          width: '30%',
          maxWidth: 450,
          margin: '1rem auto',
        }}
      />

      <PageSubHeading style={{ marginBottom: 16 }}>
        You need some data to play this game.
        <br />
        Choose one of the options below to get set up.
      </PageSubHeading>

      <div>
        <Button
          color="white"
          bgColor="#007ab9"
          text="Choose an available lesson"
          style={{ marginRight: 8 }}
          onClick={() =>
            storeDispatch({
              type: 'Open_Data_Modal',
              dataModalName: 'lessons',
            })
          }
        />
        <Button
          color="white"
          bgColor="#5b52ed"
          text="Create a custom lesson"
          onClick={() =>
            storeDispatch({
              type: 'Open_Data_Modal',
              dataModalName: 'custom',
            })
          }
        />
        <style jsx>{`
          div {
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        `}</style>
      </div>
    </>
  );
}
