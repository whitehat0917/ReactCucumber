import { call, put, take, fork, select, cancel } from 'redux-saga/effects';
import { channel } from 'redux-saga'
import _ from 'lodash';
import { v4 } from 'uuid';
import monitoringService from 'services/sentry';

// import uploadImageSaga from './uploadImage';
import createArtworkSaga, { deleteArtwork } from './createArtwork';

import {
    uploadRequest,
    fileUploadError,
    artworkCreateSuccess,
    onDrop,
    fileUploadRequest,
    fileUploadSuccess,
} from '../uploaderSlice';
import uploaderSelector from "../selectors";
import { push } from 'connected-react-router';
import uploadImageSaga from './uploadImage';
import checkAvailabilitySaga from './checkImagesAvailability';

import { toast } from 'react-toastify';

export const RETRY_DELAY = 2000;
const errorToastId = v4();
// const CHECK_FOR_UPDATES_INTERVAL = 60000;

function* watchUploadErrors (artwork) {
    while(true) {
        yield take(fileUploadError);
        // try to remove failed artworks
        try {
            yield call(deleteArtwork, artwork.id);

        } catch (error) {
            monitoringService.logError(error);
        } finally {
            yield put(push('/'));

            if (!toast.isActive(errorToastId)) {
                toast.success('Upload error...', {
                    toastId: errorToastId
                });
            }
        }
    }
}

function* watchFileUploadSuccess({ to }) {
    const uploadedImages = [];

    while(true) {
        // console.log('watchFileUploadSuccess  has been running...');
        const { payload: { uploadedImage } } = yield take(fileUploadSuccess);

        uploadedImages.push(uploadedImage);

        // console.log('uploadedImage -> ', uploadedImage);

        yield call(checkAvailabilitySaga, { uploadedImages, to });
    }
}

// 3
function* watchCreatedArtwork (chan, files, to) {
    while(true) {
        // console.log('watchCreatedArtwork has been running...');
        const { payload: { data, i, edit } } = yield take(artworkCreateSuccess);

        if (edit) {
            for (const file of files) {
                yield put(chan, {
                    artwork: data,
                    file: file
                });
            }
        } else {
            yield put(chan, {
                artwork: data,
                file: files[i]
            })
        }

        yield fork(watchUploadErrors, data);
        yield fork(watchFileUploadSuccess, { to });
    }
}

// 2
function* watchUploadRequest ({
    imgUploadChan
}) {
    while(true) {
        // console.log('watchUploadRequest  has been running...');
        yield take(uploadRequest);
        // const { filesList } = yield take(uploadChan);

        const { files: filesList, artwork } = yield select(uploaderSelector);

        // console.log('filesList -> ', filesList);

        const to = _.isEmpty(artwork) ? '/' : `/${artwork.id}/edit`;

        // console.log('artwork -> ', artwork);
        // console.log('to -> ', to);

        yield fork(watchCreatedArtwork, imgUploadChan, filesList, to);
        yield fork(uploadImageSaga, imgUploadChan);

        if (_.isEmpty(artwork)) {
            for (let i = 0; i < filesList.length; i++ ) {
                yield call(createArtworkSaga, filesList[i], i);
            }
        } else {
            yield put(artworkCreateSuccess({ data: artwork, edit: true }));
        }
    }
}

// 1
function* watchArtworksUploadRequest() {
    let filesList = [];
    const imgUploadChan = yield call(channel);
    // const uploadChan = yield call(channel);

    let task = null;

    while (true) {
        const { payload: { files } } = yield take(fileUploadRequest);

        yield put(onDrop({ files: files.map(file => {
            return {
                id: v4(),
                file: file.file,
                dataUrl: file.dataUrl,
                name: file.file.name,
                size: file.file.size,
                type: file.file.type,
                image_original_width: file.image_original_width,
                image_original_height: file.image_original_height,
            };
        }) }));


        if (task && task.isRunning()) {
            yield cancel(task);
            task = yield fork(watchUploadRequest, {
                imgUploadChan,
                filesList,
            });
        } else {
            task = yield fork(watchUploadRequest, {
                imgUploadChan,
                filesList,
            });
        }

        // yield put(uploadChan, { filesList });

        // console.log('filesList -> ', filesList);
    }
}

export default watchArtworksUploadRequest;
