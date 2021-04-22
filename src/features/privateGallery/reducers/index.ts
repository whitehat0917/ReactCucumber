import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const privateArtworksFetchRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', loadingStatus()),
});

const privateArtworksFetchSuccess = (state, { payload }) => {
    const newUpdateId = state.artworksUpdateId + 1;
    const updResults = payload.results.map(item => ({
        ...item,
        update_id: newUpdateId
    }));

    return {
        ...state,
        status: generateStatus(state, 'fetch', successStatus()),
        artworks: payload.append ? [
            ...state.artworks,
            ...updResults
        ] : [
            ...updResults
        ],
        artworksUpdateId: newUpdateId,
        count: payload.count,
        hasMore: !!payload.next,
        isPrivate: true,
    };
};

const privateArtworksFetchError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', errorStatus(payload)),
});

const privateArtworksLoaded = (state) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
})


export default {
    privateArtworksFetchRequest,
    privateArtworksFetchSuccess,
    privateArtworksFetchError,
    privateArtworksLoaded,
}
