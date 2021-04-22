import { all } from 'redux-saga/effects';

import watchArtworksUploadRequest from './uploderSaga';
import watchUploadViaService from './downloadImage';

export default function* uploaderSaga() {
    yield all([
        watchArtworksUploadRequest(),
        watchUploadViaService(),
    ]);
};