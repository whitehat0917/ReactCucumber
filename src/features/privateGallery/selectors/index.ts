import { createSelector } from "reselect";

const getUserStatus = state => state.artistInfo.isAuthorized;

const getDeleteStatus = state => state.artworkEditor.status.delete;
const getSelectedStatus = type => state => state.privateGallery.status[type];
const getPrivateArtworks = state => state.privateGallery.artworks;
const getUpdateId = state => state.privateGallery.artworksUpdateId;
const getHasMore = state => state.privateGallery.hasMore;
const getShareStatus = state => state.privateGallery.isPrivate;
const getTotalArtworks = state => state.privateGallery.count;

// interface ISelectedCollection {
//     isLoading: boolean,
//     selectedCollection: TCollection,
//     publicInfo: TUserInfo,
// }

const privateGallerySelector = type => createSelector(
    // getUserStatus,
    getDeleteStatus,
    getSelectedStatus(type),
    getPrivateArtworks,
    getUpdateId,
    getShareStatus,
    getHasMore,
    getTotalArtworks,
    (deleteStatus, status, artworks, artworksUpdateId, isPrivate, hasMore, totalArtworks) => {
        return {
            // isAuthorized,
            deleteStatus,
            status,
            artworks,
            artworksUpdateId,
            isPrivate,
            hasMore,
            totalArtworks
        };
    }
);

export default privateGallerySelector;
