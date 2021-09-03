import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { FaSignOutAlt } from 'react-icons/fa';

import PageContent from 'components/PageContent';
import Button from 'components/Button';

export default function SettingsUser() {
  const [session] = useSession();

  const [username, domain] = session?.email.split('@') || ['', ''];
  const starredEmail =
    username
      .split('')
      .map((x, i) => {
        if (!i || i === username.length - 1) return x;
        return '*';
      })
      .join('') + `@${domain}`;

  return (
    <>
      <PageContent.Header style={{ marginTop: 0 }}>Account</PageContent.Header>

      <div>
        {session ? (
          <>
            Currently logged in as: <strong>{starredEmail}</strong>
            <Link href="/auth/signout" passHref>
              <Button
                inverted
                as="a"
                size="lg"
                color="white"
                bgColor="#ff6584"
                text="Sign Out"
                Icon={FaSignOutAlt}
                iconPosition="right"
                style={{
                  fontSize: '1.2rem',
                  paddingBlock: 10,
                  marginLeft: 8,
                  borderColor: 'transparent',
                  textDecoration: 'underline solid #ff6584',
                }}
              />
            </Link>
          </>
        ) : (
          <Link href="/auth/signin" passHref>
            <Button
              as="a"
              color="white"
              bgColor="#04a7fb"
              text="Log in to get started"
            />
          </Link>
        )}

        <style jsx>{`
          div {
            position: absolute;
            line-height: 1.75rem;
            top: 1rem;
            right: 1.5rem;
          }
        `}</style>
      </div>

      <PageContent.Text>
        Create and use your account to synchronize your custom and past lessons,
        fonts preferences and other settings between multiple classrooms and
        computers.
      </PageContent.Text>
    </>
  );
}