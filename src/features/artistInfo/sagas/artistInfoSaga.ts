import { takeLatest, select, call, put } from 'redux-saga/effects';
import httpClient, { UNAUTHORIZED } from 'services';
import _ from 'lodash';
import monitoringService from 'services/sentry';

import {
    artistInfoRequest,
    artistInfoSuccess,
    artistInfoError
} from '../artistInfoSlice';
import { authError } from 'features/core/coreSlice';

const getUser = () => 
    httpClient.get(`/auth/user/`, {
        data: {
            withToken: true
        }
    });

const getUserData = (pk) => 
    httpClient.get(`/users/${pk}/`, {
        data: {
            withToken: true
        }
    });

function* artistInfoSaga() {
    try {
        const { info } = yield select(state => state.artistInfo);
    
        if (_.isEmpty(info)) {
            const { data: { pk } } = yield call(getUser);
            const { data } = yield call(getUserData, pk);

            yield put(artistInfoSuccess(data));

        } else {
            yield put(artistInfoSuccess(info));
        }
    
        } catch (error) {
            monitoringService.logError(error);

            if (error.status === UNAUTHORIZED) {
                yield put(authError(error));

                return;
            }

            yield put(artistInfoError(error));
        }
    }

function* watchArtistInfoRequest() {
    yield takeLatest(artistInfoRequest, artistInfoSaga);
}

export default watchArtistInfoRequest;

// function* userInfoRequest(api, { payload }) {
//     const { trigger, isWhiteglove } = payload;
//     let userProperties = {};
//     if (trigger === 'signup') {
//       userProperties = { ...userProperties, is_whiteglove: isWhiteglove };
//     }
//     try {
//       const { pk, is_staff: isStaff } = yield call([api, api.get], 'auth/user/');
//       const userData = yield call([api, api.get], `users/${pk}/`);
//       yield put(actions.userInfoSuccess({ ...userData, isStaff }));
//       monitoringService.setUser(userData);
//       userProperties = {
//         ...userProperties,
//         Email: userData.email,
//         'First Name': userData.first_name,
//         'Last Name': userData.last_name,
//       };
//       analyticsService.setUserProperties(userProperties);
//       if (trigger === 'signup') {
//         analyticsService.logEvent(analyticsEvents.USER_SIGNED_UP);
//         customAnalytics.trackAmplitude(analyticsEvents.USER_SIGNED_UP); 
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401
//         && error.message && error.message.detail === 'Invalid token.') {
//         yield put(authLogoutRequest());
//       }
//       if (trigger === 'signup') {
//         // we want to track sign up event anyway
//         setUserProperties(userProperties);
//         analyticsService.logEvent(analyticsEvents.USER_SIGNED_UP);
//         customAnalytics.trackAmplitude(analyticsEvents.USER_SIGNED_UP);
//       }
//       yield put(actions.userInfoError(error));
//       monitoringService.logError(error);
//     }
//   }

//   function* watchUserInfoRequest(api) {
//     yield takeLatest(types.USER_INFO_REQUEST, userInfoRequest, api);
//   }