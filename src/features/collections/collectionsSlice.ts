import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import { initialStatus } from '../../store/utils';

import collectionsReducer from './reducers/collections';
import collectionsLoadMoreReducer from './reducers/collectionsLoadMore';

import { TCollectionsState } from './collections-types';

export const initialState: TCollectionsState = {
    status: {
        fetch: initialStatus,
        fetch_selected: initialStatus,
        fetch_more: initialStatus,
        preload_selected: initialStatus,
    },
    collections: [],
    artworks: [],
    loadedCollections: [],
    empty: false,
};

const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        ...collectionsReducer,
        ...collectionsLoadMoreReducer
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
    collectionsLoaded,
    fetchOnlyCollections,
    emptyCollections,
} = collectionSlice.actions;

export default collectionSlice.reducer;
