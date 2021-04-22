import { createSlice } from '@reduxjs/toolkit';

import userInfo from './reducers/userInfo';
import userPublicInfo from './reducers/userPublicInfo';
import contact from './reducers/contactReducer';

import { initialStatus } from '../../store/utils';
import { TUserState } from './user-types';

export const initialState: TUserState = {
    status: {
        user_info: initialStatus,
        user_public_info: initialStatus,
        user_contact: initialStatus,
    },
    info: {},
    publicInfo: {},
    impersonated: {},
};

const aboutSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        ...userInfo,
        ...userPublicInfo,
        ...contact,
    },
});

export const {
    userInfoRequest,
    userInfoSuccess,
    userInfoError,
    userPublicInfoRequest,
    userPublicInfoSuccess,
    userPublicInfoError,
    userContactRequest,
    userContactSuccess,
    userContactError,
} = aboutSlice.actions;

export default aboutSlice.reducer;

