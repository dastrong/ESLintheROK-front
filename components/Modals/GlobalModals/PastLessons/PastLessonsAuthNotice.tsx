import React from 'react';
import Link from 'next/link';
import Button from 'components/Button';
import Modal from 'components/Modals';

export default function PastLessonsContentNotice() {
  return (
    <>
      <Modal.Content
        style={{
          height: 350,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>
          Please create an account to manage lessons
          <style jsx>{`
            h3 {
              margin-top: 0;
            }
          `}</style>
        </h3>

        <Link href="/auth/signin" passHref>
          <Button
            as="a"
            color="white"
            bgColor="#04a7fb"
            text="Log in to get started"
          />
        </Link>
      </Modal.Content>

      <Modal.Actions />
    </>
  );
}
