import { createSelector } from 'reselect';

export const getUserStatus = type => state => state.artistInfo.status[type];
export const getAuthStatus = state => state.core.login;
export const getUserInfo = state => state.artistInfo.info;
export const getUserPublicInfo = state => state.artistInfo.publicInfo;

export const userSelector = type => createSelector(
    getUserStatus(type),
    getAuthStatus,
    getUserInfo,
    getUserPublicInfo,
    (status, authStatus, info, publicInfo) => {
        return {
            status,
            authStatus,
            info,
            publicInfo
        };
    }
);

export const STATUS_INFO = 'user_info';
export const STATUS_PUBLIC_INFO = 'user_public_info';