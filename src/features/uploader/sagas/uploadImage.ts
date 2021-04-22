import { call, put, take } from 'redux-saga/effects';
import httpClient from 'services';

import {
    fileUploadSuccess,
    fileUploadError,
} from '../uploaderSlice';
import { toast } from 'react-toastify';

export const BE_MIME_TYPES_MAP = {
    'image/jpeg': 1,
    'image/jpg': 1,
    'image/png': 2,
    'image/tiff': 3,
    'image/tif': 3,
};

const uploadImage = (artworkId, data) => {
    return httpClient({
        url: `artworks/${artworkId}/images/presignedurl/`,
        method: 'PUT',
        data: {
            withToken: true,
            ...data,
        },
    });
}

let toastId = null;

const uploadToS3 = ({ url, data }) => {
    return httpClient({
        url: `${url}`,
        method: 'PUT',
        headers: { 'content-type': data.type },
        data,
        onUploadProgress: e => {
            const progress = (e.loaded / e.total);

            // console.log('uploadToS3 -> e', e);

            if (toastId === null && progress < 1) {
                // console.log('uploadToS3 -> toastId', toastId);

                toastId = toast.info('Uploading to server...', {
                    progress: progress,
                });
            } else if (progress === 1) {
                setTimeout(() => {
                    toast.update(toastId, {
                        render: 'Finishing...',
                        type: toast.TYPE.INFO,
                    })
                }, 1000);
            } else {
                // console.log('uploadToS3 -> else', toastId);
                toast.update(toastId, {
                    progress: progress
                })
            }
        }
    }).then (data => {
        // Upload is done!
        // The remaining progress bar will be filled up
        // The toast will be closed when the transition end
        toast.done(toastId)
    });
}

function* uploadImageSaga(chan) {
    while(true) {
        const { artwork, file } = yield take(chan);

        // console.log('uploadImageSaga -> ', file);

        if (!BE_MIME_TYPES_MAP[file.file.type]) {
            const errorMessage = `Image uploading failed. Unsupported file type: ${file.file.type}`;
            const error = new Error(errorMessage);
            error.name = 'UploadImageError';
            // error.meta = { artworkId: artwork.id };
            throw error;
        }

        const { data } = yield call(uploadImage, artwork.id,
            {
                extension: BE_MIME_TYPES_MAP[file.file.type],
                image_original_width: file.image_original_width,
                image_original_height: file.image_original_height,
            });

        if (data.error) {
            throw data.error
        }

        try {
            yield call(uploadToS3, {
                url: data.presigned_url,
                data: file.file
            });

            const uploadedImage = { ...data.image_data, artworkId: artwork.id };

            yield put(fileUploadSuccess({ uploadedImage }));
        } catch (error) {
            yield put(fileUploadError(error.message));
        }

    }
}

export default uploadImageSaga;
