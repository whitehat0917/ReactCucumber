import {
  put, call, fork, takeLatest, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import { fromUser } from 'store/selectors';
import { authLogoutRequest } from 'store/auth/actions';
import { notificationCreate } from 'store/notifications/actions';
import monitoringService from 'services/sentry';
import analyticsService from 'services/analytics';
import customAnalytics from 'services/custom_analytics';
import * as analyticsEvents from 'constants/analytics';
import { setUserProperties } from 'services/analytics/analytics';
import authService from 'services/auth';
import userAnalyticsService from 'services/user_analytics';
import * as modalActions from '../modal/actions';
import * as actions from './actions';
import * as types from './constants';

function* userInfoRequest(api, { payload }) {
  const { trigger, isWhiteglove } = payload;
  let userProperties = {};
  if (trigger === 'signup') {
    userProperties = { ...userProperties, is_whiteglove: isWhiteglove };
  }
  try {
    const { pk, is_staff: isStaff } = yield call([api, api.get], 'auth/user/');
    const userData = yield call([api, api.get], `users/${pk}/`);
    yield put(actions.userInfoSuccess({ ...userData, isStaff }));
    monitoringService.setUser(userData);
    userProperties = {
      ...userProperties,
      Email: userData.email,
      'First Name': userData.first_name,
      'Last Name': userData.last_name,
    };
    analyticsService.setUserProperties(userProperties);
    if (trigger === 'signup') {
      analyticsService.logEvent(analyticsEvents.USER_SIGNED_UP);
      customAnalytics.trackAmplitude(analyticsEvents.USER_SIGNED_UP); 
    }
  } catch (error) {
    if (error.response && error.response.status === 401
      && error.message && error.message.detail === 'Invalid token.') {
      yield put(authLogoutRequest());
    }
    if (trigger === 'signup') {
      // we want to track sign up event anyway
      setUserProperties(userProperties);
      analyticsService.logEvent(analyticsEvents.USER_SIGNED_UP);
      customAnalytics.trackAmplitude(analyticsEvents.USER_SIGNED_UP);
    }
    yield put(actions.userInfoError(error));
    monitoringService.logError(error);
  }
}

function* watchUserInfoRequest(api) {
  yield takeLatest(types.USER_INFO_REQUEST, userInfoRequest, api);
}

function* userPublicInfoRequest(api, { payload: userName }) {
  try {
    const user = yield select(state => state.user);
    // const { payload: { id: userId } } = yield take(userTypes.USER_PUBLIC_INFO_SUCCESS);

    if (_.isEmpty(user.publicInfo) || user.publicInfo.marcel_username !== userName) {
      const userData = yield call([api, api.get], `users/usernames/${userName}/`);
      yield put(actions.userPublicInfoSuccess(userData));
    } else {
      yield put(actions.userPublicInfoSuccess(user.publicInfo));
    }

  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.userPublicInfoError(error.message));
  }
}

function* watchUserPublicInfoRequest(api) {
  yield takeLatest(types.USER_PUBLIC_INFO_REQUEST, userPublicInfoRequest, api);
}

function* contactUserRequest(api, { payload }) {
  try {
    const currentUser = yield select(fromUser.getPublicInfo);
    yield call([api, api.post], `users/contact/${currentUser.marcel_username}/`, payload);
    yield put(actions.userContactSuccess());
    yield put(notificationCreate({ type: 'sendMessageSuccess' }));
    yield put(modalActions.modalClose('contact'));

    if (!authService.isImpersonated()) {
      customAnalytics.trackGA('Contact', 'Contact', analyticsEvents.CONTACT_ARTIST_SENT);
      userAnalyticsService.event({
        category: 'Contact',
        action: analyticsEvents.CONTACT_ARTIST_SENT,
      });
    }
  } catch (error) {
    monitoringService.logError(error);
    yield put(notificationCreate({
      type: 'commonError',
      timeout: 5000,
      text: "Something was wrong. Can't send message",
    }));
    yield put(actions.userContactError(error.message));
  }
}

function* watchContactUserRequest(api) {
  yield takeLatest(types.USER_CONTACT_REQUEST, contactUserRequest, api);
}

export default function* ({ api }) {
  yield fork(watchUserInfoRequest, api);
  yield fork(watchUserPublicInfoRequest, api);
  yield fork(watchContactUserRequest, api);
}
