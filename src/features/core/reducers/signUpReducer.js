import {
    loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';

const signUpRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'signup', loadingStatus()),
});

const signUpSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'signup', successStatus()),
});

const signUpError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'signup', errorStatus(payload)),
});

const clearErrors = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'signup', errorStatus({})),
});

export default {
    signUpRequest,
    signUpSuccess,
    signUpError,
    clearErrors,
};