import {
  put, call, fork, takeLatest, select, take, actionChannel
} from 'redux-saga/effects';
import { channel } from 'redux-saga';
import _ from 'lodash';
import { fromUser } from 'store/selectors';
import monitoringService from 'services/sentry';
import * as types from './constants';
import * as actions from './actions';
import * as userActions from '../user/actions';
import * as userTypes from '../user/constants';

// import * as artworkActions from '../artworks/actions';

const COLLECTIONS_LIMIT = 8;
const ARTWORKS_LIMIT = 4;

function* watchCollectionsRequests(api) {
  const requestChan = yield actionChannel(types.COLLECTIONS_FETCH_REQUEST);

  while(true) {
    const { payload } = yield take(requestChan);

    yield put(userActions.userPublicInfoRequest(payload.userName));

    const { payload: { id: userId } } = yield take(userTypes.USER_PUBLIC_INFO_SUCCESS);

    yield call(collectionsFetchRequest, api, { userId, offset: payload.offset })
  }
}

function* collectionsFetchRequest(api, payload) {
  const { userId } = payload;
  const offset = payload.offset || 0;
  const stateCollections = yield select((state) => state.collections);

  try {
    if (Array.isArray(stateCollections.collections) && !stateCollections.collections.length) {
      const queryCollections = `artwork-collections/?artist__id=${userId}&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}`;
      const queryArtworks = `artwork-collections/?artist__id=${userId}&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}&sparse=true&artworks_limit=${ARTWORKS_LIMIT}`;

      const { results: collectionsResult, count } = yield call([api, api.get], queryCollections);
      const { results: artworksResult } = yield call([api, api.get], queryArtworks);

      const resultToSave = collectionsResult.reduce((prev, current, idx) => {
        current.artworks = artworksResult[idx].artworks;

        return [
          ...prev,
          current
        ];
      }, []);

      const hasMore = (count > collectionsResult.length);

      yield put(actions.collectionsFetchSuccess({ results: resultToSave, hasMore }));
    }
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.collectionsFetchError(error));
  }
}

//* ----------------------------------------------------------------------------

function* collectionsLoadMore(api, { payload: { offset } }) {
  const stateCollections = yield select((state) => state.collections);

  try {
    const { id: userId } = yield select(fromUser.getPublicInfo);

    const queryCollections = `artwork-collections/?artist__id=${userId}&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}`;
    const queryArtworks = `artwork-collections/?artist__id=${userId}&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}&sparse=true&artworks_limit=${ARTWORKS_LIMIT}`;

    const { results: collectionsResult, count } = yield call([api, api.get], queryCollections);
    const { results: artworksResult } = yield call([api, api.get], queryArtworks);

    const resultToSave = collectionsResult.reduce((prev, current, idx) => {
      current.artworks = artworksResult[idx].artworks;

      return [
        ...prev,
        current
      ];
    }, []);

    const hasMore = (count > (stateCollections.collections.length + collectionsResult.length));

    yield put(actions.collectionsFetchSuccess({ results: resultToSave, hasMore }));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.collectionsFetchError(error));
  }
}

function* watchLoadMore(api) {
  yield takeLatest(types.COLLECTIONS_LOAD_MORE, collectionsLoadMore, api);
}

//* ----------------------------------------------------------------------------

function* watchUserPublicRequestCollectionPage(api) {
  const requestChan = yield actionChannel(types.COLLECTIONS_SINGLE_COLLECTION_FETCH_REQUEST);

  while(true) {
    const { payload: { collectionUrl, userName } } = yield take(requestChan);

    yield put(userActions.userPublicInfoRequest(userName));

    const { payload: { id: userId } } = yield take(userTypes.USER_PUBLIC_INFO_SUCCESS);

    yield call(collectionsSingleCollectionFetchRequest, api, { userId, collectionUrl })
  }
}

function* collectionsSingleCollectionFetchRequest(api, { userId, collectionUrl }) {
  const { selectedCollection } = yield select(state => state.collections);

  // console.log('selectedCollection -> ', selectedCollection);

  if (typeof selectedCollection[collectionUrl] === 'undefined') {
    try {
      const query = `artwork-collections/?artist__id=${userId}&url=${collectionUrl}&artwork_details=true&all_collections=true`;
      const { results } = yield call([api, api.get], query);
  
      yield put(actions.collectionsSingleCollectionFetchSuccess(results[0]));
  
    } catch (error) {
      monitoringService.logError(error);
      yield put(actions.collectionsSingleCollectionFetchError(error));
    }
  } else {
    yield put(actions.collectionsSingleCollectionFetchSuccess(selectedCollection));
  }
}

export default function* ({ api }) {
  yield fork(watchCollectionsRequests, api);
  yield fork(watchUserPublicRequestCollectionPage, api);
  yield fork(watchLoadMore, api);
}