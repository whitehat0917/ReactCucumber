import * as types from './constants';

export const filesAdd = (files) => ({
  type: types.FILES_ADD,
  payload: files,
});

export const filesRemove = (fileId) => ({
  type: types.FILES_REMOVE,
  payload: fileId,
});

export const filesClearAll = () => ({
  type: types.FILES_CLEAR_ALL,
});

export const fileUploadRequest = (fileId) => ({
  type: types.FILE_UPLOAD_REQUEST,
  payload: fileId,
});

export const fileUploadSuccess = (fileId) => ({
  type: types.FILE_UPLOAD_SUCCESS,
  payload: fileId,
});

export const fileUploadError = (fileId) => ({
  type: types.FILE_UPLOAD_ERROR,
  payload: fileId,
});
