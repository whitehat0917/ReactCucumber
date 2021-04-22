import { initialStatus } from 'store/utils';

export const initialState = {
  status: {
    registration: initialStatus,
  },
};

export const getStatus = (state = initialState, statusKey) => state.status[statusKey];
