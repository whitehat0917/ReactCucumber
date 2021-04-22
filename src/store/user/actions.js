import * as types from './constants';

export const userInfoRequest = (data = {}) => ({
  type: types.USER_INFO_REQUEST,
  payload: data,
});

export const userInfoSuccess = (userData) => ({
  type: types.USER_INFO_SUCCESS,
  payload: userData,
});

export const userInfoError = (errorMessage) => ({
  type: types.USER_INFO_ERROR,
  payload: errorMessage,
});

export const userPublicInfoRequest = (userName) => ({
  type: types.USER_PUBLIC_INFO_REQUEST,
  payload: userName,
});

export const userPublicInfoSuccess = (userData) => ({
  type: types.USER_PUBLIC_INFO_SUCCESS,
  payload: userData,
});

export const userPublicInfoError = (errorMessage) => ({
  type: types.USER_PUBLIC_INFO_ERROR,
  payload: errorMessage,
});

export const userContactRequest = (data) => ({
  type: types.USER_CONTACT_REQUEST,
  payload: data,
});

export const userContactSuccess = () => ({
  type: types.USER_CONTACT_SUCCESS,
});

export const userContactError = (errorMessage) => ({
  type: types.USER_CONTACT_ERROR,
  payload: errorMessage,
});

export const userSetImpersonated = (data) => ({
  type: types.USER_SET_IMPERSONATED,
  payload: data,
});

export const userClearImpersonated = () => ({
  type: types.USER_CLEAR_IMPERSONATED,
});

export const userAlreadyLoaded = (userData) => {
  console.log('userAlreadyLoaded -> ', userData);

  return {
    type: types.USER_ALREADY_LOADED,
    payload: {
      userData
    }
  }
}