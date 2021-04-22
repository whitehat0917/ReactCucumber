import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const artistPublicInfoRequest = (state, action) => ({
    ...state,
    status: generateStatus(state, 'user_public_info', loadingStatus()),
});

const artistPublicInfoSuccess = (state, { payload }) => ({
    ...state,
    publicInfo: payload,
    status: generateStatus(state, 'user_public_info', successStatus()),
});

const artistPublicInfoError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'user_public_info', errorStatus(payload)),
});

export default {
    artistPublicInfoRequest,
    artistPublicInfoSuccess,
    artistPublicInfoError
};