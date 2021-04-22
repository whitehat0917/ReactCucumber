import { createSelector } from 'reselect';
import { FetchStaus } from '../../../app/global-types';
import { TUserInfo } from '../../user/user-types';
import { TCollection } from '../collections-types';

// Collection Owner -----------------------------------------------------------------
const getUserPublicInfo = (state) => state.user.publicInfo;

// Collection -----------------------------------------------------------
const getFetchStatus = (state) => state.collections.status['fetch'];
const getCollections = (state) => state.collections.collections;
export const getArtworksCollections = (state) => state.collections.artworks;
const getCount = (state) => state.collections.count;

const isEmptyCollections = (state) => !state.collections?.collections?.length;

const prependCollections = (collections, collectionArtworks) =>
  collections.reduce((prev, current, idx) => {
    const collection = {
      ...current,
      artworksAmount: current.artworks?.length || collectionArtworks[idx]?.artworks?.count || 0,
      artworks: [...collectionArtworks[idx].artworks.results],
    };

    return [...prev, collection];
  }, []);

interface ICollectionSelector {
  status: FetchStaus;
  collections: TCollection[];
  collectionArtworks?: TCollection[];
  hasMore: boolean;
  userName: string;
  userId: string;
  publicInfo: TUserInfo | {};
  isEmptyCollections: boolean;
}

export const collectionsSelector = createSelector(
  getFetchStatus,
  getCollections,
  getArtworksCollections,
  getCount,
  getUserPublicInfo,
  isEmptyCollections,
  (
    status: FetchStaus,
    collections: TCollection[],
    collectionArtworks: TCollection[],
    count: number,
    userInfo: TUserInfo,
    isEmptyCollections: boolean,
  ): ICollectionSelector => {
    if (!status.isLoading) {
      const newCollList = prependCollections(collections, collectionArtworks);

      const hasMore = collections.length && count > collections.length;

      return {
        status,
        collections: newCollList,
        hasMore,
        userName: `${userInfo.first_name} ${userInfo.last_name}`,
        userId: userInfo.id,
        publicInfo: userInfo,
        isEmptyCollections,
      };
    }

    return {
      status,
      collections: [],
      hasMore: false,
      userName: '',
      userId: '',
      publicInfo: {},
      isEmptyCollections,
    };
  },
);
