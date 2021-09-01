import React, { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import toast, { Toaster } from 'react-hot-toast';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';
import classNames from 'classnames';

const errors = {
  Signin: `Try signing with a different account.`,
  OAuthSignin: `Try signing with a different account.`,
  OAuthCallback: `Try signing with a different account.`,
  OAuthCreateAccount: `Try signing with a different account.`,
  EmailCreateAccount: `Try signing with a different account.`,
  Callback: `Try signing with a different account.`,
  OAuthAccountNotLinked: `To confirm your identity, sign in with the same account you used originally.`,
  EmailSignin: `Check your email address.`,
  CredentialsSignin: `Sign in failed. Check the details you provided are correct.`,
  default: `Unable to sign in.`,
};

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      // check if the input is valid
      if (!inputRef.current.checkValidity()) {
        // show a toast with the error from the client
        toast.error(inputRef.current.validationMessage);
        return;
      }
      // set a toast to indicate we're processing the payment
      toast.loading('Processing');
      // make the signin API call
      const resp = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: 'http://localhost:3000',
      });
      // when it's finished clear the toast
      toast.dismiss();
      // check for an error
      if (resp.error) {
        // get the error message - provided by NextAuth
        const error = resp.error && (errors[resp.error] ?? errors.default);
        // show that message
        toast.error(error);
        return;
      }
      // everything went good, redirect user to verify-token page
      router.push('/auth/verify-request');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SeoWrapper
      title="Sign In"
      description="Use an account to save your lessons, settings and preferences between multiple computers! Just verify your email to get started."
    >
      <div>
        <Toaster />
        <PageHeading>Account Verification</PageHeading>
        <PageSubHeading>
          Use an account to save your lessons, settings and preferences between
          multiple computers! Please verify your email to login or signup below.
        </PageSubHeading>

        <form onSubmit={onSubmit} noValidate>
          <input
            required
            ref={inputRef}
            type="email"
            placeholder="Your email"
            value={email}
            onFocus={() => !focused && setFocused(true)}
            onChange={e => setEmail(e.target.value)}
            className={classNames(InputCSS.className, { focused })}
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

          .focused:invalid {
            border-color: #ff1800;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
