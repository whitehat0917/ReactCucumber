import {
  loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.COLLECTIONS_FETCH_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'fetch', loadingStatus()),
      };
    case types.COLLECTIONS_FETCH_SUCCESS:
      // console.log('COLLECTIONS_FETCH_SUCCESS -> ', payload);
      
      return {
        ...state,
        status: generateStatus(state, 'fetch', successStatus()),
        collections: [
          ...state.collections,
          ...payload.results
        ],
        hasMore: payload.hasMore
      };
    case types.COLLECTIONS_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'fetch', errorStatus(payload)),
        collections: [],
      };
    case types.COLLECTIONS_FETCH_ARTWORKS_SUCCESS:
      return {
        ...state,
        collections: [
          ...state.collections,
          payload.collection
        ],
        collectionsArtworks: {
          ...state.collectionsArtworks,
          [payload.collection.id]: payload.artworks
        },
        hasMore: payload.hasMore
      };
    case types.COLLECTIONS_SINGLE_COLLECTION_FETCH_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'fetch_selected', loadingStatus()),
      };
    case types.COLLECTIONS_SINGLE_COLLECTION_FETCH_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'fetch_selected', successStatus()),
        loadedCollections: [
          ...state.loadedCollections,
          payload
        ],
        selectedCollection: {
          ...state.selectedCollection,
          [payload.url]: {
            ...payload
          }
        },
      };
    case types.COLLECTIONS_SINGLE_COLLECTION_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'fetch_selected', errorStatus(payload)),
        selectedCollection: {},
      };
    default:
      return state;
  }
};
