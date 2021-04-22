import { takeLatest, select, call, put } from 'redux-saga/effects';
import httpClient, { NOT_FOUND } from 'services';
import _ from 'lodash';
import monitoringService from 'services/sentry';
// import { getParsedData } from 'utils/localStorage';

import { 
    artistPublicInfoRequest, 
    artistPublicInfoSuccess, 
    artistPublicInfoError 
} from '../artistInfoSlice';
import { showNotify } from 'features/notify/notifySlice';
import { notFound } from 'features/core/coreSlice';

function* artistPublicInfoSaga({ payload: userName }) {
    const { publicInfo } = yield select(state => state.artistInfo);

    if (typeof userName !== 'undefined') {
        if (_.isEmpty(publicInfo) || publicInfo.marcel_username !== userName) {
            // const token = yield getParsedData('auth_token');

            try {
                const { data } = yield call(httpClient, `/users/usernames/${userName}/`);

                if (data.errors) {
                    throw data;
                }

                yield put(artistPublicInfoSuccess(data));
            } catch (error) {
                if (error.status === NOT_FOUND) {
                    yield put(notFound({ error }));

                    return;
                }

                monitoringService.logError(error);
                // yield put(showNotify({
                //     type: 'error',
                //     timeout: 5000,
                //     text: errors.message,
                // }));
                yield put(artistPublicInfoError(error));
            }
        } else {
            yield put(artistPublicInfoSuccess(publicInfo));
        }
    } else {
        yield put(artistPublicInfoError('userName was not provided'));
    }
}

function* watchArtistPublicInfoRequest() {
    yield takeLatest(artistPublicInfoRequest, artistPublicInfoSaga);
}

export default watchArtistPublicInfoRequest;