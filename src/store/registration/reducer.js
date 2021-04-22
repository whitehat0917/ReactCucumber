import {
  loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.REGISTRATION_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'registration', loadingStatus()),
      };
    case types.REGISTRATION_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'registration', successStatus()),
      };
    case types.REGISTRATION_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'registration', errorStatus(payload)),
      };
    default:
      return state;
  }
};
