import {
    initialStatus, loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const productFetchRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'fetch', loadingStatus())
});

const productFetchSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
    product: payload
});

const productFetchError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'fetch', errorStatus(payload)),
    product: null
});

const productProcessError = (state, action) => ({
    ...state,
    status: generateStatus(state, 'fetch', initialStatus)
})

export default {
    productFetchRequest,
    productFetchSuccess,
    productFetchError,
    productProcessError
};
