import { all } from 'redux-saga/effects';

import initializeSaga from './initSaga';
import loginFlow, { watchLogout } from './loginSaga';
import signUpFlow from './signUpSaga';
import watchMagicLoginRequest, { watchGetMagicLogin } from './magicLoginSaga';
import watchOauthLoginRequest from './oauthLogin';

export default function* coreSaga() {
    yield all([
        initializeSaga(),
        loginFlow(),
        signUpFlow(),
        watchOauthLoginRequest(),
        watchMagicLoginRequest(),
        watchGetMagicLogin(),
        watchLogout(),
    ]);
};