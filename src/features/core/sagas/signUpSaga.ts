import { take, call, put } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router';
import _ from 'lodash';
import { toast } from 'react-toastify';
import monitoringService from 'services/sentry';

import { setData } from 'utils/localStorage';

import {
    signUpRequest,
    signUpSuccess,
    signUpError,
} from '../coreSlice';

import { userInfoRequest } from 'features/user/userSlice';

export const AUTH_TOKEN = 'auth_token';

function* registrationRequest({
    first_name, last_name, email, password1, password2,
}) {
    try {
        const type = 1;
        const { data } = yield call(httpClient.post, '/auth/registration/', {
            first_name,
            last_name,
            email,
            password1,
            password2,
            type
        });

        if (data.errors) {
            throw data.original_errors;
        }

        yield setData(AUTH_TOKEN, data.key)
        yield put(signUpSuccess({}));
        yield put(userInfoRequest({}));

        yield put(push('/'));
    } catch (error) {
        const combinedError = error.errorDescr?.join('\n') ?? 'Unknown error';
        toast.error(combinedError);

        monitoringService.logError(error);
        yield put(signUpError(error));
    }
}

function* signUpFlow() {
    while(true) {
        const { payload } = yield take(signUpRequest);

        yield call(registrationRequest, payload);

    }
}

export default signUpFlow;
