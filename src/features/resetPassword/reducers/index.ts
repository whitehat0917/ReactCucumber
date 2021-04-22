
import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const resetPasswordRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'reset_password', loadingStatus()),
});

const resetPasswordSuccess = (state, { payload }) => ({
    ...state,
    info: payload,
    fetchInfo: false,
    status: generateStatus(state, 'reset_password', successStatus()),
});

const resetPasswordError = (state, { payload }) => ({
    ...state,
    fetchInfo: false,
    status: generateStatus(state, 'reset_password', errorStatus(payload)),
});

const changePasswordRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'change_password', loadingStatus()),
});

const changePasswordSuccess = (state, { payload }) => ({
    ...state,
    info: payload,
    fetchInfo: false,
    status: generateStatus(state, 'change_password', successStatus()),
});

const changePasswordError = (state, { payload }) => ({
    ...state,
    fetchInfo: false,
    status: generateStatus(state, 'change_password', errorStatus(payload)),
});

export default {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordError,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordError,
};