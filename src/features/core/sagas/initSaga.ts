import { put, takeLatest, call } from 'redux-saga/effects';

import {
    initApp,
    appInitialized,
} from '../coreSlice';

function* appReady ({}) {
    yield put(appInitialized({ 
        initializing: false, 
        initializide: true,
        // authorized: !!token,
        // xuserId: typeof payload !== 'undefined' ? payload.id : null
    }));
}

function* initSaga ({ payload }) {
    const { initializing } = payload;

    if (initializing) {
        yield call(appReady, {});
    }
}

function* initializeSaga () {
    yield takeLatest(initApp, initSaga);
}

export default initializeSaga;