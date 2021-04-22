import {
    put, call, select, take
} from 'redux-saga/effects';
import _ from 'lodash';
import monitoringService from 'services/sentry';
// import * as types from './constants';
// import * as actions from './actions';
// import * as userActions from '../user/actions';
// import * as userTypes from '../user/constants';


// Selectors -----------------------------------------

// Actions -------------------------------------------
import { 
    collectionsFetchRequest,
    collectionsFetchSuccess,
    collectionsFetchError,
    artworksCollectionsFetchSuccess,
    collectionsLoaded,
} from '../collectionSlice';

import { getCollections, getArtworks } from './endpoints';
import { userSelector, STATUS_PUBLIC_INFO } from 'features/user/selectors';

function* fetchCollections({ 
    offset, 
    userId, 
    collectionsLimit,
    artworksLimit 
}) {
    const stateCollections = yield select((state) => state.collections);

    try {
        if (Array.isArray(stateCollections.collections) && !stateCollections.collections.length) {
            const { data: { results: artworksResult, count } } = yield call(getArtworks, {
                userId,
                offset,
                collectionsLimit,
                artworksLimit,
            });
            const { data: { results: collectionsResult } } = yield call(getCollections, {
                userId, 
                offset,
                collectionsLimit,
            });

            yield put(artworksCollectionsFetchSuccess({ results: artworksResult, count }));
            yield put(collectionsFetchSuccess({ results: collectionsResult }));
        } else {
            yield put(collectionsLoaded({
                offset, 
                userId, 
                collectionsLimit,
                artworksLimit 
            }));
        }
    } catch (error) {
        monitoringService.logError(error);
        yield put(collectionsFetchError(error));
    }
}

export function* watchCollectionsRequests() {
    while(true) {
        const { payload: { 
            offset,
            collectionsLimit, 
            artworksLimit 
        } } = yield take(collectionsFetchRequest);

        const { publicInfo: { id: userId } } = yield select(userSelector(STATUS_PUBLIC_INFO));

        // console.log('artworksLimit -> ', artworksLimit);
        // console.log('collectionsLimit -> ', collectionsLimit);
        // console.log('offset -> ', offset);

        yield call(fetchCollections, {
            offset,
            collectionsLimit,
            artworksLimit,
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

// function* watchCollectionsRequests(api) {
//     const requestChan = yield actionChannel(collectionsFetchRequest);

//     console.log('watchCollectionsRequests');

//     while(true) {
//         const { payload } = yield take(requestChan);
    
//         yield put(userPublicInfoRequest(payload.userName));
    
//         const { payload: { id: userId } } = yield take(userPublicInfoSuccess);
    
//         yield call(collectionsFetchRequest, api, { userId, offset: payload.offset })
//     }
// }
