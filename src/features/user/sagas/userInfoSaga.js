import { takeLatest, select, call, put } from 'redux-saga/effects';
import httpClient from 'services';
import { push } from 'connected-react-router'
import _ from 'lodash';
import monitoringService from 'services/sentry';

import { getData } from 'utils/localStorage';

import {
    userInfoRequest,
    userInfoSuccess,
    userInfoError,
} from 'features/user/userSlice';

const getUser = (token) => 
    httpClient.get(`/auth/user/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

const getUserData = (token, pk) => 
    httpClient.get(`/users/${pk}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

function* userInfoSaga({ payload }) {
    try {
        const user = yield select(state => state.user);
    
        if (_.isEmpty(user.info)) {
            const token = yield getData('auth_token');

            if (typeof token !== 'undefined') {
                const { data: { pk } } = yield call(getUser, token);
                const { data } = yield call(getUserData, token, pk);
    
                yield put(userInfoSuccess(data));
            } else {
                yield put(push('/login'));
            }

        } else {
            yield put(userInfoSuccess(user.publicInfo));
        }
    
        } catch (error) {
            monitoringService.logError(error);
            yield put(userInfoError(error.message));
        }
    }

function* watchUserInfoRequest() {
    yield takeLatest(userInfoRequest, userInfoSaga);
}

export default watchUserInfoRequest;

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