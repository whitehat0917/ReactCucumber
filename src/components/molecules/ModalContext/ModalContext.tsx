import * as React from 'react';

export interface ModalInfo {
  title: string;
  description: string;
  onOk?: () => any;
  onCancel?: () => any;
  name: string;
  confirm?: boolean;
  yesText: string;
}
export const ModalContext = React.createContext<{ modals: ModalInfo[]; showModal: (m: ModalInfo) => any }>({
  modals: [],
  showModal: (m) => {},
});
