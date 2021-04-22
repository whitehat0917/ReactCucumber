import { initialStatus } from 'store/utils';

export const initialState = {
  status: {
    feed_fetch_items: initialStatus,
    discover_fetch_artworks: initialStatus,
  },
  feedItems: [],
  discoverArtworks: [],
  discoverMeta: {
    page: null,
    pageCount: null,
  },
};

export const getStatus = (state = initialState, statusKey) => state.status[statusKey];
export const getFeedItems = (state = initialState) => state.feedItems;
export const getDiscoverArtworks = (state = initialState) => state.discoverArtworks;
export const getDiscoverMeta = (state = initialState) => state.discoverMeta;
