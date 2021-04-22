import { takeLatest, call, put } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router'
import { toast } from 'react-toastify';
import _ from 'lodash';

import {
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordError,
} from '../resetPasswordSlice';

function* changePasswordSaga({ payload }) {
    try {
      const {
      // eslint-disable-next-line camelcase
        uid, token, new_password1, new_password2,
      } = payload;

      yield call(httpClient.post, 'auth/password/reset/confirm/', {
        uid, token, new_password1, new_password2,
      });

      yield put(changePasswordSuccess({}));
      yield put(push('/login'));

      toast.success('Password has been changed');
    } catch (error) {
      yield put(changePasswordError(error));

      const combinedError = error.errorDescr?.join('\n') ?? 'Unknown error';
      toast.error(combinedError);
    }
  }

  function* watchChangePassword() {
    yield takeLatest(changePasswordRequest, changePasswordSaga);
  }

  export default watchChangePassword;
