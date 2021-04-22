import { all } from 'redux-saga/effects';

// import { watchArtworksFetchRequest } from './fertchArtworksSaga';
// import { watchPrivateArtworksFetchRequest } from './privateArtworksSaga';
import watchFetchArtwork from './fetchArtwork';
import watchArtworksDeleteRequest from './deleteArtwork';
import watchUpdateRequest from './updateArtwork';
import watchImageDeleteRequest from './deleteImage';

export default function* artworkEditorSaga() {
    yield all([
        watchFetchArtwork(),
        watchArtworksDeleteRequest(),
        watchUpdateRequest(),
        watchImageDeleteRequest(),
        // watchPrivateArtworksFetchRequest(),
    ]);
};