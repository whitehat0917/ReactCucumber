import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const productsFetchRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'fetch', loadingStatus())
});

const productsFetchSuccess = (state, { payload }) => {
    const newUpdateId = state.prodUpdateId + 1;
    const updResults = payload.data.results.map(item => ({
        ...item,
        update_id: newUpdateId
    }));

    return {
        ...state,
        status: generateStatus(state, 'fetch', successStatus()),
        products: payload.append ? [
            ...state.products,
            ...updResults
        ] : updResults,
        totalProductNum: payload.data.count,
        prodUpdateId: newUpdateId
    };
};

const productsFetchError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', errorStatus(payload)),
    products: null
});

export default {
    productsFetchRequest,
    productsFetchSuccess,
    productsFetchError
};
