import { all } from 'redux-saga/effects';

import watchUserInfoRequest from './userInfoSaga';
import watchUserPublicInfoRequest from './userPublicInfoSaga';
import contactUserFlow from './contactSaga';

export default function* userSaga() {
    yield all([
        watchUserInfoRequest(),
        watchUserPublicInfoRequest(),
        contactUserFlow()
    ]);
};