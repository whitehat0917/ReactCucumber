import * as types from './constants';

export const authLoginRequest = ({ email, password }) => ({
  type: types.AUTH_LOGIN_REQUEST,
  payload: { email, password },
});

export const authLoginSuccess = () => ({
  type: types.AUTH_LOGIN_SUCCESS,
});

export const authLoginError = (errorMessage) => ({
  type: types.AUTH_LOGIN_ERROR,
  payload: errorMessage,
});

export const authLogoutRequest = () => ({
  type: types.AUTH_LOGOUT_REQUEST,
});

export const authLogoutSuccess = () => ({
  type: types.AUTH_LOGOUT_SUCCESS,
});

export const authOauthLoginRequest = (data) => ({
  type: types.AUTH_OAUTH_LOGIN_REQUEST,
  payload: data,
});

export const authOauthLoginSuccess = () => ({
  type: types.AUTH_OAUTH_LOGIN_SUCCESS,
});

export const authOauthLoginError = (errorMessage) => ({
  type: types.AUTH_OAUTH_LOGIN_ERROR,
  payload: errorMessage,
});

export const authResetPasswordEmailRequest = (email) => ({
  type: types.AUTH_RESET_PASSWORD_EMAIL_REQUEST,
  payload: email,
});

export const authResetPasswordEmailSuccess = () => ({
  type: types.AUTH_RESET_PASSWORD_EMAIL_SUCCESS,
});

export const authResetPasswordEmailError = (errorMessage) => ({
  type: types.AUTH_RESET_PASSWORD_EMAIL_ERROR,
  payload: errorMessage,
});

export const authChangePasswordRequest = (data) => ({
  type: types.AUTH_CHANGE_PASSWORD_REQUEST,
  payload: data,
});

export const authChangePasswordSuccess = () => ({
  type: types.AUTH_CHANGE_PASSWORD_SUCCESS,
});

export const authChangePasswordError = (errorMessage) => ({
  type: types.AUTH_CHANGE_PASSWORD_ERROR,
  payload: errorMessage,
});

export const authImpersonateRequest = (data) => ({
  type: types.AUTH_IMPERSONATE_REQUEST,
  payload: data,
});

export const authImpersonateSuccess = (data) => ({
  type: types.AUTH_IMPERSONATE_SUCCESS,
  payload: data,
});

export const authImpersonateError = (errorMessage) => ({
  type: types.AUTH_IMPERSONATE_ERROR,
  payload: errorMessage,
});

export const authMagicLoginRequest = (data) => ({
  type: types.AUTH_MAGIC_LOGIN_REQUEST,
  payload: data,
});

export const authMagicLoginSuccess = () => ({
  type: types.AUTH_MAGIC_LOGIN_SUCCESS,
});

export const authMagicLoginError = (errorMessage) => ({
  type: types.AUTH_MAGIC_LOGIN_ERROR,
  payload: errorMessage,
});
