import { createSlice } from '@reduxjs/toolkit';
import { initialStatus } from '../../store/utils';

import { TUserInfo } from 'features/user/user-types';
import { FetchStaus } from 'app/global-types';

import reducers from './reducers';

type ArtistInfoState = {
    status: {
        reset_password: FetchStaus,
        change_password: FetchStaus,
    }
    fetchInfo: boolean
};

const initialState: ArtistInfoState = {
    status: {
        reset_password: initialStatus,
        change_password: initialStatus,
    },
    fetchInfo: true,
}

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers,
});

export const {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordError,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordError,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;