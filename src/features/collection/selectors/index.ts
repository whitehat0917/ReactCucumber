import { createSelector } from 'reselect';
import { TUserInfo } from '../../user/user-types';
import { TCollection } from '../collection-types';
import { FetchStaus } from '../../../app/global-types';
import { TArtwork } from 'features/artwork/artwork-type';

// Collection Owner -----------------------------------------------------------------
const getUserPublicInfo = state => state.artistInfo.publicInfo;

// Collection -----------------------------------------------------------
const getFetchStatus = state => state.collections.status['fetch'];
const getCollections = state => state.collections.collections;
const getArtworksCollections = state => state.collections.artworks;
const getCount = state => state.collections.count;

const prepareCollections = (collections, collectionArtworks) =>
  collections.reduce((prev, current, idx) => {
    const artworks = collectionArtworks[idx].artworks;

    const collection = {
      ...current,
      artworkCount: artworks.count,
      artworks: [
        ...artworks.results
      ],
    };

    return [
      ...prev,
      collection
    ];
  }, []);

interface ICollectionSelector {
    status: FetchStaus,
    collections: TCollection[],
    collectionArtworks?: TCollection[],
    hasMore: boolean,
    userName: string,
    userId: string,
    publicInfo: TUserInfo | {},
}

export const collectionsSelector = createSelector(
    getFetchStatus,
    getCollections,
    getArtworksCollections,
    getCount,
    getUserPublicInfo,
    (status: FetchStaus, collections:  TCollection[], collectionArtworks: TCollection[], count: number, userInfo: TUserInfo): ICollectionSelector => {
        if (!status.isLoading) {

            const preparedCollections = prepareCollections(collections, collectionArtworks);

            const hasMore = collections.length && (count > collections.length);

            return {
                status,
                collections: preparedCollections,
                hasMore,
                userName: `${userInfo.first_name} ${userInfo.last_name}`,
                userId: userInfo.id,
                publicInfo: userInfo,
            };
        }

        return {
            status,
            collections: [],
            hasMore: false,
            userName: '',
            userId: '',
            publicInfo: {},
        };
    }
);

const getSelectedStatus = state => state.collections.status['fetch_selected'];
const getSelectedCollection = url => state => state.collections.selectedCollections[url];
const getUpdateId = state => state.collections.selCollUpdateId;

interface ISelectedCollection {
    isLoading: boolean,
    hasMoreArtworks: boolean,
    selectedCollection: TCollection,
    selCollUpdateId: number,
    nextCollection: TCollection | {},
    nextArtworks: TArtwork[] | [],
    publicInfo: TUserInfo,
}

export const selectedCollectionsSelector = url => createSelector(
    getSelectedStatus,
    getSelectedCollection(url),
    getUpdateId,
    getCollections,
    getArtworksCollections,
    getUserPublicInfo,
    ( status: FetchStaus,
        selectedCollection: TCollection,
        selCollUpdateId: number,
        collections: TCollection[],
        collectionArtworks: TCollection[],
        publicInfo: TUserInfo,
    ): ISelectedCollection => {
        if (Array.isArray(collections) && collections.length) {
            if (selectedCollection) {
                const currentCollectionIdx = collections.findIndex((element) => element.id === selectedCollection.id);
                const nextIdx = (currentCollectionIdx + 1) === collections.length
                    ? 0
                    : currentCollectionIdx + 1;

                const hasMoreArtworks = selectedCollection.artworks.results.length < selectedCollection.artworks.count;

                const artworks = collectionArtworks.filter(artwork => artwork.id === collections[nextIdx].id);

                const [nextCollection] = prepareCollections([collections[nextIdx]], artworks);

                const nextArtworks = nextCollection && nextCollection.artworks;

                return {
                    isLoading: status.isLoading,
                    hasMoreArtworks,
                    selectedCollection,
                    selCollUpdateId,
                    nextCollection,
                    nextArtworks,
                    publicInfo,
                };
            }
        }

        return {
            isLoading: status.isLoading,
            hasMoreArtworks: false,
            selectedCollection,
            selCollUpdateId,
            nextCollection: {},
            nextArtworks: [],
            publicInfo,
        };
    }
);

// cvv2: 646
