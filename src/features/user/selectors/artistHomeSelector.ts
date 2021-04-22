import { createSelector } from 'reselect';
import _ from 'lodash';

export const getUserStatus = type => state => state.artistInfo.status[type];
// export const getSelectedStatus = state => state.artworks.status['fetch'];
export const getArtworks = state => state.artworks.artworks;
export const getUserPublicInfo = state => state.artistInfo.publicInfo;

export const artistHomeSelector = type => createSelector(
    getUserStatus(type),
    getUserPublicInfo,
    (status, publicInfo) => {
        // console.log('status -> ', status);
        const [featuredArtwork] = publicInfo?.featured_artwork?.images ?? [];

        return {
            status,
            publicInfo,
            featuredArtwork,
        }
    }
);

export const STATUS_PUBLIC_INFO = 'user_public_info';
