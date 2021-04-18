import type { DataModalNameType } from 'contexts/store';

export type DataModalProps = {
  closeModal: () => void;
  dataModalName: DataModalNameType;
};
