import {
    put, call, takeLatest
} from 'redux-saga/effects';
import httpClient from 'services';

import {
    fetchArtwork, fetchArtworkSuccess, fetchArtworkError
} from '../editArtworkSlice';

export const fetchArtworkRequest = ({ artworkId }) =>
    httpClient.get(`/artworks/${artworkId}/`, {
        data: {
            withToken: true
        }
    });

function* fetchArtworkSaga ({ payload }) {
    const { artworkId } = payload;

    try {
        const { data } = yield call(fetchArtworkRequest, { artworkId });

        yield put(fetchArtworkSuccess({ data }));
    } catch (error) {
        console.error('fetchArtworkSaga error -> ', error);
        yield put(fetchArtworkError({ error }))
    }
}

function* watchFetchArtwork () {
    yield takeLatest(fetchArtwork, fetchArtworkSaga);
}

export default watchFetchArtwork;