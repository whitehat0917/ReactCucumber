import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import qs from 'query-string';
import authService from 'services/auth';
import { authChangePasswordRequest } from 'store/actions';
import { fromAuth } from 'store/selectors';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';
import ChangePasswordForm from 'organisms/ChangePasswordForm';
import PasswordResetInvalidParametersMessage from 'atoms/PasswordResetInvalidParametersMessage';

class ResetPasswordFormContainer extends React.Component {
  state = {
    password: '',
    passwordConfirmation: '',
  }

  componentDidMount() {
    const { pushPage } = this.props;
    if (authService.isLoggedIn()) {
      pushPage('/');
    } else {
      const { uid, token } = qs.parse(window.location.search);
      this.setState({ uid, token });
    }

    const page = '/change_password';
    // userAnalyticsService.set({ page });
    // userAnalyticsService.ga('send', 'pageview', { page });
    // return customAnalyticsService.trackGA('pageview', 'pageview', page);
  }

  handleSubmit = () => {
    const { requestPasswordChange } = this.props;
    const {
      uid, token, password, passwordConfirmation,
    } = this.state;
    requestPasswordChange({
      uid, token, password, passwordConfirmation,
    });
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  }

  handleBackToResetClick = () => {
    const { pushPage } = this.props;
    pushPage('/reset_password');
  }

  render() {
    const {
      password, passwordConfirmation, uid, token,
    } = this.state;
    const { status } = this.props;

    if (!uid || !token) {
      return <PasswordResetInvalidParametersMessage onBackToResetClick={this.handleBackToResetClick} />;
    }

    return (
      <ChangePasswordForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        password={password}
        passwordConfirmation={passwordConfirmation}
        status={status}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  status: fromAuth.getStatus(state, 'change_password'),
});

const mapDispatchToProps = (dispatch) => ({
  pushPage: (url) => dispatch(push(url)),
  requestPasswordChange: (data) => (dispatch(authChangePasswordRequest(data))
  ),
});

ResetPasswordFormContainer.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestPasswordChange: PropTypes.func.isRequired,
  status: PropTypes.shape({
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer);
