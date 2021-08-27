import React from 'react';
import { useStore } from 'contexts/store';
import Modal from 'components/Modal(s)';
import SettingsContent from './SettingsContent';
import { Styles } from '../DataModals/_components';

export default function Settings() {
  const { showSettings, storeDispatch } = useStore();

  return (
    <Modal
      isOpen={showSettings}
      closeModal={() => storeDispatch({ type: 'Close_Settings' })}
      className={Styles.contentCSS.className}
      styles={Styles.contentCSS.styles}
    >
      <Modal.Header
        closeModal={() => storeDispatch({ type: 'Close_Settings' })}
      >
        Settings
      </Modal.Header>

      <Modal.Content>
        <SettingsContent />
      </Modal.Content>

      <Modal.Actions style={{ justifyContent: 'center' }}>
        More features coming soon.
      </Modal.Actions>
    </Modal>
  );
}
