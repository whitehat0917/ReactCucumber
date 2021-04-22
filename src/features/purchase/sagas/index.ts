import { all } from 'redux-saga/effects';

import watchProductRequests from './productSaga';
import watchContactRequests from "./contactSaga";
import watchBillingRequests from "./billingSaga";

export default function* purchaseSaga() {
    yield all([
        watchProductRequests(),
        watchContactRequests(),
        watchBillingRequests()
    ]);
};
