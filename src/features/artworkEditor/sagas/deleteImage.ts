import {
    put, call, takeLatest, take
} from 'redux-saga/effects';
import httpClient from "services";
import { toast } from 'react-toastify';

import monitoringService from 'services/sentry';

import { 
    deleteImageRequest, 
    deleteImageSuccess, 
    deleteImageError, 
    fetchArtwork, 
    fetchArtworkSuccess, 
    fetchArtworkError 
} from "../editArtworkSlice";

// import { push } from "connected-react-router";
// import { privateArtworksFetchRequest, privateArtworksFetchSuccess, privateArtworksFetchError } from 'features/privateGallery/privateGallerySlice';

export const deleteImage = ({ artworkId, imageId }) => {
    return httpClient({
        url: `artworks/${artworkId}/images/${imageId}/`,
        method: 'DELETE',
        data: {
            withToken: true,
        },
    });
}

function* deleteImageSaga({ payload }) {
    try {
        const { artworkId, imageId } = payload;

        yield call(deleteImage, { artworkId, imageId });

        yield put(fetchArtwork({ artworkId }));
        // yield put(push('/'));

        yield take([fetchArtworkSuccess, fetchArtworkError]);

        yield put(deleteImageSuccess({ artworkId, imageId }));

        yield toast.success('Image has been deleted 👍');
    } catch (error) {
        monitoringService.logError(error);

        yield put(deleteImageError({ error }));

        yield toast.error('Error...');
    }
  }
  
function* watchImageDeleteRequest() {
    yield takeLatest(deleteImageRequest, deleteImageSaga);
}

export default watchImageDeleteRequest;