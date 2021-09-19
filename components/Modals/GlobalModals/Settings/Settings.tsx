import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import PageContent from 'components/PageContent';
import SettingsUser from './SettingsUser';
import SettingsFonts from './SettingsFonts';
import SettingsCookies from './SettingsCookies';

export default function Settings() {
  const router = useRouter();

  const { showSettings, storeDispatch } = useStore();
  const closeModal = () => storeDispatch({ type: 'Close_Settings' });

  useEffect(() => {
    if (showSettings) closeModal();
  }, [router.pathname]);

  return (
    <Modal
      isOpen={showSettings}
      closeModal={closeModal}
      style={{ content: { width: 767 } }}
    >
      <Modal.Header closeModal={closeModal}>Settings</Modal.Header>

      <Modal.Content>
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
              Thinking of making a Tinder slide animation to accept/declide a
              GIF
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
      </Modal.Content>

      <Modal.Actions style={{ justifyContent: 'center' }}>
        More features coming soon.
      </Modal.Actions>
    </Modal>
  );
}
