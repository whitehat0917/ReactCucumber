import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';
import { TUploaderState } from '../uploaderSlice';

const setCurrArtwork = (state: TUploaderState, { payload }) => ({
    ...state,
    artwork: payload
});

const onDrop = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        files: [
            ...state.files,
            ...payload.files
        ],
    }
}

const onRemove = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        files: state.files.filter(file => file.id !== payload.fileId),
    };
}

const uploadRequest = (state: TUploaderState) => {
    return {
        ...state,
        status: generateStatus(state, 'upload', loadingStatus()),
    };
}

const uploadSuccess = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        status: generateStatus(state, 'upload', successStatus()),
    };
}

const uploadFailed = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        status: generateStatus(state, 'upload', errorStatus()),
    };
}

const artworkCreateSuccess = (state: TUploaderState, { payload }) => state;
const artworkCreateFailed = (state: TUploaderState, { payload }) => state;

const fileUploadRequest = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        status: generateStatus(state, 'file_upload', loadingStatus()),
    };
};
const fileUploadSuccess = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        status: generateStatus(state, 'file_upload', successStatus()),
    };
};
const fileUploadError = (state: TUploaderState, { payload }) => {
    return {
        ...state,
        status: generateStatus(state, 'file_upload', errorStatus(payload)),
    };
};

const uploadVia = (state: TUploaderState, { payload }) => {
    return state;
}


const checkAvailability = (state, { payload }) => state;

const checkAvailabilitySuccess = (state, { payload }) => {
    return state;
};

const checkAvailabilityFailed = (state, { payload }) => {
    return state;
};

export default {
    setCurrArtwork,
    onDrop,
    onRemove,
    uploadRequest,
    uploadSuccess,
    uploadFailed,
    uploadVia,
    fileUploadRequest,
    fileUploadSuccess,
    fileUploadError,
    artworkCreateSuccess,
    artworkCreateFailed,
    checkAvailability,
    checkAvailabilitySuccess,
    checkAvailabilityFailed,
};
