import { createSlice } from '@reduxjs/toolkit';

import { initialStatus } from '../../store/utils';

import coreReducer from './reducers/coreReducer';
import loginReducer from './reducers/loginReducer';
import signUpReducer from './reducers/signUpReducer';
import magicLoginReducer from './reducers/magicLogin';
import { TCoreState, TUploaderState } from './core-types';

const uploader: TUploaderState = {
    files: [],
    modalIsOpen: false,
}

const initialState: TCoreState = {
    initializing: false,
    initializide: false,
    authorized: false,
    status: {
        login: initialStatus,
        signup: initialStatus,
        oauth_login: initialStatus,
        reset_password: initialStatus,
        change_password: initialStatus,
        impersonate: initialStatus,
        magic_login: initialStatus,
    },
    uploader,
    errors: {},
};

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        ...coreReducer,
        ...loginReducer,
        ...signUpReducer,
        ...magicLoginReducer,
    },
});

export const {
    initApp,
    appInitialized,
    authError,
    notFound,
    authLoginRequest,
    authLoginSuccess,
    authLoginError,
    signUpRequest,
    signUpSuccess,
    signUpError,
    clearErrors,
    magicLoginRequest,
    magicLoginSuccess,
    invalidToken,
    getMagicLogin,
    oauthLoginRequest,
    oauthLoginSuccess,
    oauthLoginError,
} = coreSlice.actions;

export default coreSlice.reducer;