import { select, call, put, take } from 'redux-saga/effects';
import httpClient from 'services';
// import { push } from 'connected-react-router'
// import _ from 'lodash';
import monitoringService from 'services/sentry';

import {
    userContactRequest,
    userContactSuccess,
    userContactError,
} from 'features/user/userSlice';
import { userSelector, STATUS_PUBLIC_INFO } from '../selectors';
import { toast } from 'react-toastify';

function* contactUserRequest({ publicInfo, payload }) {
    try {
        yield call(httpClient.post, `/users/contact/${publicInfo.marcel_username}/`, payload);
        
        yield put(userContactSuccess());

        // console.log('data -> ', data);

        toast.success('Your message has been sent');

        // yield put(notificationCreate({ type: 'sendMessageSuccess' }));
        // yield put(modalActions.modalClose('contact'));

        // if (!authService.isImpersonated()) {
        //     customAnalytics.trackGA('Contact', 'Contact', analyticsEvents.CONTACT_ARTIST_SENT);
        //     userAnalyticsService.event({
        //     category: 'Contact',
        //     action: analyticsEvents.CONTACT_ARTIST_SENT,
        //     });
        // }

    } catch (error) {
        monitoringService.logError(error);
        yield put(userContactError({ error }));

        toast.error("Something was wrong. Can't send message");
    }
}

function* contactUserFlow() {
    while(true) {
        const { payload } = yield take(userContactRequest);

        const { publicInfo } = yield select(userSelector(STATUS_PUBLIC_INFO));

        yield call(contactUserRequest, {
            publicInfo,
            payload
        });
    }
}

export default contactUserFlow;