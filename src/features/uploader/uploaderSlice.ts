import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { initialStatus } from 'store/utils';
import { FetchStaus } from 'app/global-types';

import { TArtwork } from "../artwork/artwork-type";

interface IArtworkFile extends File {
    id: string
};

export type TUploaderState = {
    files: IArtworkFile[],
    modalIsOpen: boolean,
    artwork?: TArtwork,
    status: {
        upload: FetchStaus,
        file_upload: FetchStaus,
    }
};

const initialState: TUploaderState = {
    files: [],
    modalIsOpen: false,
    artwork: undefined,
    status: {
        upload: initialStatus,
        file_upload: initialStatus,
    }
}

const uploaderSlice = createSlice({
    name: 'uploader',
    initialState,
    reducers: {
        ...reducers,
        resetState() {
            return initialState;
        }
    },
});

export const {
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
    resetState,
} = uploaderSlice.actions;

export default uploaderSlice.reducer;
