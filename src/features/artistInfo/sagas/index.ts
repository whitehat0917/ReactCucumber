import { all } from 'redux-saga/effects';

import watchArtistInfoRequest from './artistInfoSaga';
import watchArtistPublicInfoRequest from './artistPublicInfo';

export default function* artistInfoSaga() {
    yield all([
        watchArtistInfoRequest(),
        watchArtistPublicInfoRequest(),
    ]);
};