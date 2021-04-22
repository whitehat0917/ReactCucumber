import { createSelector } from "reselect";

const getUserPublicInfo = state => state.user.publicInfo;

const getSelectedCollection = collectionName => state => state.collections.selectedCollections[collectionName];
const getHasMore = state => state.artworks.hasMore;

// interface ISelectedCollection {
//     isLoading: boolean,
//     selectedCollection: TCollection,
//     publicInfo: TUserInfo,
// }

const artworksSelector = collectionName => createSelector(
    getSelectedCollection(collectionName),
    getHasMore,
    getUserPublicInfo,
    (selectedCollection, hasMore, publicInfo) => {
        return {
            selectedCollection,
            publicInfo,
            hasMore,
        };
    }
);

export default artworksSelector;