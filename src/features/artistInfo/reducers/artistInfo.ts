
import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const artistInfoRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'user_info', loadingStatus()),
});

const artistInfoSuccess = (state, { payload }) => ({
    ...state,
    info: payload,
    fetchInfo: false,
    isAuthorized: true,
    status: generateStatus(state, 'user_info', successStatus()),
});

const artistInfoError = (state, { payload }) => ({
    ...state,
    fetchInfo: false,
    status: generateStatus(state, 'user_info', errorStatus(payload)),
});

const logout = (state, { payload }) => ({
    ...state
});

export default {
    artistInfoRequest,
    artistInfoSuccess,
    artistInfoError,
    logout,
};