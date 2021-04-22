import { all } from 'redux-saga/effects';

import {
    watchCollectionsRequests
} from './fetchCollectionsSaga';
import watchLoadMore from './loadMoreCollectionsSaga';
import watchSelectedCollection from './fetchSelectedCollection';

export default function* collectionSaga() {
    yield all([
        // watchCollectionsRequests(),
        watchSelectedCollection(),
        // watchLoadMore(),
    ]);
};