/* eslint-disable camelcase */
import {
  put, call, fork, takeLatest,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import monitoringService from 'services/sentry';
import authService from 'services/auth';
import analyticsService from 'services/analytics';
import * as userActions from 'store/user/actions';
import * as actions from './actions';
import * as types from './constants';

function* registrationRequest(api, {
  payload: {
    first_name, last_name, email, password1, password2, isWhiteglove = false,
  },
}) {
  try {
    const { key } = yield call([api, api.post], 'auth/registration/', {
      first_name, last_name, email, password1, password2, type: 1,
    });
    authService.setToken(key);
    yield put(actions.registrationSuccess());
    yield put(userActions.userInfoRequest({ trigger: 'signup', isWhiteglove }));
    yield put(push('/'));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.registrationError(error.message));
  }
}

function* watchRegistrationRequest(api) {
  yield takeLatest(types.REGISTRATION_REQUEST, registrationRequest, api);
}

export default function* ({ api }) {
  yield fork(watchRegistrationRequest, api);
}
