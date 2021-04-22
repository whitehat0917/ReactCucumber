import {
    put, call, select, take, takeLatest
} from 'redux-saga/effects';

// Selectors -----------------------------------------
import { artistPublicInfoSelector, STATUS_PUBLIC_INFO } from 'features/artistInfo/selectors';
import { productsSimpleSelector } from "../selectors";

// Actions -------------------------------------------
import {
    productsFetchRequest,
    productsFetchSuccess,
    productsFetchError
} from '../shopSlice';
import { artistPublicInfoSuccess } from 'features/artistInfo/artistInfoSlice';
import { getProducts } from "./endpoints";

import monitoringService from 'services/sentry';

const PRODUCT_PAGE_SIZE = 20;

function* fetchProducts(userId, append) {
    try {
        let offset = 0;
        if (append) {
            const { products } = yield select(productsSimpleSelector);
            offset = products.length;
        }

        const { data } = yield call(getProducts, userId, offset, PRODUCT_PAGE_SIZE);
        yield put(productsFetchSuccess({data, append}));
    } catch(error) {
        monitoringService.logError(error);
        yield put(productsFetchError(error));
    }
}

function* watchProductsFetch(action) {
    const { publicInfo: { id: userId } } = yield select(artistPublicInfoSelector(STATUS_PUBLIC_INFO));

    if (userId) {
        yield call(fetchProducts, userId, action.payload.append);
    } else {
        yield take(artistPublicInfoSuccess);

        const { publicInfo: { id: userId } } = yield select(artistPublicInfoSelector(STATUS_PUBLIC_INFO));
        yield call(fetchProducts, userId);
    }
}

function* watchProductRequests() {
    yield takeLatest(productsFetchRequest, watchProductsFetch);
}

export default watchProductRequests;
