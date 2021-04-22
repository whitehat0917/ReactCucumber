import { put, fork, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './constants';

export function* handleButton({ payload }) {
  try {
    const { id, action } = payload;
    if (action && action.type) {
      yield put({
        type: action.type,
        payload: action.payload,
        meta: {
          notificationId: id,
        },
      });
    }
  } finally {
    yield put(actions.notificationClose());
  }
}

export function* watchHandleButtonRequest() {
  yield takeLatest(types.NOTIFICATION_HANDLE_BUTTON, handleButton);
}

export default function* () {
  yield fork(watchHandleButtonRequest);
}
