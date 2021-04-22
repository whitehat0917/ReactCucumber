import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const collectionsPage = (state, { payload }) => ({
    ...state,
})

const collectionsFetchRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'fetch', loadingStatus()),
});

const collectionsFetchSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
    collections: [
        ...state.collections,
        ...payload.results
    ],
    hasMore: payload.hasMore
})

const artworksCollectionsFetchSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
    artworks: [
        ...state.artworks,
        ...payload.results
    ],
    count: payload.count,
    hasMore: payload.hasMore
})

const collectionsFetchError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', errorStatus(payload)),
    collections: [],
});

const collectionsLoaded = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
});

const fetchOnlyCollections = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
});


export default {
    collectionsPage,
    collectionsFetchRequest,
    collectionsFetchSuccess,
    collectionsFetchError,
    artworksCollectionsFetchSuccess,
    collectionsLoaded,
    fetchOnlyCollections,
};