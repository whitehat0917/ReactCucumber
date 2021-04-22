import { all, takeLatest, take, actionChannel, call, fork } from 'redux-saga/effects'

// LEGACY ----------------------------------------------------------------------

// import authSaga from 'store/auth/sagas';
// import artworkSaga from 'store/artworks/sagas';
// import collectionsSaga from 'store/collections/sagas';
// import notificationsSaga from 'store/notifications/sagas';
// import registrationSaga from 'store/registration/sagas';
// import userSaga from 'store/user/sagas';
import coreSaga from 'features/core/sagas';
import userSaga from 'features/user/sagas';
import collectionSaga from 'features/collection/sagas';
import collectionsSaga from 'features/collections/sagas';
import shopSaga from 'features/shop/sagas';
import purchaseSaga from "features/purchase/sagas";
import artworkSaga from 'features/artwork/sagas';
import uploaderSaga from 'features/uploader/sagas';
import artistInfoSaga from 'features/artistInfo/sagas';
import artworkEditorSaga from 'features/artworkEditor/sagas';
import privateGallerySaga from 'features/privateGallery/sagas';
import resetPasswordSaga from 'features/resetPassword/sagas';
import watchApplyFilterRequest from 'features/artworkFilter/sagas';

import { initApp } from '../features/core/coreSlice';
import { initCore, appReady } from '../features/core/coreSaga';

// function* initSagas (services) {
//     yield all([
//         coreSaga(),
//         // authSaga(services),
//         // artworkSaga(services),
//         // collectionsSaga(services),
//         // notificationsSaga(services),
//         // registrationSaga(services),
//         collectionSaga(services),
//     ]);

// }

// function* watchAppReady () {
//     yield takeLatest(appReady, initSagas)
// }

export default function* rootSaga() {
    yield all([
        coreSaga(),
        userSaga(),
        artistInfoSaga(),
        privateGallerySaga(),
        // authSaga(services),
        // artworkSaga(services),
        // collectionsSaga(services),
        // notificationsSaga(services),
        // registrationSaga(services),
        artworkSaga(),
        artworkEditorSaga(),
        collectionSaga(),
        collectionsSaga(),
        shopSaga(),
        purchaseSaga(),
        uploaderSaga(),
        resetPasswordSaga(),
        watchApplyFilterRequest(),
    ]);
};
