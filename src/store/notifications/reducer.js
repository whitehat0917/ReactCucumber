import { generateId } from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NOTIFICATION_CREATE:
      return [
        ...state,
        {
          id: generateId(),
          open: !state.length,
          timeout: 2000,
          ...payload,
        },
      ];
    case types.NOTIFICATION_DEQUEUE:
      if (state.length < 2) {
        return [];
      }
      return [
        {
          ...state[1],
          open: true,
        },
        ...state.slice(2),
      ];
    case types.NOTIFICATION_CLEAR_ALL:
      return [];
    case types.NOTIFICATION_CLOSE:
      if (!state.length) {
        return [];
      }
      return [
        {
          ...state[0],
          open: false,
        },
        ...state.slice(1),
      ];
    default:
      return state;
  }
};
