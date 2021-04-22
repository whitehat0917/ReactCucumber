import * as types from './constants';

// export const artworksFetchRequest = (data = {}) => ({
//   type: types.ARTWORKS_FETCH_REQUEST,
//   payload: data,
// });

// export const artworksFetchSuccess = ({ artworks, updatedAt, hasMore }) => ({
//   type: types.ARTWORKS_FETCH_SUCCESS,
//   payload: { artworks, updatedAt, hasMore },
// });

// export const artworksFetchError = (errorMessage) => ({
//   type: types.ARTWORKS_FETCH_ERROR,
//   payload: errorMessage,
// });

// export const artworksSingleArtworkFetchRequest = (artworkId) => ({
//   type: types.ARTWORKS_SINGLE_ARTWORK_FETCH_REQUEST,
//   payload: { artworkId },
// });

// export const artworksSingleArtworkFetchSuccess = (data) => ({
//   type: types.ARTWORKS_SINGLE_ARTWORK_FETCH_SUCCESS,
//   payload: data,
// });

// export const artworksSingleArtworkFetchError = (errorMessage) => ({
//   type: types.ARTWORKS_SINGLE_ARTWORK_FETCH_ERROR,
//   payload: errorMessage,
// });

export const artworksClearAll = (data = {}) => ({
  type: types.ARTWORKS_CLEAR_ALL,
  payload: data,
});

export const artworksUploadRequest = (files) => ({
  type: types.ARTWORKS_UPLOAD_REQUEST,
  payload: files,
});

export const artworksUploadSuccess = () => ({
  type: types.ARTWORKS_UPLOAD_SUCCESS,
});

export const artworksUploadError = (errorMessage) => ({
  type: types.ARTWORKS_UPLOAD_ERROR,
  payload: errorMessage,
});

export const artworksSetSelected = (artworkId) => ({
  type: types.ARTWORKS_SET_SELECTED,
  payload: artworkId,
});

export const artworksEditSelected = (data) => ({
  type: types.ARTWORKS_EDIT_SELECTED,
  payload: data,
});

export const artworksCommitRequest = () => ({
  type: types.ARTWORKS_COMMIT_REQUEST,
});

export const artworksCommitSuccess = (patchedArtwork) => ({
  type: types.ARTWORKS_COMMIT_SUCCESS,
  payload: patchedArtwork,
});

export const artworksCommitError = (errorMessage) => ({
  type: types.ARTWORKS_COMMIT_ERROR,
  payload: errorMessage,
});

export const artworksChangeMode = (newMode) => ({
  type: types.ARTWORKS_CHANGE_MODE,
  payload: newMode,
});

export const artworksImagesUploadRequest = (files) => ({
  type: types.ARTWORKS_IMAGES_UPLOAD_REQUEST,
  payload: files,
});

export const artworksImagesUploadSuccess = (images) => ({
  type: types.ARTWORKS_IMAGES_UPLOAD_SUCCESS,
  payload: images,
});

export const artworksImagesUploadError = (errorMessage) => ({
  type: types.ARTWORKS_IMAGES_UPLOAD_ERROR,
  payload: errorMessage,
});

export const artworksDeleteRequest = (id) => ({
  type: types.ARTWORKS_DELETE_REQUEST,
  payload: id,
});

export const artworksDeleteSuccess = (id) => ({
  type: types.ARTWORKS_DELETE_SUCCESS,
  payload: id,
});

export const artworksDeleteError = (errorMessage) => ({
  type: types.ARTWORKS_DELETE_ERROR,
  payload: errorMessage,
});

export const artworksEditFilter = (data) => ({
  type: types.ARTWORKS_EDIT_FILTER,
  payload: data,
});

export const artworksResetFilter = (key) => ({
  type: types.ARTWORKS_RESET_FILTER,
  payload: key,
});

export const artworksApplyFilterRequest = (filters) => ({
  type: types.ARTWORKS_APPLY_FILTER_REQUEST,
  payload: filters,
});

export const artworksApplyFilterSave = (filterToApply) => ({
  type: types.ARTWORKS_APPLY_FILTER_SAVE,
  payload: filterToApply,
});

export const artworksApplyFilterSuccess = () => ({
  type: types.ARTWORKS_APPLY_FILTER_SUCCESS,
});

export const artworksApplyFilterError = () => ({
  type: types.ARTWORKS_APPLY_FILTER_ERROR,
});

export const artworksChangeSorting = (data) => ({
  type: types.ARTWORKS_CHANGE_SORTING,
  payload: data,
});

export const artworksChangeSortingSuccess = () => ({
  type: types.ARTWORKS_CHANGE_SORTING_SUCCESS,
});

export const artworksChangeSortingError = (error) => ({
  type: types.ARTWORKS_CHANGE_SORTING_ERROR,
  payload: error,
});

export const artworksCheckImagesAvailability = (uploadedImages) => ({
  type: types.ARTWORKS_CHECK_IMAGES_AVAILABILITY,
  payload: uploadedImages,
});

export const artworksCheckImagesAvailabilitySuccess = () => ({
  type: types.ARTWORKS_CHECK_IMAGES_AVAILABILITY_SUCCESS,
});

export const artworksCheckImagesAvailabilityError = (errorMessage) => ({
  type: types.ARTWORKS_CHECK_IMAGES_AVAILABILITY_ERROR,
  payload: errorMessage,
});

export const artworksPollUpdatesStart = () => ({
  type: types.ARTWORKS_POLL_UPDATES_START,
});

export const artworksPollUpdatesStop = () => ({
  type: types.ARTWORKS_POLL_UPDATES_STOP,
});

export const artworksPublicProfileRequest = ({ silently = false } = {}) => ({
  type: types.ARTWORKS_PUBLIC_PROFILE_REQUEST,
  payload: { silently },
});

export const artworksPublicProfileSuccess = ({ artworks, updatedAt, hasMore }) => ({
  type: types.ARTWORKS_PUBLIC_PROFILE_SUCCESS,
  payload: { artworks, updatedAt, hasMore },
});

export const artworksPublicProfileError = (errorMessage) => ({
  type: types.ARTWORKS_PUBLIC_PROFILE_ERROR,
  payload: errorMessage,
});

export const artworksCsvParsed = (data) => ({
  type: types.ARTWORKS_CSV_PARSED,
  payload: data,
});

export const artworksUpdateCsvRecord = (data) => ({
  type: types.ARTWORKS_UPDATE_CSV_RECORD,
  payload: data,
});

export const artworksExportCsvErred = () => ({
  type: types.ARTWORKS_EXPORT_CSV_ERRED,
});

export const artworksBulkActionsRequest = (ids, actionType) => ({
  type: types.ARTWORKS_BULK_ACTIONS_REQUEST,
  payload: {
    ids,
    actionType,
  },
});

export const artworksBulkActionsError = (errorMessage) => ({
  type: types.ARTWORKS_BULK_ACTIONS_ERROR,
  payload: errorMessage,
});

export const artworksBulkActionsSuccess = () => ({
  type: types.ARTWORKS_BULK_ACTIONS_SUCCESS,
});


//* FOR AMPLITUDE
export const artworksClickToViewMetadata = () => ({
  type: types.ARTWORKS_CLICK_TO_VIEW_METADATA
});

export const uploadVia = (source) => ({
  type: types.UPLOAD_VIA,
  payload: { source }
});

export const deleteMultipleArtworks = () => ({
  type: types.DELETE_MULTIPLE_ARTWORKS
})