import { createSelector } from "reselect";

const getArtistPublicInfo = state => state.artistInfo.publicInfo;

const getSelectedStatus = type => state => state.publicGallery.status[type];
const getArtworks = state => state.publicGallery.artworks;
const getHasMore = state => state.publicGallery.hasMore;

// interface ISelectedCollection {
//     isLoading: boolean,
//     selectedCollection: TCollection,
//     publicInfo: TUserInfo,
// }

const publicGallerySelector = type => createSelector(
    getSelectedStatus(type),
    getArtworks,
    getHasMore,
    getArtistPublicInfo,
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