import { call, put } from 'redux-saga/effects';
import httpClient from 'services';

import {
    artworkCreateSuccess,
    artworkCreateFailed,
} from '../uploaderSlice';

const getName = (fileName) => (fileName.includes('.')
    ? fileName.split('.').slice(0, -1).join('.').replace('_', ' ') : fileName);

export const createArtwork = (data) => {
    return httpClient({
        url: `artworks/`,
        method: 'POST',
        data: {
            withToken: true,
            ...data,
        },
    });
}

export const deleteArtwork = (id) => {
    return httpClient({
        url: `artworks/${id}`,
        method: 'DELETE',
        data: {
            withToken: true,
        },
    });
}

function* createArtworkSaga(fileObject, i) {
    try {
        const { data } = yield call(createArtwork, {
            title: fileObject.name ? getName(fileObject.name) : fileObject.name,
        });

        if (data.error) {
            throw data.error
        }

        yield put(artworkCreateSuccess({ data, i }));

    } catch (error) {
        yield put(artworkCreateFailed({ error }));
        throw error;
    }
}

export default createArtworkSaga;
