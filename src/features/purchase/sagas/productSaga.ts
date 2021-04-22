import {
    all, put, call, takeLatest
} from 'redux-saga/effects';

// Actions -------------------------------------------
import {
    productFetchRequest,
    productFetchSuccess,
    productFetchError,
    productProcessError
} from '../purchaseSlice';
import { getProduct } from "./endpoints";

import monitoringService from 'services/sentry';

import history from "../../../store/history";

function* fetchProduct(productId) {
    try {
        const { data } = yield call(getProduct, productId);

        if (data)
            yield put(productFetchSuccess(data));
        else
            throw 'API call returned empty or undefined product';
    } catch(error) {
        monitoringService.logError(error);
        yield put(productFetchError(error));
    }
}

function* watchProductFetch(action) {
    yield call(fetchProduct, action.payload.productId);
}

function* watchProductProcessError(action) {
    yield call(history.push, `/${action.payload}/shop`);
}

function* watchProductRequests() {
    yield all([
        takeLatest(productFetchRequest, watchProductFetch),
        takeLatest(productProcessError, watchProductProcessError)
    ]);
}

export default watchProductRequests;
