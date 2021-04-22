import { takeLatest, call, put } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router'
import _ from 'lodash';
import monitoringService from 'services/sentry';

import {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordError,
} from '../resetPasswordSlice';
import { toast } from 'react-toastify';

function* resetPasswordSaga({ payload }) {
    try {
      yield call(httpClient.post, 'auth/password/reset/', { email: payload.email });
      yield put(resetPasswordSuccess({}));

      yield put(push('/login'));

      toast.success('The message has been sent... Check you email!');

    } catch (error) {
      monitoringService.logError(error);
      yield put(resetPasswordError(error));

      // toast.error(error);
    }
  }

function* watchResetPassword () {
    yield takeLatest(resetPasswordRequest, resetPasswordSaga);
}

export default watchResetPassword;