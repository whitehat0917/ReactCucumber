import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from 'organisms/LoginForm';
import { push } from 'connected-react-router';
import authService from 'services/auth';
import { connect } from 'react-redux';
import { authLoginRequest, authOauthLoginRequest } from 'store/actions';
import { fromAuth, fromUser } from 'store/selectors';
import userAnalyticsService from 'services/user_analytics';
import customAnalyticsService from 'services/custom_analytics';

userAnalyticsService.initialize();

class LoginFormContainer extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    const { pushPage } = this.props;
    if (authService.isLoggedIn()) {
      return pushPage('/');
    }

    const page = '/signup';
    // userAnalyticsService.set({ page });
    // userAnalyticsService.ga('send', 'pageview', { page });
    // return customAnalyticsService.trackGA('pageview', 'pageview', page);
  }

  handleSubmit = (e) => {
    const { requestLogin } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    requestLogin({ email, password });
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  }

  handleOauthLoginSuccess = (service) => (data) => {
    const { requestOauthLogin } = this.props;
    requestOauthLogin({ accessToken: data.accessToken, service });
  }

  render() {
    const { email, password } = this.state;
    const { loginStatus } = this.props;

    return (
      <LoginForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onGoogleLoginSuccess={this.handleOauthLoginSuccess('google')}
        onFacebookLoginSuccess={this.handleOauthLoginSuccess('facebook')}
        email={email}
        password={password}
        loginStatus={loginStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loginStatus: fromAuth.getStatus(state, 'login'),
  oauthLoginStatus: fromAuth.getStatus(state, 'oauth_login'),
});

const mapDispatchToProps = (dispatch) => ({
  pushPage: (url) => dispatch(push(url)),
  requestLogin: (data) => dispatch(authLoginRequest(data)),
  requestOauthLogin: (token) => dispatch(authOauthLoginRequest(token)),
});

LoginFormContainer.propTypes = {
  pushPage: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  requestOauthLogin: PropTypes.func.isRequired,
  loginStatus: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
