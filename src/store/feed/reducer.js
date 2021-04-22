import {
  loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.FEED_ITEMS_FETCH_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'feed_fetch_items', loadingStatus()),
      };
    case types.FEED_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'feed_fetch_items', successStatus()),
        feedItems: payload,
      };
    case types.FEED_ITEMS_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'feed_fetch_items', errorStatus(payload)),
      };
    case types.FEED_DISCOVER_ARTWORKS_FETCH_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'discover_fetch_artworks', loadingStatus()),
      };
    case types.FEED_DISCOVER_ARTWORKS_FETCH_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'discover_fetch_artworks', successStatus()),
        discoverArtworks: payload.artworks,
        discoverMeta: {
          page: payload.page,
          pageCount: payload.pageCount,
        },
      };
    case types.FEED_DISCOVER_ARTWORKS_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'discover_fetch_artworks', errorStatus(payload)),
      };
    default:
      return state;
  }
};
