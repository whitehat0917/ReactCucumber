import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.MODAL_OPEN:
      return {
        ...state,
        [payload.modalName]: true,
      };
    case types.MODAL_CLOSE:
      return {
        ...state,
        [payload.modalName]: false,
      };
    default:
      return state;
  }
};
