import { take, select, call, put, takeLatest } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router';
import _ from 'lodash';
import { magicLoginRequest, magicLoginSuccess, authError, invalidToken, getMagicLogin } from '../coreSlice';
import { artistInfoRequest } from 'features/artistInfo/artistInfoSlice';
import { removeData } from 'utils/localStorage';
import { AUTH_TOKEN } from './loginSaga';

function* getMagicLoginSaga({ payload }) {
    try {
        const { email } = payload;
        const data = yield call(httpClient.post, 'passwordless/auth/email', {
            email,
        });

        // console.log('getMagicLoginSaga -> ', data);

        // yield put(magicLoginSuccess({ token }));
        // yield put(artistInfoRequest({}));
        // yield put(push('/profile'));
    } catch (error) {
        console.error('getMagicLoginSaga -> ', error);
        // yield put(invalidToken({ error }));
        // yield removeData(AUTH_TOKEN);
    }
}

export function* watchGetMagicLogin () {
    yield takeLatest(getMagicLogin, getMagicLoginSaga);
}

function* magicLoginSaga({ payload }) {
    try {
        const { magicToken } = payload;
        const data = yield call(httpClient.post, 'passwordless/callback/auth/', {
            token: magicToken,
        });

        // console.log('token -> ', data);

        // yield put(magicLoginSuccess({ token }));
        yield put(artistInfoRequest({}));
        yield put(push('/'));
    } catch (error) {
        yield put(invalidToken({ error }));
        yield removeData(AUTH_TOKEN);
    }
}
  
function* watchMagicLoginRequest() {
    yield takeLatest(magicLoginRequest, magicLoginSaga);
}

export default watchMagicLoginRequest;