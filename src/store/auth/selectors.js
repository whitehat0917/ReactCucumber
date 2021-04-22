import { initialStatus } from 'store/utils';

export const initialState = {
  status: {
    login: initialStatus,
    oauth_login: initialStatus,
    reset_password: initialStatus,
    change_password: initialStatus,
    impersonate: initialStatus,
    magic_login: initialStatus,
  },
};

export const getStatus = (state = initialState, statusKey) => state.status[statusKey];
