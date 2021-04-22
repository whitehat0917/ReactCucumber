import * as types from './constants';

export const notificationCreate = (notificationData) => ({
  type: types.NOTIFICATION_CREATE,
  payload: notificationData,
});

export const notificationDequeue = () => ({
  type: types.NOTIFICATION_DEQUEUE,
});

export const notificationClose = () => ({
  type: types.NOTIFICATION_CLOSE,
});

export const notificationHandleButton = (data) => ({
  type: types.NOTIFICATION_HANDLE_BUTTON,
  payload: data,
});

export const notificationClearAll = () => ({
  type: types.NOTIFICATION_CLEAR_ALL,
});
