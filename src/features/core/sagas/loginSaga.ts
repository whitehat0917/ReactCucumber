import { take, call, put, takeLatest } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router';
import _ from 'lodash';
// import monitoringService from 'services/sentry';

import { setData, removeData } from 'utils/localStorage';
// import { getErrorText } from 'utils/error';


import { 
    authLoginRequest,
    authLoginSuccess,
    authLoginError, 
} from '../coreSlice';
import { logout, artistInfoRequest, resetArtistState, artistInfoSuccess } from 'features/artistInfo/artistInfoSlice';
import { resetGalleryState } from 'features/privateGallery/privateGallerySlice';

export const AUTH_TOKEN = 'auth_token';

// Login
function* loginRequest({ email, password }) {
    try {
        const { data } = yield call(httpClient.post, `/auth/login/`, { email, password });

        yield setData(AUTH_TOKEN, data.key)

        yield put(artistInfoRequest({}));

        yield take(artistInfoSuccess);

        yield put(authLoginSuccess({}));
        yield put(push('/'));
    } catch (error) {
        yield put(authLoginError({ error }));
    }
}

// Logout
function* logoutSaga() {
    yield removeData(AUTH_TOKEN);
    yield put(resetArtistState());
    yield put(resetGalleryState());
    yield put(push('/login'));
}

export function* watchLogout() {
    yield takeLatest(logout, logoutSaga);
}

function* loginFlow() {
    while(true) {
        const { payload } = yield take(authLoginRequest);

        yield call(loginRequest, payload);
    }
}

export default loginFlow;