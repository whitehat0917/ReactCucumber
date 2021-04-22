import ModalContext from 'components/molecules/ModalContext';
import { useContext } from 'react';
export const useSimpleModal = () => {
  const ctx = useContext(ModalContext);
  const alertModal = (title: string, description: string, name: string, onOk?: () => any) => {
    ctx.showModal({
      confirm: false,
      description,
      title,
      onOk,
      name,
      yesText: 'Ok',
    });
  };
  const confirmModal = (
    title: string,
    description: string,
    name: string,
    onOk?: () => any,
    onCancel?: () => any,
    yesText = 'Yes',
  ) => {
    ctx.showModal({
      confirm: true,
      description,
      title,
      onCancel,
      onOk,
      name,
      yesText,
    });
  };
  return {
    alertModal,
    alertOf: (title: string, description: string, name?: string, onOk?: () => any) => () =>
      alertModal(title, description, name, onOk),
    confirmModal,
    confirmOf: (title: string, description: string, name?: string, onOk?: () => any, onCancel?: () => any) => () =>
      confirmModal(title, description, name, onOk, onCancel),
  };
};
