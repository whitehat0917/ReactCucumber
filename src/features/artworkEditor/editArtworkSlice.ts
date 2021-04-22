import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

import { FetchStatus } from 'app/global-types';
import { Artwork } from 'features/artwork/artwork-type';

import { initialStatus } from '../../store/utils';

export type TEditorState = {
    status: {
        fetch: FetchStatus,
        delete: FetchStatus,
        update: FetchStatus,
    },
    artwork: Artwork | {}
};

const initialState: TEditorState = {
    artwork: {},
    status: {
        fetch: initialStatus,
        delete: initialStatus,
        update: initialStatus,
    }
}

const artworkEditorSlice = createSlice({
    name: 'artworkEditor',
    initialState,
    reducers: {
        ...reducers,
        resetEditorState() {
            return initialState;
        }
    },
});

export const {
    fetchArtwork,
    saveArtwork,
    deleteArtwork,
    deleteSuccess,
    deleteFailed,
    fetchArtworkSuccess,
    fetchArtworkError,
    updateSuccess,
    updateFailed,
    resetEditorState,
    deleteImageRequest,
    deleteImageSuccess,
    deleteImageError,
} = artworkEditorSlice.actions;

export default artworkEditorSlice.reducer;