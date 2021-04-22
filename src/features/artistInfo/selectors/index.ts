import { createSelector } from 'reselect';

export const getArtistStatus = type => state => state.artistInfo.status[type];
export const getArtistInfo = state => state.artistInfo.info;
export const getArtistPublicInfo = state => state.artistInfo.publicInfo;

export const artistInfoSelector = type => createSelector(
    getArtistStatus(type),
    getArtistInfo,
    (status, info) => {
        return {
            status,
            info,
        };
    }
);

export const artistPublicInfoSelector = type => createSelector(
    getArtistStatus(type),
    getArtistPublicInfo,
    (status, publicInfo) => {
        return {
            status,
            publicInfo,
        };
    }
);

export const STATUS_INFO = 'user_info';
export const STATUS_PUBLIC_INFO = 'user_public_info';