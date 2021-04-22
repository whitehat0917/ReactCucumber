import { all } from 'redux-saga/effects';

// import { watchArtworksFetchRequest } from './fertchArtworksSaga';
// import { watchPrivateArtworksFetchRequest } from './privateArtworksSaga';
import watchPrivateArtworksFetchRequest from './privateArtworks';

export default function* privateGallerySaga() {
    yield all([
        watchPrivateArtworksFetchRequest(),
        // watchPrivateArtworksFetchRequest(),
    ]);
};