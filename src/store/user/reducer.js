import {
  loadingStatus, successStatus, errorStatus, generateStatus, initialStatus,
} from 'store/utils';
import * as authTypes from 'store/auth/constants';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case authTypes.AUTH_LOGOUT_SUCCESS:
      return initialState;
    case types.USER_INFO_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'user_info', loadingStatus()),
      };
    case types.USER_INFO_SUCCESS:
      return {
        ...state,
        info: payload,
        status: generateStatus(state, 'user_info', successStatus()),
      };
    case types.USER_INFO_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'user_info', errorStatus(payload)),
      };
    case types.USER_PUBLIC_INFO_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'user_public_info', loadingStatus()),
      };
    case types.USER_PUBLIC_INFO_SUCCESS:
      return {
        ...state,
        publicInfo: payload,
        status: generateStatus(state, 'user_public_info', successStatus()),
      };
    case types.USER_PUBLIC_INFO_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'user_public_info', errorStatus(payload)),
      };
    case types.USER_CONTACT_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'user_contact', loadingStatus()),
      };
    case types.USER_CONTACT_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'user_contact', successStatus()),
      };
    case types.USER_CONTACT_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'user_contact', errorStatus(payload)),
      };
    case types.USER_SET_IMPERSONATED:
      return {
        ...state,
        impersonated: payload,
      };
    case types.USER_CLEAR_IMPERSONATED:
      return {
        ...state,
        impersonated: initialState.impersonated,
        status: generateStatus(state, 'impersonated', initialStatus),
      };
    default:
      return state;
  }
};
