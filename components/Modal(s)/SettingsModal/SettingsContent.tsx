import React from 'react';
import PageContent from 'components/PageContent';
import SettingsFonts from './SettingsFonts';

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
        }}
      >
        <PageContent.Header style={{ marginTop: 0 }}>User</PageContent.Header>
        <PageContent.Text>Is the user authenticated?</PageContent.Text>
        <PageContent.List>
          <li>
            If authenticated, their account details would be here and their
            settings in the following sections
          </li>
          <li>
            Otherwise, we would show how to sign up and save their settings
          </li>
        </PageContent.List>

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

        <PageContent.Header>Cookies</PageContent.Header>
        <PageContent.Text>
          User's can manage their cookies here
        </PageContent.Text>
        <PageContent.List>
          <li>
            Haven't decided what cookies will be present currently, but will be
            narrowed down soon
          </li>
        </PageContent.List>
      </PageContent>
    </>
  );
}
