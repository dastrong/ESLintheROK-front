import React from 'react';
import Modal from 'components/Modal(s)';
import type { Props } from './types';
import { DataScreen } from '../_components';

export default function LessonsData({
  closeModal,
  decreaseStep,
  increaseStep,
}: Props) {
  return (
    <>
      <Modal.Header closeModal={closeModal}>Choose a Book</Modal.Header>

      <Modal.Content>
        <DataScreen />
      </Modal.Content>

      <Modal.Actions
        cancelText="Go Back"
        cancelClick={decreaseStep}
        confirmText="Set Data"
        confirmClick={increaseStep}
        confirmDisabled={false}
      />
    </>
  );
}
