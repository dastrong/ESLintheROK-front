import React from 'react';
import Link from 'next/link';

import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';
import Button from 'components/Button';
import PositiveAttitudeSVG from 'components/Svgs/positive_attitude.svg';

export default function NewUserPage() {
  return (
    <SeoWrapper
      title="Welcome Aboard"
      description="Thanks for joining. I hope you enjoy and take full advantage of all the benefits."
    >
      <div>
        <PageHeading>Welcome Aboard</PageHeading>
        <PageSubHeading>
          You've successfully created an account.
          <br />
          You can now save your past lessons and settings.
        </PageSubHeading>

        <PageSubHeading>
          <Link href="/" passHref>
            <Button
              as="a"
              size="lg"
              color="white"
              bgColor="#2b7cd0"
              text="Go Home"
              style={{ width: 150, marginInline: 8 }}
            />
          </Link>
          <Link href="/games" passHref>
            <Button
              inverted
              as="a"
              size="lg"
              color="white"
              bgColor="#e428bc"
              text="View Games"
              style={{ width: 150, marginInline: 8 }}
            />
          </Link>
        </PageSubHeading>

        <PositiveAttitudeSVG
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
