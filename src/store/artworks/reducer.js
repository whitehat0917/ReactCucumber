import {
  loadingStatus, successStatus, errorStatus, generateStatus, initialStatus,
} from 'store/utils';
import * as authTypes from 'store/auth/constants';
import * as modalTypes from 'store/modal/constants';
import mergeWith from 'lodash/mergeWith';
import omit from 'lodash/omit';
import { initialState } from './selectors';
import * as types from './constants';

const mergeConcat = (state, ...dataToMerge) => mergeWith({}, state, ...dataToMerge, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
});

const merge = (state, ...dataToMerge) => mergeWith({}, state, ...dataToMerge, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return [...srcValue];
  }
  return undefined;
});

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case authTypes.AUTH_LOGOUT_SUCCESS:
      return initialState;
    case types.ARTWORKS_CLEAR_ALL: {
      const { resetStatus } = payload;
      return {
        ...state,
        byId: {},
        allIds: [],
        artworksMeta: {
          ...state.artworksMeta,
          page: 0,
        },
        status: resetStatus ? generateStatus(state, 'fetch', initialStatus) : state.status,
      };
    }
    case types.ARTWORKS_FETCH_REQUEST: {
      const { silently } = payload;
      if (silently) {
        return state;
      }
      return {
        ...state,
        status: generateStatus(state, 'fetch', loadingStatus()),
      };
    }
    case types.ARTWORKS_FETCH_SUCCESS: {
      const { artworks, updatedAt } = payload;
      return {
        ...state,
        byId: { ...state.byId, ...artworks.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}) },
        allIds: [...state.allIds, ...artworks.map(({ id }) => id)],
        status: generateStatus(state, 'fetch', successStatus()),
        updatedAt,
        artworksMeta: {
          ...state.artworksMeta,
          hasMore: payload.hasMore,
          page: state.artworksMeta.page + 1,
        },
      };
    }
    case types.ARTWORKS_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'fetch', errorStatus(payload)),
      };
    case types.ARTWORKS_SINGLE_ARTWORK_FETCH_REQUEST: {
      return {
        ...state,
        status: generateStatus(state, 'fetch_single', loadingStatus()),
        isLoading: true
      };
    }
    case types.ARTWORKS_SINGLE_ARTWORK_FETCH_SUCCESS: {
      return {
        ...state,
        status: generateStatus(state, 'fetch_single', successStatus()),
        selectedArtwork: payload,
        selectedArtworkCommitted: true,
        isLoading: false
      };
    }
    case types.ARTWORKS_SINGLE_ARTWORK_FETCH_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'fetch_single', errorStatus(payload)),
      };
    case types.ARTWORKS_UPLOAD_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'upload', loadingStatus()),
      };
    case types.ARTWORKS_UPLOAD_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'upload', successStatus()),
      };
    case types.ARTWORKS_UPLOAD_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'upload', errorStatus(payload)),
      };
    case types.ARTWORKS_SET_SELECTED:
      return {
        ...state,
        selectedArtwork: state.byId[payload] || null,
        selectedArtworkCommitted: true,
      };
    case types.ARTWORKS_EDIT_SELECTED:
      return {
        ...state,
        selectedArtwork: merge(state.selectedArtwork, payload),
        selectedArtworkCommitted: false,
      };
    case types.ARTWORKS_COMMIT_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'commit', loadingStatus()),
      };
    case types.ARTWORKS_COMMIT_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'commit', successStatus()),
        byId: state.byId[payload.id] ? merge(state.byId, { [payload.id]: payload }) : state.byId,
        selectedArtwork: payload,
        selectedArtworkCommitted: true,
      };
    case types.ARTWORKS_COMMIT_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'commit', errorStatus(payload)),
      };
    case types.ARTWORKS_CHANGE_MODE:
      return {
        ...state,
        mode: payload,
      };
    case types.ARTWORKS_IMAGES_UPLOAD_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'upload_images', loadingStatus()),
      };
    case types.ARTWORKS_IMAGES_UPLOAD_SUCCESS: {
      const images = payload;
      const newById = state.byId[state.selectedArtwork.id]
        ? merge(state.byId, {
          [state.selectedArtwork.id]: mergeConcat(state.byId[state.selectedArtwork.id], { images }),
        })
        : state.byId;
      return {
        ...state,
        status: generateStatus(state, 'upload_images', successStatus()),
        selectedArtwork: mergeConcat(state.selectedArtwork, { images }),
        byId: newById,
      };
    }
    case types.ARTWORKS_IMAGES_UPLOAD_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'upload_images', errorStatus(payload)),
      };
    case types.ARTWORKS_DELETE_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'delete', loadingStatus()),
      };
    case types.ARTWORKS_DELETE_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'delete', successStatus()),
        byId: omit(state.byId, [payload]),
        allIds: state.allIds.filter((id) => id !== payload),
        selectedArtwork: null,
        selectedArtworkCommitted: true,
      };
    case types.ARTWORKS_DELETE_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'delete', errorStatus(payload)),
      };
    case types.ARTWORKS_EDIT_FILTER:
      return {
        ...state,
        filter: merge(state.filter, payload),
      };
    case types.ARTWORKS_RESET_FILTER:
      return {
        ...state,
        filter: {
          ...initialState.filter,
          filterDrawerOpened: state.filter.filterDrawerOpened,
          key: payload,
        },
      };
    case types.ARTWORKS_APPLY_FILTER_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'apply_filter', loadingStatus()),
        filter: {
          ...state.filter,
          ...payload,
        },
      };
    case types.ARTWORKS_APPLY_FILTER_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'apply_filter', successStatus()),
      };
    case types.ARTWORKS_APPLY_FILTER_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'apply_filter', errorStatus(payload)),
      };
    case types.ARTWORKS_CHANGE_SORTING:
      return {
        ...state,
        sorting: payload,
        status: generateStatus(state, 'change_sorting', loadingStatus()),
      };
    case types.ARTWORKS_CHANGE_SORTING_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'change_sorting', successStatus()),
      };
    case types.ARTWORKS_CHANGE_SORTING_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'change_sorting', errorStatus(payload)),
      };
    case types.ARTWORKS_CHECK_IMAGES_AVAILABILITY:
      return {
        ...state,
        status: generateStatus(state, 'check_images', loadingStatus()),
      };
    case types.ARTWORKS_CHECK_IMAGES_AVAILABILITY_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'check_images', successStatus()),
      };
    case types.ARTWORKS_CHECK_IMAGES_AVAILABILITY_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'check_images', errorStatus(payload)),
      };
    case types.ARTWORKS_PUBLIC_PROFILE_REQUEST: {
      return {
        ...state,
        status: generateStatus(state, 'public_profile', loadingStatus()),
      };
    }
    case types.ARTWORKS_PUBLIC_PROFILE_SUCCESS: {
      const { artworks, hasMore } = payload;
      return {
        ...state,
        byId: { ...state.byId, ...artworks.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}) },
        allIds: [...state.allIds, ...artworks.map(({ id }) => id)],
        status: generateStatus(state, 'public_profile', successStatus()),
        artworksMeta: {
          ...state.artworksMeta,
          hasMore,
          page: state.artworksMeta.page + 1,
        },
      };
    }
    case types.ARTWORKS_PUBLIC_PROFILE_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'public_profile', errorStatus(payload)),
      };
    case types.ARTWORKS_CSV_PARSED:
      return {
        ...state,
        csv: {
          ...state.csv,
          data: payload,
        },
      };
    case types.ARTWORKS_UPDATE_CSV_RECORD: {
      const { name, ...artworkData } = payload;
      const data = state.csv.data.map((row) => {
        if (row.Name !== name) {
          return row;
        }
        return {
          ...row,
          ...artworkData,
        };
      });
      return {
        ...state,
        csv: {
          ...state.csv,
          data,
        },
      };
    }
    case modalTypes.MODAL_CLOSE: {
      const { modalName } = payload;
      if (modalName === 'upload') {
        return {
          ...state,
          csv: initialState.csv,
        };
      }
      return state;
    }
    case types.ARTWORKS_BULK_ACTIONS_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'bulk_actions', loadingStatus()),
      };
    case types.ARTWORKS_BULK_ACTIONS_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'bulk_actions', successStatus()),
      };
    case types.ARTWORKS_BULK_ACTIONS_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'bulk_actions', errorStatus(payload)),
      };
    default:
      return state;
  }
};
