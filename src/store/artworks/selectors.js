import { initialStatus } from 'store/utils';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

export const initialState = {
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

export const getStatus = (state = initialState, statusKey) => state.status[statusKey];
export const getArtworks = (state = initialState) => {
  // console.log('state -> ', state);

  return state.allIds.map((id) => state.byId[id]);
};
export const getArtworkIds = (state = initialState) => state.allIds;
export const getArtworksById = (state = initialState) => state.byId;
export const getArtwork = (state = initialState, artworkId) => state.byId[artworkId];
export const getMode = (state = initialState) => state.mode;
export const getFilter = (state = initialState) => state.filter;
export const getSorting = (state = initialState) => state.sorting;
export const getSelected = (state = initialState) => state.selectedArtwork;
export const getPersistedArtwork = (state = initialState, artworkId) => state.byId[artworkId] || null;
export const getSelectedId = (state = initialState) => (state.selectedArtwork ? state.selectedArtwork.id : null);
export const getFilterDrawerOpened = (state = initialState) => state.filter.filterDrawerOpened;
export const getIsFilterApplied = (state = initialState) => (
  !isEqual(omit(state.filter, ['key', 'filterDrawerOpened']), omit(initialState.filter, ['key', 'filterDrawerOpened']))
);
export const getLastUpdated = (state = initialState) => state.updatedAt;
export const getMeta = (state = initialState) => state.artworksMeta;
export const getCsv = (state = initialState) => state.csv.data;
