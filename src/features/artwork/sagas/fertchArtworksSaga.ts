import {
    put, call, select, take, actionChannel, takeLatest
} from 'redux-saga/effects';

import {
    artworksFetchRequest,
    artworksFetchSuccess,
    artworksFetchError,
    artworksLoaded
} from '../artworkSlice';

import { getPublicGallery } from './endpoints';

function* fetchArtworks({ userId, offset }) {
    const artworks = yield select(state => state.artworks);

    try {
        // const meta = yield select(fromArtworks.getMeta);

        // const filter = yield select(fromArtworks.getFilter);
        // const filterQuery = buildFilterQuery(filter);

        // if (filterQuery) query = `${query}&${filterQuery}`;

        // const sorting = yield select(fromArtworks.getSorting);
        // const sortingQuery = buildSortingQuery(sorting);
        // if (sortingQuery) query = `${query}&${sortingQuery}`;

        if (!artworks.artworks.length) {
            // const { data } = yield call(getPublicGallery, {
            //     userId,
            //     offset,
            // });

            // yield put(artworksFetchSuccess(data));
        }

        yield put(artworksLoaded());

        // if (payload.trigger === 'filter') {
        //     yield put(actions.artworksApplyFilterSuccess());
        // } else if (payload.trigger === 'sorting') {
        //     yield put(actions.artworksChangeSortingSuccess());
        // }
        // yield put(actions.artworksPollUpdatesStart());
    } catch (error) {
        // monitoringService.logError(error);
        yield put(artworksFetchError(error));
    }
}

export function* watchArtworksFetchRequest() {
    while(true) {
        yield take(artworksFetchRequest);

        const { publicInfo: { id: userId } } = yield select((state) => state.artistInfo);

        yield call(fetchArtworks, {
            offset: 0,
            userId,
        });

        // yield take(collectionsFetchRequest);
        // const { publicInfo } = yield select((state) => state.user);

        // console.log('watchCollectionsRequests user -> ', publicInfo);

        // yield call(fetchCollections, {
        //     offset: 0,
        //     userId: publicInfo.id,
        // });
    }
    // yield takeLatest([types.ARTWORKS_FETCH_REQUEST, types.ARTWORKS_APPLY_FILTER_REQUEST], fetchArtworks);
}