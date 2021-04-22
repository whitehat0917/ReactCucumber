
import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const userInfoRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'user_info', loadingStatus()),
});

const userInfoSuccess = (state, { payload }) => ({
    ...state,
    info: payload,
    status: generateStatus(state, 'user_info', successStatus()),
});

const userInfoError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'user_info', errorStatus(payload)),
});

export default {
    userInfoRequest,
    userInfoSuccess,
    userInfoError
};