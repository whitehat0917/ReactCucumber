import {
    put, call, select, take, fork, actionChannel, takeLatest
} from 'redux-saga/effects';
import _ from 'lodash';
import qs from 'query-string';
import monitoringService from 'services/sentry';

// Actions -------------------------------------------
import {
    userInfoSuccess,
    userInfoError,
    userPublicInfoSuccess,
    userPublicInfoError
} from 'features/user/userSlice';

const ARTWORKS_PAGE_SIZE = 20;

import {
    collectionsFetchRequest,
    selectedCollectionFetchRequest,
    selectedCollectionFetchSuccess,
    selectedCollectionFetchError,
    preloadCollection,
} from '../collectionSlice';

import { getSelectedCollection, getCollections } from './endpoints';
import { artistPublicInfoSuccess } from 'features/artistInfo/artistInfoSlice';

function* watchFetchCollection ({ userId, collectionUrl, append }) {
    try {
        let artworksOffset = 0;
        let artworksLimit = ARTWORKS_PAGE_SIZE;
        if (append) {
            const { selectedCollections } = yield select(state => state.collections);
            if (!selectedCollections[collectionUrl])
                return;

            artworksOffset = selectedCollections[collectionUrl].artworks.results.length;
        }

        const { data: { results: [results] } } = yield call(getSelectedCollection, {
            userId,
            collectionUrl,
            artworksOffset,
            artworksLimit
        });
        results.artworks.results.forEach(el=>el.artwork_data.images.sort((a,b)=>a.order-b.order));
        yield put(selectedCollectionFetchSuccess({results, append}));
    } catch (error) {
        monitoringService.logError(error);
        yield put(selectedCollectionFetchError(error));
    }
}

function* watchArtistInfoSuccess ({collectionUrl, append}) {
    const { payload: { id: userId } } = yield take(artistPublicInfoSuccess);

    if (userId && collectionUrl) {
        yield call(watchFetchCollection, {userId, collectionUrl, append});
    }
}

function* checkRequirements({ userId, collectionUrl, append }) {
    const { selectedCollections } = yield select(state => state.collections);

    if (append) {
        yield call(watchFetchCollection, {userId, collectionUrl, append});
    } else {
        if (typeof selectedCollections[collectionUrl] === 'undefined' && userId) {
            yield call(watchFetchCollection, {userId, collectionUrl, append});
        } else {
            yield fork(watchArtistInfoSuccess, {collectionUrl, append});
        }
    }
}

function* watchSelectedCollection() {
    while(true) {
        const { payload: {
            collectionUrl,
            append
        } } = yield take([
            selectedCollectionFetchRequest,
        ]);
        const { publicInfo: { id: userId } } = yield select((state) => state.artistInfo);

        yield call(checkRequirements, { userId, collectionUrl, append });
    }
}

export default watchSelectedCollection;
