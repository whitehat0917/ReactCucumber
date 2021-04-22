import {
    loadingStatus, successStatus, errorStatus, generateStatus
} from 'store/utils';

const userContactRequest = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'user_contact', loadingStatus()),
});

const userContactSuccess = (state) => ({
    ...state,
    status: generateStatus(state, 'user_contact', loadingStatus()),
});

const userContactError = (state, { payload }) => ({
    ...state,
    status: generateStatus(state, 'user_contact', errorStatus(payload)),
});

export default {
    userContactRequest,
    userContactSuccess,
    userContactError,
}