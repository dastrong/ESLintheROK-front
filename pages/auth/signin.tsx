import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/client';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';

export default function SignInPage() {
  const [email, setEmail] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signIn('email', { email });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SeoWrapper
      title="Account Verification"
      description="Use an account to save your lessons, settings and preferences between multiple computers! Just verify your email to get started."
    >
      <div>
        <PageHeading>Account Verification</PageHeading>
        <PageSubHeading>
          Use an account to save your lessons, settings and preferences between
          multiple computers! Please verify your email to login or signup below.
        </PageSubHeading>

        <form onSubmit={onSubmit}>
          <input
            required
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={InputCSS.className}
          />
          <Button
            full
            type="submit"
            color="white"
            bgColor="#2b7cd0"
            text="Submit"
            style={{ margin: '1.5rem auto 0' }}
          />
        </form>

        {InputCSS.styles}
        <style jsx>{`
          form {
            width: 100%;
            min-width: 300px;
            max-width: 350px;
            margin: 2rem auto;
            font-size: 0.8em;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
