import * as React from 'react';
import { notEquals } from 'utils/func.utils';
import ConfirmationModal from '../ConfirmationModal/';
import { ModalContext, ModalInfo } from './ModalContext';

export default (props: { children: any }) => {
  const [modals, setModals] = React.useState([] as ModalInfo[]);
  return (
    <ModalContext.Provider
      value={{
        modals,
        showModal: (m) => setModals((modals) => [...modals, m]),
      }}
    >
      {props.children}
      {modals.map((m) => {
        return (
          <ConfirmationModal
            key={m.name}
            isOpen={true}
            confirmText={m.yesText}
            isLoading={false}
            name={m.name}
            submitButtonOnly={true}
            onCancel={() => {
              setModals((modals) => modals.filter(notEquals(m)));
              m.onCancel && m.onCancel();
            }}
            onSubmit={() => {
              setModals((modals) => modals.filter(notEquals(m)));
              m.onOk && m.onOk();
            }}
            text={m.description}
            title={m.title}
          ></ConfirmationModal>
        );
      })}
    </ModalContext.Provider>
  );
};
