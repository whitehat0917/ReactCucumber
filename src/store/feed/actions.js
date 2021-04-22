import * as types from './constants';

export const feedItemsFetchRequest = () => ({
  type: types.FEED_ITEMS_FETCH_REQUEST,
});

export const feedItemsFetchSuccess = ({ items }) => ({
  type: types.FEED_ITEMS_FETCH_SUCCESS,
  payload: items,
});

export const feedItemsFetchError = (errorMessage) => ({
  type: types.FEED_ITEMS_FETCH_ERROR,
  payload: errorMessage,
});

export const feedDiscoverArtworksFetchRequest = (page = 1) => ({
  type: types.FEED_DISCOVER_ARTWORKS_FETCH_REQUEST,
  payload: { page },
});

export const feedDiscoverArtworksFetchSuccess = ({ artworks, pageCount, page }) => ({
  type: types.FEED_DISCOVER_ARTWORKS_FETCH_SUCCESS,
  payload: { artworks, pageCount, page },
});

export const feedDiscoverArtworksFetchError = (errorMessage) => ({
  type: types.FEED_DISCOVER_ARTWORKS_FETCH_ERROR,
  payload: errorMessage,
});
