import AppleLoginButton from 'components/AppleLoginButton';
import Button from 'components/Button';
import ContentWrapper from 'components/ContentWrapper';
import FacebookLoginButton from 'components/FacebookLoginButton';
import GoogleLoginButton from 'components/GoogleLoginButton';
import { RenderCommonErrors } from 'components/Inputs/TextInput';
import Link from 'components/Link';
import Separator from 'components/LoginFormSeparator';
import NewInputs from 'components/NewInputs';
import Typography from 'components/Typography';
import config from 'config';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import scriptjs from 'scriptjs';
import { wrapComponent } from 'utils/func.utils';
import { authLoginRequest, oauthLoginRequest } from '../coreSlice';
import useForm from '../hooks/useForm';
import { useSimpleModal } from '../hooks/useSimpleDialogs';
import { InputsWrapper, Login, OauthButtonWrapper, ResetPasswordLink, TitleWrapper } from './styled';

const GOOGLE_INITIALIZATION_ERROR_NAME = 'idpiframe_initialization_failed';

const constraints = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
    email: {
      message: '^not a valid email',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^field is required',
    },
  },
};

const LoginForm = ({ loginStatus }) => {
  const dispatch = useDispatch();
  const { alertOf } = useSimpleModal();
  const { formState, errors, handleChange, submitForm } = useForm(
    {
      email: '',
      password: '',
    },
    constraints,
  );
  const [googleInitializationError, setGoogleInitializationError] = useState(false);

  const handleOauthLoginSuccess = (service) => (data) => {
    dispatch(oauthLoginRequest({ accessToken: data.accessToken, service }));
  };

  const initApple = () =>
    scriptjs.get('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', () =>
      window.AppleID.auth.init({
        clientId: config.appleClientId,
        scope: 'name email',
        redirectURI: config.redirectURI, //'https://staging.marcelforart.com/accounts/apple/login/callback', // config.redirectURI,
        state: sessionStorage.getItem('state'),
        usePopup: true,
        nonce: '232dddsw2w',
      }),
    );

  useEffect(() => {
    initApple();
  }, []);

  const handleAppleSignin = () =>
    window.AppleID.auth
      .signIn()
      .then((res) => {
        console.log(res);
        dispatch(
          oauthLoginRequest({
            code: res.authorization.code,
            service: 'apple',
            user: res.user,
          }),
        );
      })
      .catch((e) => console.log('Apple login error: ', e));

  return (
    <ContentWrapper>
      <Login onSubmit={(e) => submitForm(e, authLoginRequest)}>
        <TitleWrapper>
          <Typography type="h3">Sign In</Typography>
        </TitleWrapper>
        <OauthButtonWrapper>
          <GoogleLogin
            onSuccess={handleOauthLoginSuccess('google')}
            onFailure={(error?: { error: string }) => {
              if (error?.error === GOOGLE_INITIALIZATION_ERROR_NAME) {
                setGoogleInitializationError(true);
              }
              console.log('GoogleLogin error!', error);
            }}
            clientId={config.googleClientId}
            render={wrapComponent(
              GoogleLoginButton,
              undefined,
              /*googleInitializationError
                ? {
                    onClick: alertOf(
                      'Enable your cookies',
                      'Please enable your cookies to use google login, and try again',
                      'enable_cookies_google_login',
                    ),
                  }
                : undefined,*/
            )}
          />
        </OauthButtonWrapper>
        <OauthButtonWrapper>
          <FacebookLogin
            appId={config.facebookAppId}
            callback={handleOauthLoginSuccess('facebook')}
            render={FacebookLoginButton}
          />
        </OauthButtonWrapper>
        {true && (
          <OauthButtonWrapper>
            <AppleLoginButton onClick={handleAppleSignin} />
          </OauthButtonWrapper>
        )}
        <Separator />
        <InputsWrapper>
          <NewInputs.TextInput
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            type="text"
            validation={errors}
          />
          <NewInputs.TextInput
            name="password"
            value={formState.password}
            type="password"
            onChange={handleChange}
            placeholder="Password"
            validation={errors}
          />

          <ResetPasswordLink to="/reset_password">Reset password</ResetPasswordLink>

          <RenderCommonErrors errors={loginStatus.errors.error} />

          <Button type="submit" fullWidth>
            Sign In
          </Button>
          <Link
            to="/signup"
            style={{
              textAlign: 'center',
              display: 'block',
              margin: '1.625rem 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Sign Up with Email
          </Link>
        </InputsWrapper>
      </Login>
    </ContentWrapper>
  );
};

export default LoginForm;
