import { createSelector } from 'reselect';

import {
    getUserStatus,
    getUserInfo,
    getUserPublicInfo
} from 'features/user/selectors';

export const getLoginStatus = state => state.core.status.login;
export const getChangePasswordStatus = state => state.resetPassword.status.change_password;
export const getResetPasswordStatus = state => state.resetPassword.status.reset_password;
export const getSignUpStatus = state => state.core.status.signup;
export const getAppStatus = state => state.core.initializide;
export const getUserAuthStatus = state => state.core.authorized;

export const coreSelector = type => createSelector(
    getAppStatus,
    getUserStatus(type),
    getUserInfo,
    getUserPublicInfo,
    getLoginStatus,
    getChangePasswordStatus,
    getResetPasswordStatus,
    getUserAuthStatus,
    (initializide, status, info, publicInfo, loginStatus, changePasswordStatus, resetPasswordStatus, authorized) => {
        return {
            initializide,
            status,
            info,
            publicInfo,
            loginStatus,
            changePasswordStatus,
            resetPasswordStatus,
            authorized,
        };
    }
);

export const signUpSelector = createSelector(
    getAppStatus,
    getUserPublicInfo,
    getSignUpStatus,
    (initializide, publicInfo, status) => {
        return {
            initializide,
            status,
            publicInfo,
        };
    }
);