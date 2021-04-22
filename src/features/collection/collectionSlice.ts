import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import { initialStatus } from '../../store/utils';

import collectionsReducer from './reducers';

import { TCollectionState } from './collection-types';

export const initialState: TCollectionState = {
    status: {
        fetch: initialStatus,
        fetch_selected: initialStatus,
        fetch_more: initialStatus,
        preload_selected: initialStatus,
    },
    collections: [],
    artworks: [],
    loadedCollections: [],
    selectedCollections: {},
    selCollUpdateId: 0,
};

const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        ...collectionsReducer
    },
});

export const {
    collectionsPage,
    collectionsFetchRequest,
    collectionsFetchSuccess,
    collectionsFetchError,
    artworksCollectionsFetchSuccess,
    collectionsLoadMore,
    collectionsLoadMoreSuccess,
    selectedCollectionFetchRequest,
    selectedCollectionFetchSuccess,
    selectedCollectionFetchError,
    preloadCollection,
    collectionsLoaded,
    fetchOnlyCollections,
} = collectionSlice.actions;

export default collectionSlice.reducer;
