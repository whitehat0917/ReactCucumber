
import {
    put, call, fork, takeLatest, select, take, actionChannel
} from 'redux-saga/effects';
import _ from 'lodash';
import { fromUser } from 'store/selectors';
import monitoringService from 'services/sentry';
// import * as types from './constants';
// import * as actions from './actions';
// import * as userActions from '../user/actions';
// import * as userTypes from '../user/constants';

import { userSelector, STATUS_PUBLIC_INFO } from 'features/user/selectors';

import {
    collectionsLoadMore,
    collectionsLoadMoreSuccess,
    collectionsFetchError,
    artworksCollectionsFetchSuccess,
} from '../collectionSlice';

import { getCollections, getArtworks } from './endpoints';

function* loadMoreSaga({ 
    payload: { 
        offset,
        collectionsLimit, 
        artworksLimit 
    }
}) {
    try {
        const { publicInfo: { id: userId } } = yield select(userSelector(STATUS_PUBLIC_INFO));
    
        const { data: { results: artworksResult, count } } = yield call(getArtworks, {
            userId, 
            offset,
            collectionsLimit,
            artworksLimit
        });
        const { data: { results: collectionsResult } } = yield call(getCollections, {
            userId, 
            offset,
            collectionsLimit,
        });
        
        yield put(artworksCollectionsFetchSuccess({ results: artworksResult, count }));
        yield put(collectionsLoadMoreSuccess({ results: collectionsResult }));

    } catch (error) {
        monitoringService.logError(error);
        yield put(collectionsFetchError(error));
    }
}

function* watchLoadMore() {
    yield takeLatest(collectionsLoadMore, loadMoreSaga);
}

export default watchLoadMore;