import { createSlice } from '@reduxjs/toolkit';
import { initialStatus } from '../../store/utils';

import { TUserInfo } from 'features/user/user-types';
import { FetchStaus } from 'app/global-types';

import artistInfoReducer from './reducers/artistInfo';
import artistPublicInfoReducer from './reducers/artistPublicInfo';

type ArtistInfoState = {
    status: {
        user_info: FetchStaus,
        user_public_info: FetchStaus,
    }
    fetchInfo: boolean
    info: TUserInfo | {},
    publicInfo: TUserInfo | {}
    isAuthorized: boolean;
};

const initialState: ArtistInfoState = {
    status: {
        user_info: initialStatus,
        user_public_info: initialStatus,
    },
    fetchInfo: true,
    info: {},
    publicInfo: {},
    isAuthorized: false,
}

const artistInfoSlice = createSlice({
    name: 'artistInfo',
    initialState,
    reducers: {
        ...artistInfoReducer,
        ...artistPublicInfoReducer,
        resetArtistState() {
            return initialState;
        }
    },
});

export const {
    artistInfoRequest,
    artistInfoSuccess,
    artistInfoError,
    artistPublicInfoRequest,
    artistPublicInfoSuccess,
    artistPublicInfoError,
    logout,
    resetArtistState,
} = artistInfoSlice.actions;

export default artistInfoSlice.reducer;