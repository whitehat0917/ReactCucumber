import { initialStatus } from 'store/utils';

export const initialState = {
  status: {
    fetch: initialStatus,
    fetch_selected: initialStatus,
  },
  collections: [],
  loadedCollections: [],
  selectedCollection: {},
};

export const getStatus = (state = initialState, statusKey) => state.status[statusKey];
export const getCollections = (state = initialState) => state.collections;
export const getSelectedCollection = (state = initialState) => state.selectedCollection;
