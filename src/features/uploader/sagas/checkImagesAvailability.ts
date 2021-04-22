import httpClient from "services";
import { delay, call, put, fork, take } from "redux-saga/effects";
import { v4 } from 'uuid'; 

import {
    uploadSuccess,
    checkAvailability,
    checkAvailabilitySuccess,
    checkAvailabilityFailed,
} from '../uploaderSlice';
import { push } from "connected-react-router";
import { privateArtworksFetchRequest, privateArtworksFetchSuccess } from "features/privateGallery/privateGallerySlice";
// import { showNotify } from "features/notify/notifySlice";
import { toast } from "react-toastify";
import { fetchArtwork, fetchArtworkSuccess } from "features/artworkEditor/editArtworkSlice";

const RETRY_DELAY = 5000;
const successToastId = v4();

export const ARTWORK_IMAGE_STATES = {
    UPLOADING: 1,
    READY: 2,
};

const getImage = ({ image }) => {
    return httpClient({
        url: `artworks/${image.artworkId}/images/${image.id}/`,
        method: 'GET',        
        data: {
            withToken: true
        }
    });
}

function* downloadImage ({ image }) {
    while(true) {
        yield take(checkAvailability);

        try {
            const { data } = yield call(getImage, { image });
        
            // console.log('data -> ', data);

            yield put(checkAvailabilitySuccess({ data }));
        } catch(error) {
            yield put(checkAvailabilityFailed({ error }));
        }
    }
}

function* checkAvailabilitySaga({ uploadedImages, to }) {
    for (let image of uploadedImages) {
        yield fork(downloadImage, { image });
        yield put(checkAvailability({}));
    }

    while(true) {
        const { payload: { data } } = yield take(checkAvailabilitySuccess);

        // console.log('checkAvailabilitySuccess -> data', data);

        if (data.state === ARTWORK_IMAGE_STATES.UPLOADING) {
            yield delay(RETRY_DELAY);
            yield put(checkAvailability({}));
        }

        if (data.state === ARTWORK_IMAGE_STATES.READY) {
            // console.log('to -> ', to);

            if (to === '/') {
                yield put(privateArtworksFetchRequest({}));
                yield take(privateArtworksFetchSuccess);
            } else {
                const [,artworkId] = to.split('/');

                yield put(fetchArtwork({ artworkId }));
                yield take(fetchArtworkSuccess);
            }

            // console.log('checkAvailabilitySaga data -> ', data);

            yield put(uploadSuccess({ data }));
            yield put(push(to));

            // console.log('toastId -> ', successToastId);
            // console.log('toast.isActive(toastId) -> ', toast.isActive(successToastId));

            if (!toast.isActive(successToastId)) {
                toast.success('Upload success!', {
                    toastId: successToastId
                });
            }
        }
    }
}

export default checkAvailabilitySaga;