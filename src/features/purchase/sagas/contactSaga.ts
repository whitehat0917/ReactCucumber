import {
    put, call, takeLatest
} from 'redux-saga/effects';

import {
    updateContactData,
    submitContactData
} from '../purchaseSlice';

function* watchContactDataSubmit(action) {
    yield put(updateContactData(action.payload));
}

function* watchContactRequests() {
    yield takeLatest(submitContactData, watchContactDataSubmit);
}

export default watchContactRequests;
