import { createSelector } from "reselect";

const getUserPublicInfo = state => state.user.publicInfo;

const getSelectedStatus = type => state => state.artworks.status[type];
const getArtworks = state => state.artworks.artworks;
const getHasMore = state => state.artworks.hasMore;

// interface ISelectedCollection {
//     isLoading: boolean,
//     selectedCollection: TCollection,
//     publicInfo: TUserInfo,
// }

const publicGallerySelector = type => createSelector(
    getSelectedStatus(type),
    getArtworks,
    getHasMore,
    getUserPublicInfo,
    (status, artworks, hasMore, publicInfo) => {
        return {
            isLoading: status.isLoading,
            artworks,
            publicInfo,
            hasMore,
        };
    }
);

export const ARTWORK_STATUS = 'fetch';

export default publicGallerySelector;