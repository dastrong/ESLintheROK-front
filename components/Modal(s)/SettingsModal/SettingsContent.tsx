import React from 'react';
import PageContent from 'components/PageContent';
import SettingsUser from './SettingsUser';
import SettingsFonts from './SettingsFonts';
import SettingsCookies from './SettingsCookies';

export default function SettingsContent() {
  return (
    <>
      <PageContent
        style={{
          fontSize: '1.2rem',
          width: '100%',
          margin: 0,
          padding: '3%',
          overflowY: 'scroll',
          maxHeight: '70vh',
          position: 'relative',
        }}
      >
        <SettingsUser />
        <SettingsFonts />

        <PageContent.Header>Gifs</PageContent.Header>
        <PageContent.Text>
          Users can preload gifs to verify they are appropriate for class
        </PageContent.Text>
        <PageContent.List>
          <li>
            Thinking of making a Tinder slide animation to accept/declide a GIF
          </li>
          <li>
            Should we save in cache a list of GIF id's that have been verified
            by other users?
          </li>
          <li>
            If student's have seen a GIF, add a Next option to get another
          </li>
        </PageContent.List>

        <SettingsCookies />
      </PageContent>
    </>
  );
}
