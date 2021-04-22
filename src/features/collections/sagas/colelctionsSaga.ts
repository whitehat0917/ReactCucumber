import { artistPublicInfoSuccess } from 'features/artistInfo/artistInfoSlice';
// import * as types from './constants';
// import * as actions from './actions';
// import * as userActions from '../user/actions';
// import * as userTypes from '../user/constants';
// Selectors -----------------------------------------
import { artistPublicInfoSelector, STATUS_PUBLIC_INFO } from 'features/artistInfo/selectors';
import { showNotify } from 'features/notify/notifySlice';
import { call, put, select, take } from 'redux-saga/effects';
import httpClient from 'services';
import monitoringService from 'services/sentry';
// Actions -------------------------------------------
import {
  artworksCollectionsFetchSuccess,
  collectionsFetchError,
  collectionsFetchRequest,
  collectionsFetchSuccess,
} from '../collectionsSlice';

// import { showNotify } from 'features/notify/notifySlice';

export const getCollections = ({ userId, offset = 0, collectionsLimit = 80 }) =>
  httpClient.get(
    `/artwork-collections/?artist__id=${userId}&all_collections=true&limit=${collectionsLimit}&offset=${offset}`,
  );

export const getArtworks = ({ userId, offset = 0, collectionsLimit = 80, artworksLimit = 80 }) =>
  httpClient.get(
    `/artwork-collections/?artist__id=${userId}&all_collections=true&limit=${collectionsLimit}&offset=${offset}&sparse=true&artworks_limit=${artworksLimit}`,
  );

function* collectionsSaga({ offset, userId, collectionsLimit, artworksLimit }) {
  const stateCollections = yield select((state) => state.collections);

  // console.log('userId -> ', userId);

  try {
    if (userId && Array.isArray(stateCollections.collections) && !stateCollections.collections.length) {
      const {
        data: { results: artworksResult, count },
      } = yield call(getArtworks, {
        userId,
        offset,
        collectionsLimit,
        artworksLimit,
      });
      const {
        data: { results: collectionsResult },
      } = yield call(getCollections, {
        userId,
        offset,
        collectionsLimit,
      });

      yield put(artworksCollectionsFetchSuccess({ results: artworksResult, count }));
      yield put(collectionsFetchSuccess({ results: collectionsResult }));
    }
    // else {
    //     yield put(collectionsLoaded({
    //         offset,
    //         userId,
    //         collectionsLimit,
    //         artworksLimit
    //     }));
    // }
  } catch (errors) {
    monitoringService.logError(errors);
    yield put(collectionsFetchError({ errors }));
    yield put(
      showNotify({
        type: 'error',
        timeout: 5000,
        text: 'error',
      }),
    );
  }
}

function* watchCollectionsRequests() {
  while (true) {
    const {
      payload: { offset, collectionsLimit, artworksLimit },
    } = yield take([collectionsFetchRequest, artistPublicInfoSuccess]);

    const {
      publicInfo: { id: userId },
    } = yield select(artistPublicInfoSelector(STATUS_PUBLIC_INFO));
    // console.log('artworksLimit -> ', artworksLimit);
    // console.log('collectionsLimit -> ', collectionsLimit);
    // console.log('offset -> ', offset);

    yield call(collectionsSaga, {
      offset,
      collectionsLimit,
      artworksLimit: artworksLimit || 5,
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
}

export default watchCollectionsRequests;
