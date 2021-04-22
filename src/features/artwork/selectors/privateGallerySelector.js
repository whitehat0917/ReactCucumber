import { createSelector } from "reselect";

const getUserInfo = state => state.user.info;

const getSelectedStatus = type => state => state.artworks.status[type];
const getPrivateArtworks = state => state.artworks.privateArtworks;
const getHasMore = state => state.artworks.hasMore;
const getShareStatus = state => state.artworks.isPrivate;

// interface ISelectedCollection {
//     isLoading: boolean,
//     selectedCollection: TCollection,
//     publicInfo: TUserInfo,
// }

const privateGallerySelector = type => createSelector(
    getSelectedStatus(type),
    getPrivateArtworks,
    getUserInfo,
    getShareStatus,
    (status, artworks, info, isPrivate) => {
        return {
            isLoading: status.isLoading,
            artworks,
            info,
            isPrivate,
        };
    }
);

export default privateGallerySelector;