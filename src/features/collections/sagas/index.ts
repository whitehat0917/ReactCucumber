import { all } from 'redux-saga/effects';

// import { watchArtworksFetchRequest } from './fertchArtworksSaga';
// import { watchPrivateArtworksFetchRequest } from './privateArtworksSaga';
import watchCollectionsRequests from './colelctionsSaga';
import watchLoadMore from './loadMoreSaga';

export default function* collectionsSaga() {
    yield all([
        watchCollectionsRequests(),
        watchLoadMore(),
    ]);
};