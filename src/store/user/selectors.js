import { initialStatus } from 'store/utils';

export const initialState = {
  status: {
    user_info: initialStatus,
    user_public_info: initialStatus,
    user_contact: initialStatus,
  },
  info: {},
  publicInfo: {},
  impersonated: {},
};

export const getStatus = (state = initialState, statusKey) => {
  // console.log('getStatus -> ', state);

  return state.status[statusKey];
};
export const getInfo = (state = initialState) => state.info;
export const getPublicInfo = (state = initialState) => state.publicInfo;
export const getImpersonatedInfo = (state = initialState) => state.impersonated;
