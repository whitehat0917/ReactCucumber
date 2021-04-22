/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import authService from 'services/auth';
import { connect } from 'react-redux';
import { authResetPasswordEmailRequest } from 'store/actions';
import { fromAuth } from 'store/selectors';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import ResetPasswordForm from 'organisms/ResetPasswordForm';
import PasswordResetMessage from 'atoms/PasswordResetMessage';

userAnalyticsService.initialize();

class ResetPasswordFormContainer extends React.Component {
  state = {
    email: '',
    isEmailSuccessfullySent: false,
  }

  componentDidMount() {
    const { pushPage } = this.props;
    if (authService.isLoggedIn()) {
      return pushPage('/');
    }

    const page = '/reset_password';
    // userAnalyticsService.set({ page });
    // userAnalyticsService.ga('send', 'pageview', { page });
    // return customAnalyticsService.trackGA('pageview', 'pageview', page);
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (prevProps.status.isLoading && !status.isLoading && !status.errorMessage) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isEmailSuccessfullySent: true });
    }
  }

  handleSubmit = () => {
    const { requestReset } = this.props;
    const { email } = this.state;
    requestReset(email);
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { email, isEmailSuccessfullySent } = this.state;
    const { status } = this.props;

    if (isEmailSuccessfullySent) {
      return <PasswordResetMessage />;
    }

    return (
      <ResetPasswordForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        email={email}
        resetPasswordStatus={status}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: fromAuth.getStatus(state, 'reset_password'),
});

const mapDispatchToProps = (dispatch) => ({
  pushPage: (url) => dispatch(push(url)),
  requestReset: (email) => dispatch(authResetPasswordEmailRequest(email)),
});

ResetPasswordFormContainer.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired,
  status: PropTypes.shape({
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer);
