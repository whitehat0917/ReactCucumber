import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromModal } from 'store/selectors';
import Modal from '../components/Modal';

const ModalContainer = (props) => <Modal {...props} />;

const mapStateToProps = (state, { name, isOpen }) => ({
  isOpen: isOpen || fromModal.isOpen(state, name),
});

ModalContainer.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

export default connect(mapStateToProps)(ModalContainer);
