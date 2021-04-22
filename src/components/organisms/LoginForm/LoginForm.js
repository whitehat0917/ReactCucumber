import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Link from 'atoms/Link';
import ContentWrapper from 'atoms/ContentWrapper';
import config from 'config';
import { GoogleLogin } from 'react-google-login';
import { getErrorText } from 'utils/error';
import GoogleLoginButton from 'molecules/GoogleLoginButton';
import FacebookLoginButton from 'molecules/FacebookLoginButton';
import Separator from 'molecules/LoginFormSeparator';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsWrapper = styled.div`
  width:  20.375rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

const OauthButtonWrapper = styled.div`
  margin-bottom: 1rem;
  width: 20.375rem;
`;

class LoginForm extends PureComponent {
  state = {
    emailError: false,
    passwordError: false,
  }

  handleEmailChange = (e) => {
    const { onChange } = this.props;
    this.setState({ emailError: false });
    onChange('email')(e);
  }

  handlePasswordChange = (e) => {
    const { onChange } = this.props;
    this.setState({ passwordError: false });
    onChange('password')(e);
  }

  handleOnSubmitClick = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const fieldsAreValid = this.validateFields();
    if (fieldsAreValid) {
      onSubmit(e);
    }
  };

  handleOauthLoginError = () => {}

  validateFields = () => {
    const { email, password } = this.props;
    this.setState({
      emailError: !email,
      passwordError: !password,
    });
    return Boolean(email && password);
  };

  render() {
    const { emailError, passwordError } = this.state;
    const {
      email, password, loginStatus, onGoogleLoginSuccess, onFacebookLoginSuccess,
    } = this.props;

    return (
      <ContentWrapper fullHeight>
        <Login onSubmit={this.handleOnSubmitClick}>
          <TitleWrapper>
            <Typography type="h3">Sign In</Typography>
          </TitleWrapper>
          <OauthButtonWrapper>
            <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              onFailure={this.handleOauthLoginError}
              clientId={config.googleClientId}
              render={GoogleLoginButton}
            />
          </OauthButtonWrapper>
          <OauthButtonWrapper>
            <FacebookLogin
              appId={config.facebookAppId}
              callback={onFacebookLoginSuccess}
              render={FacebookLoginButton}
            />
          </OauthButtonWrapper>
          <Separator />
          <InputsWrapper>
            <Input
              name="login"
              value={email}
              onChange={this.handleEmailChange}
              placeholder="Email"
              style={{ marginBottom: '1.25rem' }}
              error={emailError}
            />
            <Input
              name="password"
              value={password}
              type="password"
              onChange={this.handlePasswordChange}
              placeholder="Password"
              error={passwordError || Boolean(loginStatus.errorMessage)}
              errorText={getErrorText(loginStatus.errorMessage)}
            />
            <Link to="/reset_password" style={{ textAlign: 'right', display: 'block', marginBottom: '3.25rem' }}>
              Reset password
            </Link>
            <Button type="submit" loading={loginStatus.isLoading} fullWidth>Sign In</Button>
            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              to="/signup"
              style={{ textAlign: 'center', display: 'block', marginTop: '1.625rem' }}
            >
              Sign Up with Email
            </Link>
          </InputsWrapper>
        </Login>
      </ContentWrapper>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onGoogleLoginSuccess: PropTypes.func.isRequired,
  onFacebookLoginSuccess: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginStatus: PropTypes.object.isRequired,
};

export default LoginForm;
