import { push } from 'connected-react-router';
import { artistInfoRequest } from 'features/artistInfo/artistInfoSlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import httpClient from 'services';
import { setData } from 'utils/localStorage';
import { oauthLoginError, oauthLoginRequest, oauthLoginSuccess } from '../coreSlice';
// import { showNotify } from 'features/notify/notifySlice';
import { AUTH_TOKEN } from './loginSaga';

function* oauthLoginSaga({ payload }) {
  const { accessToken, code, service } = payload;
  try {
    const request =
      service === 'apple' ? { code, platform: 'web', user: payload.user || undefined } : { access_token: accessToken };
    const { data } = yield call(httpClient.post, `auth/${service}/`, request);
    yield setData(AUTH_TOKEN, data.key);

    yield put(oauthLoginSuccess({}));
    yield put(artistInfoRequest({}));
    yield put(push('/'));
  } catch (error) {
    yield put(oauthLoginError({ error }));
    // yield put(showNotify({
    //     type: `error`,
    //     text: `loginWith${_.startCase(service)}Error`,
    //     timeout: 5000,
    // }));
  }
}

function* watchOauthLoginRequest() {
  yield takeLatest(oauthLoginRequest, oauthLoginSaga);
}

export default watchOauthLoginRequest;
