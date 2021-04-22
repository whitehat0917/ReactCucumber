import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'containers/Modal';

const ConfirmationModal = ({
  title, text, confirmText, onCancel, onSubmit, name, isLoading, ...rest
}) => (
  <Modal
    name={name}
    title={title}
    subtitle={text}
    submitText={confirmText}
    buttonsAreVisible
    onClose={onCancel}
    onCancelClick={onCancel}
    onSubmitClick={onSubmit}
    isLoading={isLoading}
    {...rest}
  />
);

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ConfirmationModal;
