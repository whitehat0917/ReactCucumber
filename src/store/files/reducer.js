
import { generateId } from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILES_ADD:
      return [
        ...state,
        ...payload.map((fileObject) => ({
          id: generateId(), // FIXME reduce should be a pure function
          status: { isLoading: false, isSuccess: false, isError: false },
          ...fileObject,
        })),
      ];
    case types.FILES_REMOVE:
      return state.filter((file) => file.id !== payload);
    case types.FILES_CLEAR_ALL:
      return [];
    case types.FILE_UPLOAD_REQUEST: {
      const currentFile = state.find((file) => file.id === payload);
      return state.map((file) => (file.id === payload ? ({
        ...currentFile,
        status: { isLoading: true, isSuccess: false, isError: false },
      }) : file));
    }
    case types.FILE_UPLOAD_SUCCESS: {
      const currentFile = state.find((file) => file.id === payload);
      return state.map((file) => (file.id === payload ? ({
        ...currentFile,
        status: { isLoading: false, isSuccess: true, isError: false },
      }) : file));
    }
    case types.FILE_UPLOAD_ERROR: {
      const currentFile = state.find((file) => file.id === payload);
      return state.map((file) => (file.id === payload ? ({
        ...currentFile,
        status: { isLoading: false, isSuccess: false, isError: true },
      }) : file));
    }
    default:
      return state;
  }
};
