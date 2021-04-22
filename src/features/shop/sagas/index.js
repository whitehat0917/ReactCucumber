import { all } from 'redux-saga/effects';

import watchProductRequests from './productsSaga';

export default function* shopSaga() {
    yield all([
        watchProductRequests()
    ]);
};
