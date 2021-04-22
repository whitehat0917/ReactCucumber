import React from 'react';
import PropTypes from 'prop-types';
import ImpersonateModal from 'molecules/ImpersonateModal';
import { push } from 'connected-react-router';
import authService from 'services/auth';
import { connect } from 'react-redux';
import { authImpersonateRequest, modalClose } from 'store/actions';
import { fromAuth, fromModal } from 'store/selectors';

class ImpersonateModalContainer extends React.Component {
  render() {
    return (
      <ImpersonateModal {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: fromModal.isOpen(state, 'impersonate_modal'),
});

const mapDispatchToProps = (dispatch) => ({
  impersonate: (username) => dispatch(authImpersonateRequest({ username })),
  close: () => dispatch(modalClose('impersonate_modal')),
});

ImpersonateModalContainer.propTypes = {
  impersonate: PropTypes.func.isRequired,
  impersonateStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImpersonateModalContainer);
