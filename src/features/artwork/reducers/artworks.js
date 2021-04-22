import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const artworksFetchRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', loadingStatus()),
});

const artworksFetchSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
    artworks: [
        // ...state.artowrks,
        ...payload.results
    ],
    count: payload.count,
    hasMore: !!payload.next,
    isPrivate: false,
});

const artworksFetchError = (state, { payload }) => ({
    ...state,
    error: payload,
    status: generateStatus(state, 'fetch', errorStatus()),
});

const artworksLoaded = (state) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
})

export default {
    artworksFetchRequest,
    artworksFetchSuccess,
    artworksFetchError,
    artworksLoaded
}