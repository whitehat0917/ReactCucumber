import {
  put, call, fork, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { startCase } from 'lodash';
import authService from 'services/auth';
import monitoringService from 'services/sentry';
import * as userActions from 'store/user/actions';
import { notificationCreate } from 'store/notifications/actions';
import * as modalActions from 'store/modal/actions';
import * as artworksActions from 'store/artworks/actions';
import * as actions from './actions';
import * as types from './constants';

function* loginRequest(api, { payload: { email, password } }) {
  try {
    const { key } = yield call([api, api.post], 'auth/login/', { email, password });
    authService.setToken(key);
    yield put(actions.authLoginSuccess());
    yield put(userActions.userInfoRequest());
    yield put(push('/'));
  } catch (error) {
    yield put(actions.authLoginError(error));
  }
}

function* watchLoginRequest(api) {
  yield takeLatest(types.AUTH_LOGIN_REQUEST, loginRequest, api);
}

function* oauthLoginRequest(api, { payload }) {
  const { accessToken, service } = payload;
  try {
    const { key } = yield call([api, api.post], `auth/${service}/`, { access_token: accessToken });
    authService.setToken(key);
    yield put(actions.authOauthLoginSuccess());
    yield put(userActions.userInfoRequest());
    yield put(push('/'));
  } catch (error) {
    yield put(actions.authOauthLoginError(error));
    yield put(notificationCreate({
      type: `loginWith${startCase(service)}Error`,
      timeout: 5000,
    }));
  }
}

function* watchOauthLoginRequest(api) {
  yield takeLatest(types.AUTH_OAUTH_LOGIN_REQUEST, oauthLoginRequest, api);
}

function* logout() {
  authService.logout();
  authService.logoutImpersonated();
  yield put(push('/login'));
  yield put(actions.authLogoutSuccess());
}

function* watchLogout() {
  yield takeLatest(types.AUTH_LOGOUT_REQUEST, logout);
}

function* resetPasswordRequest(api, { payload }) {
  try {
    yield call([api, api.post], 'auth/password/reset/', { email: payload });
    yield put(actions.authResetPasswordEmailSuccess());
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.authResetPasswordEmailError(error));
  }
}

function* watchResetPasswordRequest(api) {
  yield takeLatest(types.AUTH_RESET_PASSWORD_EMAIL_REQUEST, resetPasswordRequest, api);
}

function* changePasswordRequest(api, { payload }) {
  try {
    const {
    // eslint-disable-next-line camelcase
      uid, token, password: new_password1, passwordConfirmation: new_password2,
    } = payload;
    yield call([api, api.post], 'auth/password/reset/confirm/', {
      uid, token, new_password1, new_password2,
    });
    yield put(actions.authChangePasswordSuccess());
    yield put(push('/login'));
    yield put(notificationCreate({
      type: 'commonSuccess',
      timeout: 5000,
      text: 'Password has been changed',
    }));
  } catch (error) {
    yield put(actions.authChangePasswordError(error));
    if (error.message.token) {
      yield put(push('/reset_password'));
      yield put(notificationCreate({
        type: 'commonError',
        timeout: 5000,
        text: 'Invalid reset token. Resend reset email',
      }));
    }
  }
}

function* watchChangePasswordRequest(api) {
  yield takeLatest(types.AUTH_CHANGE_PASSWORD_REQUEST, changePasswordRequest, api);
}

function* impersonateRequest(api, { payload }) {
  try {
    const { username } = payload;
    const { token } = yield call([api, api.get], `users/token/${username}/`);
    authService.setImpersonateToken(token);
    const { pk } = yield call([api, api.get], 'auth/user/');
    const userData = yield call([api, api.get], `users/${pk}/`);
    yield put(userActions.userSetImpersonated(userData));
    yield put(actions.authImpersonateSuccess());
    yield put(modalActions.modalClose('impersonate_modal'));
    yield put(artworksActions.artworksClearAll({ resetStatus: true }));
    yield put(artworksActions.artworksFetchRequest());
    yield put(notificationCreate({
      type: 'commonSuccess',
      timeout: 5000,
      text: 'Impersonated',
    }));
  } catch (error) {
    yield put(actions.authImpersonateError(error));
    if (error.response && error.response.status === 404) {
      yield put(notificationCreate({
        type: 'commonError',
        timeout: 5000,
        text: 'User not found',
      }));
    } else if (
      error.response && error.response.status === 401
      && error.message && error.message.detail === 'Invalid token.'
    ) {
      yield put(actions.authLogoutRequest());
    } else {
      yield put(notificationCreate({
        type: 'commonError',
        timeout: 5000,
        text: 'Cannot impersonate',
      }));
    }
  }
}

function* watchImpersonateRequest(api) {
  yield takeLatest(types.AUTH_IMPERSONATE_REQUEST, impersonateRequest, api);
}

function* magicLoginRequest(api, { payload }) {
  try {
    const { magicToken } = payload;
    const { token } = yield call([api, api.post], 'passwordless/callback/auth/', {
      token: magicToken,
    });
    authService.setToken(token);
    yield put(actions.authMagicLoginSuccess());
    yield put(userActions.userInfoRequest());
    yield put(push('/'));
  } catch (error) {
    yield put(push('/login'));
    yield put(notificationCreate({
      type: 'commonError',
      timeout: 10000,
      text: 'Invalid login link. Please re-login',
    }));
    yield put(actions.authMagicLoginError(error));
  }
}

function* watchMagicLoginRequest(api) {
  yield takeLatest(types.AUTH_MAGIC_LOGIN_REQUEST, magicLoginRequest, api);
}

export default function* ({ api }) {
  yield fork(watchLoginRequest, api);
  yield fork(watchOauthLoginRequest, api);
  yield fork(watchResetPasswordRequest, api);
  yield fork(watchChangePasswordRequest, api);
  yield fork(watchLogout);
  yield fork(watchImpersonateRequest, api);
  yield fork(watchMagicLoginRequest, api);
}
