import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import PageContent from 'components/PageContent';
import Switch from 'components/Switch';
import { analytics, consent } from 'utils/analytics';

export default function SettingsCookies() {
  return (
    <>
      <PageContent.Header>Cookies</PageContent.Header>
      <PageContent.Text>
        Below you can manage your cookies. Please refer to our{' '}
        <Link href="/privacy">
          <a>Privacy Policy</a>
        </Link>{' '}
        to learn more about what cookies are used and how they are used.
      </PageContent.Text>
      <PageContent.Text>
        <Switch disabled checked>
          <strong>Sessions</strong>: These cookies are only used during user
          signins and are required
        </Switch>
      </PageContent.Text>
      <PageContent.Text>
        <Switch
          defaultChecked={!!Number(consent.get())}
          onChange={e => {
            if (e.target.checked) {
              analytics.add();
            } else {
              analytics.remove();
            }
          }}
        >
          <strong>Google Analytics</strong>
        </Switch>
      </PageContent.Text>
      <PageContent.Text style={{ marginBottom: 0 }}>
        <Switch
          defaultChecked={!!Number(Cookies.get('hide_fullscreen_popup'))}
          onChange={e => {
            Cookies.set(
              'hide_fullscreen_popup',
              String(e.target.checked ? 1 : 0),
              {
                expires: 365,
                secure: !!(process.env.NODE_ENV === 'production'),
                sameSite: 'strict',
              }
            );
          }}
        >
          <strong>Hide Fullscreen Game Popup</strong>
        </Switch>
      </PageContent.Text>
    </>
  );
}
