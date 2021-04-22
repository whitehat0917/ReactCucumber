import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const selectedCollectionFetchRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'fetch_selected', loadingStatus()),
});

const selectedCollectionFetchSuccess = (state, { payload }) => {
    const { results, append } = payload;

    const newUpdateId = state.selCollUpdateId + 1;
    results.artworks.results = results.artworks.results.map(item => ({
        ...item,
        update_id: newUpdateId
    }));

    if (append) {
        const existingArtworks = state.selectedCollections[results.url]?.artworks.results ?? [];
        results.artworks.results.unshift(...existingArtworks);
    }

    return {
        ...state,
        status: generateStatus(state, 'fetch_selected', successStatus()),
        loadedCollections: [
            ...state.loadedCollections,
            results
        ],
        selectedCollections: {
            ...state.selectedCollections,
            [results.url]: results
        },
        selCollUpdateId: newUpdateId
    };
};

const selectedCollectionFetchError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch_selected', errorStatus(payload)),
    selectedCollection: {},
})

const preloadCollection = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'preload_selected', loadingStatus()),
});

export default {
    selectedCollectionFetchRequest,
    selectedCollectionFetchSuccess,
    selectedCollectionFetchError,
    preloadCollection,
};
