import React, { FormEvent } from 'react';
import { signOut } from 'next-auth/client';
import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';

export default function SignOutPage() {
  async function onSingleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  }

  async function onAllSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SeoWrapper title="Account Signout" description="Sign out of your account.">
      <div>
        <PageHeading>Account Signout</PageHeading>
        <PageSubHeading>
          How would you like to handle this sign out?
        </PageSubHeading>

        <div>
          <form onSubmit={onSingleSubmit}>
            <Button
              full
              type="submit"
              color="white"
              bgColor="#2b7cd0"
              text="Sign out of this device"
            />
          </form>

          <form onSubmit={onAllSubmit}>
            <Button
              full
              inverted
              type="submit"
              color="white"
              bgColor="#e428bc"
              text="Sign out of all devices"
            />
          </form>
        </div>

        <style jsx>{`
          div div {
            display: flex;
            justify-content: space-between;
            width: 500px;
            margin-inline: auto;
          }

          form {
            width: 49%;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
