import React, { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import Popup from 'components/Popup';

export default function SignOutPage() {
  const router = useRouter();

  async function onSingleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signOut({ redirect: false });
      router.push('/');
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
            <Popup
              content="Currently Unavailable"
              placement="bottom"
              visible
              owner={
                <Button
                  full
                  inverted
                  disabled // not available at the current moment
                  type="submit"
                  color="white"
                  bgColor="#e428bc"
                  text="Sign out of all devices"
                />
              }
            />
          </form>
        </div>

        <style jsx>{`
          div div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 3rem;
          }

          form {
            display: inline-block;
            width: 200px;
            margin: 0 0.5rem 0.5rem;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
