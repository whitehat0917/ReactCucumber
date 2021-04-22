import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const userPublicInfoRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'user_public_info', loadingStatus()),
});

const userPublicInfoSuccess = (state, { payload }) => ({
    ...state,
    publicInfo: payload,
    status: generateStatus(state, 'user_public_info', successStatus()),
});

const userPublicInfoError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'user_public_info', errorStatus(payload)),
});

export default {
    userPublicInfoRequest,
    userPublicInfoSuccess,
    userPublicInfoError
};