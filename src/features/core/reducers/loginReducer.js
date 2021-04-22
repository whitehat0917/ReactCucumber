import {
    loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';

const authLoginRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', loadingStatus()),
});

const authLoginSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', successStatus()),
});

const authLoginError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', errorStatus(payload)),
});

// oauth
const oauthLoginRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', loadingStatus()),
});

const oauthLoginSuccess = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', successStatus()),
});

const oauthLoginError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'login', errorStatus(payload)),
});

export default {
    authLoginRequest,
    authLoginSuccess,
    authLoginError,
    oauthLoginRequest,
    oauthLoginSuccess,
    oauthLoginError,
};