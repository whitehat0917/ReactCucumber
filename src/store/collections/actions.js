import * as types from './constants';

export const collectionsFetchRequest = (offset = 0, userName) => ({
  type: types.COLLECTIONS_FETCH_REQUEST,
  payload: {
    offset,
    userName
  },
});

export const collectionsLoadMore = (offset = 0) => ({
  type: types.COLLECTIONS_LOAD_MORE,
  payload: {
    offset
  },
});

export const collectionsFetchSuccess = (data = {}) => {
  // console.log('data -> ', data);

  return {
    type: types.COLLECTIONS_FETCH_SUCCESS,
    payload: data,
  };
};

export const collectionsFetchError = (errorMessage) => ({
  type: types.COLLECTIONS_FETCH_ERROR,
  payload: errorMessage,
});

export const collectionsSingleCollectionFetchRequest = (collectionUrl, userName) => ({
  type: types.COLLECTIONS_SINGLE_COLLECTION_FETCH_REQUEST,
  payload: { collectionUrl, userName },
});

export const collectionsSingleCollectionFetchSuccess = (data = {}) => ({
  type: types.COLLECTIONS_SINGLE_COLLECTION_FETCH_SUCCESS,
  payload: data,
});

export const collectionsSingleCollectionFetchError = (errorMessage) => ({
  type: types.COLLECTIONS_SINGLE_COLLECTION_FETCH_ERROR,
  payload: errorMessage,
});

export const collectionFetchArtworks = (artworks, collection, count) => ({
  type: types.COLLECTIONS_FETCH_ARTWORKS,
  payload: {
    artworks,
    collection,
    count
  },
});

export const collectionFetchArtworkSuccess = (artworks, collection, count) => {
  // console.log('collection -> ', collection);
  // console.log('artwork -> ', artworks);

  const hasMore = (count > artworks.length) ? true : false;

  return {
    type: types.COLLECTIONS_FETCH_ARTWORKS_SUCCESS,
    payload: {
      artworks,
      collection,
      hasMore
    },
  }
};