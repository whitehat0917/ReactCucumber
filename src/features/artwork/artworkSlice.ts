import { createSlice } from '@reduxjs/toolkit';

import artworkReducer from './reducers/artworks';

import { initialStatus } from '../../store/utils';

const initialState = {
  status: {
    fetch: initialStatus,
    fetch_single: initialStatus,
    upload: initialStatus,
    commit: initialStatus,
    upload_images: initialStatus,
    delete: initialStatus,
    check_images: initialStatus,
    public_profile: initialStatus,
    apply_filter: initialStatus,
    change_sorting: initialStatus,
    bulk_actions: initialStatus,
  },
  artworks: [],
  privateArtworks: [],
  mode: 'grid',
  filter: {
    key: 'filter',
    categories: [],
    statuses: [],
    years: [],
    price: {
      max: null,
      min: null,
    },
    filterDrawerOpened: false,
  },
  sorting: {
    order: 'desc',
    key: 'uploaded',
  },
  byId: {},
  allIds: [],
  selectedArtwork: null,
  selectedArtworkCommitted: true,
  updatedAt: null,
  artworksMeta: {
    page: 0,
    // pageCount: null,
    hasMore: false,
  },
  csv: {
    data: [],
  },
};

const artworkSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    ...artworkReducer,
  },
});

export const {
  artworksFetchRequest,
  artworksFetchSuccess,
  artworksFetchError,
  artworksLoaded,
} = artworkSlice.actions;

export default artworkSlice.reducer;
