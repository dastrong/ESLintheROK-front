import React from 'react';
import Link from 'next/link';
import Button from 'components/Button';

export default function PastLessonsContentNotice() {
  return (
    <div>
      <h3>Please create an account to manage lessons</h3>

      <Link href="/auth/signin" passHref>
        <Button
          as="a"
          color="white"
          bgColor="#04a7fb"
          text="Log in to get started"
        />
      </Link>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        h3 {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}
