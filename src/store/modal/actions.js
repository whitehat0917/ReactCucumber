import * as types from './constants';

export const modalOpen = (modalName) => ({
  type: types.MODAL_OPEN,
  payload: { modalName },
});

export const modalClose = (modalName) => ({
  type: types.MODAL_CLOSE,
  payload: { modalName },
});

export const modalConfirm = (modalName) => ({
  type: types.MODAL_CONFIRM,
  payload: { modalName },
});

export const modalCancel = (modalName) => ({
  type: types.MODAL_CANCEL,
  payload: { modalName },
});
