import {
    put, call, select, take
} from 'redux-saga/effects';
import httpClient, { UNAUTHORIZED } from 'services';

import monitoringService from 'services/sentry';

import {
    privateArtworksFetchRequest,
    privateArtworksFetchSuccess,
    privateArtworksFetchError,
    privateArtworksLoaded,
} from '../privateGallerySlice';
import { buildFilterQuery } from 'store/artworks/utils';
import { authError } from 'features/core/coreSlice';

const PAGE_SIZE = 20;

export const getPrivateGallery = ({offset, filterQuery = ''}) =>
    httpClient.get(`/artworks/?limit=${PAGE_SIZE}&offset=${offset}&${filterQuery}ordering=-created`, {
        data: {
            withToken: true
        }
    });

function* fetchPrivateArtworks({ offset, append }) {
    const artworks = yield select(state => state.artworks);

    try {
        // const meta = yield select(fromArtworks.getMeta);

        // const filter = yield select(state => state.filter);
        // const filterQuery = filter ? buildFilterQuery(filter) : '';

        // console.log('filterQuery -> ', filterQuery);

        // if (filterQuery) {
        //     query = `${query}&${filterQuery}`;
        // }

        // const sorting = yield select(fromArtworks.getSorting);
        // const sortingQuery = buildSortingQuery(sorting);
        // if (sortingQuery) query = `${query}&${sortingQuery}`;

        if (!artworks.privateArtworks.length) {
            const { data } = yield call(getPrivateGallery, { offset });

            if (!data.results.length) {
                yield put(privateArtworksFetchError({
                    type: 'fetch',
                    errors: ['You dont have an artworks...']
                }));

                return;
            }

            yield put(privateArtworksFetchSuccess({
                ...data,
                append
            }));
        } else {
            yield put(privateArtworksLoaded());
        }

        // if (payload.trigger === 'filter') {
        //     yield put(actions.artworksApplyFilterSuccess());
        // } else if (payload.trigger === 'sorting') {
        //     yield put(actions.artworksChangeSortingSuccess());
        // }
        // yield put(actions.artworksPollUpdatesStart());
    } catch (error) {
        monitoringService.logError(error);
        // yield put(showNotify({
        //     type: 'error',
        //     timeout: 5000,
        //     text: errors.message,
        // }));
        if (error.status === UNAUTHORIZED) {
            yield put(authError(error));

            return;
        }

        yield put(privateArtworksFetchError({}));
    }
}

function* fetchFilteredArtworks ({ offset, filterQuery }) {
    const artworks = yield select(state => state.artworks);

    try {
        // const meta = yield select(fromArtworks.getMeta);

        // const filter = yield select(state => state.filter);
        // const filterQuery = filter ? buildFilterQuery(filter) : '';

        // console.log('filterQuery -> ', filterQuery);

        // if (filterQuery) {
        //     query = `${query}&${filterQuery}`;
        // }

        // const sorting = yield select(fromArtworks.getSorting);
        // const sortingQuery = buildSortingQuery(sorting);
        // if (sortingQuery) query = `${query}&${sortingQuery}`;

        if (!artworks.privateArtworks.length) {
            const { data } = yield call(getPrivateGallery, { offset, filterQuery });

            yield put(privateArtworksFetchSuccess(data));
        } else {
            yield put(privateArtworksLoaded());
        }

        // if (payload.trigger === 'filter') {
        //     yield put(actions.artworksApplyFilterSuccess());
        // } else if (payload.trigger === 'sorting') {
        //     yield put(actions.artworksChangeSortingSuccess());
        // }
        // yield put(actions.artworksPollUpdatesStart());
    } catch (error) {
        // yield put(showNotify({
        //     type: 'error',
        //     timeout: 5000,
        //     text: errors.message,
        // }));
        monitoringService.logError(error);
        yield put(privateArtworksFetchError(error));
    }
}

function* watchPrivateArtworksFetchRequest() {
    while(true) {
        const { payload } = yield take(privateArtworksFetchRequest);

        if (payload.trigger === 'filter') {
            const filter = yield select(state => state.filter);
            const prepearedFilter = {
                ...filter,
                price: {
                    min: filter.price.min.value,
                    max: filter.price.max.value,
                }
            };
            const filterQuery = buildFilterQuery(prepearedFilter);

            // console.log('filterQuery -> ', filterQuery);

            yield call(fetchFilteredArtworks, {
                offset: 0,
                filterQuery: `${filterQuery}&`,
            });
        }

        // console.log('watchPrivateArtworksFetchRequest');
        if (payload.trigger === 'update') {
            yield call(fetchPrivateArtworks, {
                offset: payload.offset,
                append: true
            });
        } else {
            yield call(fetchPrivateArtworks, {
                offset: 0,
                append: false
            });
        }

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

export default watchPrivateArtworksFetchRequest;
