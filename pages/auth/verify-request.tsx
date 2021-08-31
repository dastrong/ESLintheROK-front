import React from 'react';
import SeoWrapper from 'components/SeoWrapper';
import { PageHeading, PageSubHeading } from 'components/PageHeadings';

export default function VerifyRequestPage() {
  return (
    <SeoWrapper
      title="Verify Email"
      description="Check your email to verify that you are who you say you are."
    >
      <div>
        <PageHeading>Check your email</PageHeading>
        <PageSubHeading>
          A sign in link has been sent to the email address that your provided.
        </PageSubHeading>

        <style jsx>{``}</style>
      </div>
    </SeoWrapper>
  );
}
