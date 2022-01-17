/* eslint-disable jsx-a11y/autocomplete-valid */
import React, { FormEvent, useReducer, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import useUserSession from 'hooks/useUserSession';
import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import { InputCSS } from 'components/Styles';

type State = string[];

type Action =
  | { type: 'Set_Value_0'; value: string }
  | { type: 'Set_Value_1'; value: string }
  | { type: 'Set_Value_2'; value: string }
  | { type: 'Set_Value_3'; value: string }
  | { type: 'Set_Value_4'; value: string }
  | { type: 'Set_Value_5'; value: string };

const reducer = (state: State, action: Action): State => {
  const newState = [...state];
  switch (action.type) {
    case 'Set_Value_0': {
      newState[0] = action.value;
      return newState;
    }
    case 'Set_Value_1': {
      newState[1] = action.value;
      return newState;
    }
    case 'Set_Value_2': {
      newState[2] = action.value;
      return newState;
    }
    case 'Set_Value_3': {
      newState[3] = action.value;
      return newState;
    }
    case 'Set_Value_4': {
      newState[4] = action.value;
      return newState;
    }
    case 'Set_Value_5': {
      newState[5] = action.value;
      return newState;
    }
    default:
      return { ...state };
  }
};

export default function VerifyRequestPage() {
  const router = useRouter();
  const email = router.query.email;

  const { updateSession } = useUserSession();

  const [state, dispatch] = useReducer(reducer, ['', '', '', '', '', '']);
  const isCodeEntered = state.every(x => Number.isInteger(parseInt(x)));
  const [num1, num2, num3, num4, num5, num6] = state;

  // grab refs for each of the inputs
  const input0Ref = useRef<HTMLInputElement>();
  const input1Ref = useRef<HTMLInputElement>();
  const input2Ref = useRef<HTMLInputElement>();
  const input3Ref = useRef<HTMLInputElement>();
  const input4Ref = useRef<HTMLInputElement>();
  const input5Ref = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (isCodeEntered) buttonRef.current.focus();
  }, [isCodeEntered]);

  // once the value is updated run the onBlur event
  useEffect(() => {
    input1Ref.current.focus();
    input1Ref.current.select();
  }, [num1]);

  useEffect(() => {
    input2Ref.current.focus();
    input2Ref.current.select();
  }, [num2]);

  useEffect(() => {
    input3Ref.current.focus();
    input3Ref.current.select();
  }, [num3]);

  useEffect(() => {
    input4Ref.current.focus();
    input4Ref.current.select();
  }, [num4]);

  useEffect(() => {
    input5Ref.current.focus();
    input5Ref.current.select();
  }, [num5]);

  useEffect(() => {
    input5Ref.current.blur();
  }, [num6]);

  // verify the code given
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `/api/auth/callback/email?email=${encodeURIComponent(
          email as string
        )}&token=${state.join('')}`
      );
      // if the response fails or includes an error, redirect user
      if (!resp.ok || resp.url.includes('auth/error')) {
        router.push(resp.url);
      } else {
        const session = await getSession();
        await updateSession(session);
        if (resp.url.includes('/auth/new-user')) {
          router.push('/auth/new-user');
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SeoWrapper
      noindex
      title="Verify Email"
      description="Check your email to verify that you are who you say you are."
    >
      <div>
        <PageHeading>Check your email</PageHeading>
        <PageSubHeading>
          A sign in link/code was sent to the following email address:
          <br />
          ---{' '}
          <>
            {email || (
              <>
                We're missing your email.{' '}
                <Link href="/auth/signin">
                  <a>Enter it again</a>
                </Link>
                .
              </>
            )}
          </>{' '}
          ---
        </PageSubHeading>

        <form onSubmit={onSubmit}>
          <div className="inputs_container">
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input0Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[0]}
              onClick={() => input0Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_0', value: e.target.value });
              }}
            />
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input1Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[1]}
              onClick={() => input1Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_1', value: e.target.value });
              }}
            />
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input2Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[2]}
              onClick={() => input2Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_2', value: e.target.value });
              }}
            />
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input3Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[3]}
              onClick={() => input3Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_3', value: e.target.value });
              }}
            />
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input4Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[4]}
              onClick={() => input4Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_4', value: e.target.value });
              }}
            />
            <input
              type="text"
              autoComplete="chrome-off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="numeric"
              pattern="[0-9]*"
              ref={input5Ref}
              minLength={1}
              maxLength={1}
              className={InputCSS.className}
              value={state[5]}
              onClick={() => input5Ref.current.select()}
              onChange={e => {
                dispatch({ type: 'Set_Value_5', value: e.target.value });
              }}
            />
          </div>

          <div className="actions_container">
            <div>
              {email && (
                <p>
                  Incorrect email?{' '}
                  <Link href="/auth/signin">
                    <a>Enter it again</a>
                  </Link>
                  .
                </p>
              )}
              <p>
                Didn't get a code?{' '}
                <Link href="/contact">
                  <a>Contact me</a>
                </Link>
                .
              </p>
            </div>

            <Button
              type="submit"
              size={email ? 'lg' : 'md'}
              color="white"
              bgColor="#2b7cd0"
              text="Verify Code"
              ref={buttonRef}
              disabled={!isCodeEntered || !email}
              style={{ width: email ? 'inherit' : 140 }}
            />
          </div>
        </form>

        {InputCSS.styles}
        <style jsx>{`
          form {
            width: 100%;
            min-width: 300px;
            max-width: 375px;
            margin: 0 auto;
            text-align: center;
            padding: 0.25rem 0 1rem;
          }

          input {
            cursor: pointer;
            height: 3.5rem;
            max-width: 50px;
            font-size: 1.75rem;
            padding: 0.5rem;
            text-align: center;
            border-width: 3px;
            border-color: transparent;
            transition: border-color 250ms;
            line-height: 100%;
          }

          input:focus {
            border-color: #e4b1ec;
          }

          input:invalid {
            border-color: #ff1800;
            box-shadow: 0 0.25rem 0.25rem 0 rgb(255 24 0 / 23%);
          }

          .inputs_container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
          }

          .actions_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .actions_container div {
            text-align: left;
          }

          .actions_container p {
            margin: 0;
          }

          .actions_container p:nth-of-type(2) {
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    </SeoWrapper>
  );
}
