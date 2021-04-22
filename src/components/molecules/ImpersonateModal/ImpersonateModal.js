import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'containers/Modal';
import Input from 'atoms/Input';

class ImpersonateModal extends React.PureComponent {
  state = {
    username: '',
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handleSubmitClick = () => {
    const { impersonateStatus, impersonate } = this.props;
    if (!impersonateStatus.isLoading) {
      impersonate(this.state.username);
    }
  }

  handleKeyDown = (e) => {
    const { impersonateStatus, impersonate } = this.props;
    if (e.key === 'Enter' && !impersonateStatus.isLoading) {
      impersonate(this.state.username);
    }
  }

  render() {
    const { isOpen, close, impersonateStatus } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onClose={close}
        onCancelClick={close}
        name="impersonate_modal"
        title="Impersonate user"
        dense
        buttonsAreVisible
        submitText="OK"
        onSubmitClick={this.handleSubmitClick}
        isLoading={impersonateStatus.isLoading}
      >
        <Input
          name="marcel_username"
          onChange={this.handleUsernameChange}
          placeholder="Marcel Username"
          style={{ width: '100%' }}
          onKeyDown={this.handleKeyDown}
        />
      </Modal>
    );
  }
}

ImpersonateModal.propTypes = {
  impersonate: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  impersonateStatus: PropTypes.object.isRequired,
};

export default ImpersonateModal;
