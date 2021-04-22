import {
  loadingStatus, successStatus, errorStatus, generateStatus,
} from 'store/utils';
import { initialState } from './selectors';
import * as types from './constants';

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.AUTH_LOGOUT_SUCCESS:
      return initialState;
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'login', loadingStatus()),
      };
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'login', successStatus()),
      };
    case types.AUTH_LOGIN_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'login', errorStatus(payload)),
      };
    case types.AUTH_OAUTH_LOGIN_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'oauth_login', loadingStatus()),
      };
    case types.AUTH_OAUTH_LOGIN_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'oauth_login', successStatus()),
      };
    case types.AUTH_OAUTH_LOGIN_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'oauth_login', errorStatus(payload)),
      };
    case types.AUTH_RESET_PASSWORD_EMAIL_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'reset_password', loadingStatus()),
      };
    case types.AUTH_RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'reset_password', successStatus()),
      };
    case types.AUTH_RESET_PASSWORD_EMAIL_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'reset_password', errorStatus(payload)),
      };
    case types.AUTH_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'change_password', loadingStatus()),
      };
    case types.AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'change_password', successStatus()),
      };
    case types.AUTH_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'change_password', errorStatus(payload)),
      };
    case types.AUTH_IMPERSONATE_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'impersonate', loadingStatus()),
      };
    case types.AUTH_IMPERSONATE_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'impersonate', successStatus()),
      };
    case types.AUTH_IMPERSONATE_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'impersonate', errorStatus(payload)),
      };
    case types.AUTH_MAGIC_LOGIN_REQUEST:
      return {
        ...state,
        status: generateStatus(state, 'magic_login', loadingStatus()),
      };
    case types.AUTH_MAGIC_LOGIN_SUCCESS:
      return {
        ...state,
        status: generateStatus(state, 'magic_login', successStatus()),
      };
    case types.AUTH_MAGIC_LOGIN_ERROR:
      return {
        ...state,
        status: generateStatus(state, 'magic_login', errorStatus(payload)),
      };
    default:
      return state;
  }
};
