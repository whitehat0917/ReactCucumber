import { takeLatest, select, call, put } from 'redux-saga/effects';
import httpClient from 'services';
import _ from 'lodash';
import monitoringService from 'services/sentry';
import { getData } from 'utils/localStorage';

import {
    userPublicInfoRequest,
    userPublicInfoSuccess,
    userPublicInfoError,
} from 'features/user/userSlice';

function* userPublicInfoSaga({ payload: userName }) {
    try {
        const user = yield select(state => state.user);
    
        if (_.isEmpty(user.publicInfo) || user.publicInfo.marcel_username !== userName) {
            const token = yield getData('auth_token');

            const { data } = yield call(httpClient, `/users/usernames/${userName}/`);

            yield put(userPublicInfoSuccess(data));
        } else {
            yield put(userPublicInfoSuccess(user.publicInfo));
        }
    
        } catch (error) {
            monitoringService.logError(error);
            yield put(userPublicInfoError(error.message));
        }
    }

function* watchUserPublicInfoRequest() {
    yield takeLatest(userPublicInfoRequest, userPublicInfoSaga);
}

export default watchUserPublicInfoRequest;