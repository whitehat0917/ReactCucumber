import { errorStatus, generateStatus, loadingStatus, successStatus } from 'store/utils';

const fetchArtwork = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    status: generateStatus(state, 'fetch', loadingStatus()),
  };
};

const fetchArtworkSuccess = (state, { payload }) => {
  return {
    ...state,
    status: generateStatus(state, 'fetch', successStatus()),
    artwork: {
      ...state.artwork,
      ...payload.data,
    },
  };
};

const fetchArtworkError = (state, { payload }) => {
  return {
    ...state,
    status: generateStatus(state, 'fetch', errorStatus(payload)),
  };
};

const saveArtwork = (state, { payload }) => {
  return {
    ...state,
    status: generateStatus(state, 'update', loadingStatus()),
    artwork: {
      ...state.artwork,
      ...payload.artwork,
    },
  };
};

const updateSuccess = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'update', successStatus()),
  ...payload,
});

const updateFailed = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'update', errorStatus(payload)),
  errors: {
    ...state.errors,
    ...payload.error,
  },
});

const deleteArtwork = (state, { payload }) => {
  return {
    ...state,
    status: generateStatus(state, 'delete', loadingStatus()),
    artwork: {},
  };
};

const deleteSuccess = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'delete', successStatus()),
  ...payload,
});

const deleteFailed = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'delete', errorStatus(payload)),
});

const deleteImageRequest = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'delete', loadingStatus()),
});

const deleteImageSuccess = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'delete', successStatus()),
});

const deleteImageError = (state, { payload }) => ({
  ...state,
  status: generateStatus(state, 'delete', errorStatus(payload)),
});

export default {
  fetchArtwork,
  fetchArtworkSuccess,
  fetchArtworkError,
  saveArtwork,
  deleteArtwork,
  deleteSuccess,
  deleteFailed,
  updateSuccess,
  updateFailed,
  deleteImageRequest,
  deleteImageSuccess,
  deleteImageError,
};
