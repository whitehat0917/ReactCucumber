/* eslint-disable camelcase */
import * as types from './constants';

export const registrationRequest = (data) => ({
  type: types.REGISTRATION_REQUEST,
  payload: data,
});

export const registrationSuccess = () => ({
  type: types.REGISTRATION_SUCCESS,
});

export const registrationError = (errorMessage) => ({
  type: types.REGISTRATION_ERROR,
  payload: errorMessage,
});
