import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import CancelXSvg from 'components/Svgs/cancel_x.svg';

const errors = {
  default: {
    statusCode: 200,
    heading: 'Verification Error',
    message: (
      <>
        Sorry, but we're not sure what happened.
        <br />
        If the issue persists, contact us to investigate.
      </>
    ),
    action: (
      <>
        <Link href="/" passHref>
          <Button
            as="a"
            size="lg"
            color="white"
            bgColor="#2b7cd0"
            text="Home"
            style={{ width: 150, marginInline: 8 }}
          />
        </Link>
        <Link href="/contact" passHref>
          <Button
            inverted
            as="a"
            size="lg"
            color="white"
            bgColor="#e428bc"
            text="Contact Us"
            style={{ width: 150, marginInline: 8 }}
          />
        </Link>
      </>
    ),
  },
  configuration: {
    statusCode: 500,
    heading: 'Server Error',
    message: (
      <>
        There is a problem with the server configuration.
        <br />
        Please contact the site administrator to investigate this issue.
      </>
    ),
    action: (
      <Link href="/contact" passHref>
        <Button
          as="a"
          size="lg"
          color="white"
          bgColor="#2b7cd0"
          text="Contact Us"
          style={{ width: 150 }}
        />
      </Link>
    ),
  },
  accessdenied: {
    statusCode: 403,
    heading: 'Access Denied',
    message: 'You do not have permission to sign in.',
    action: (
      <Link href="/auth/signin" passHref>
        <Button
          as="a"
          size="lg"
          color="white"
          bgColor="#2b7cd0"
          text="Log in again"
          style={{ width: 150 }}
        />
      </Link>
    ),
  },
  verification: {
    statusCode: 403,
    heading: 'Expired Code',
    message: (
      <>
        The sign in link is no longer valid.
        <br />
        It may have been used already or it may have expired.
      </>
    ),
    action: (
      <Link href="/auth/signin" passHref>
        <Button
          as="a"
          size="lg"
          color="white"
          bgColor="#2b7cd0"
          text="Log in again"
          style={{ width: 150 }}
        />
      </Link>
    ),
  },
};

export default function AuthErrorPage() {
  const router = useRouter();

  const error = (router.query.error || 'default') as string;

  const { heading, message, action } = errors[error.toLowerCase()];

  return (
    <SeoWrapper
      title="Verification Failed"
      description="An error occurred somewhere. Read the errors, determine if it was something you did and contact us if you need to."
    >
      <div>
        <PageHeading>{heading}</PageHeading>
        <PageSubHeading style={{ marginBottom: '1.5rem' }}>
          {message}
        </PageSubHeading>

        {action && <PageSubHeading>{action}</PageSubHeading>}

        <CancelXSvg
          style={{
            display: 'block',
            width: '80%',
            maxWidth: 600,
            margin: '2rem auto 0',
          }}
        />
      </div>
    </SeoWrapper>
  );
}
