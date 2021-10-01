import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useStore } from 'contexts/store';
import Modal from 'components/Modals';
import PageContent from 'components/PageContent';
import SettingsUser from './SettingsUser';
import SettingsFonts from './SettingsFonts';
import SettingsGifs from './SettingsGifs';
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
          <SettingsGifs />
          <SettingsCookies />
        </PageContent>
      </Modal.Content>

      <Modal.Actions style={{ justifyContent: 'center' }}>
        More features coming soon.
      </Modal.Actions>
    </Modal>
  );
}
