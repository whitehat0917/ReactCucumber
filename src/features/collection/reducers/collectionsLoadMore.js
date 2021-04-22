import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

export const collectionsLoadMore = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch_more', loadingStatus(payload)),
});

export const collectionsLoadMoreSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch_more', successStatus(payload)),
    collections: [
        ...state.collections,
        ...payload.results
    ],
    hasMore: payload.hasMore,
});

export default {
    collectionsLoadMore,
    collectionsLoadMoreSuccess,
};