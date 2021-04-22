import { all } from 'redux-saga/effects';

import { watchArtworksFetchRequest } from './fertchArtworksSaga';

export default function* artworkSaga() {
    yield all([
        watchArtworksFetchRequest()
    ]);
};