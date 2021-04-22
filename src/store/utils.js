export const initialStatus = {
  isLoading: false,
  errors: {},
  hasNeverLoaded: true,
};

export const loadingStatus = () => ({
  isLoading: true,
  errors: {},
});

export const successStatus = () => ({
  isLoading: false,
  errors: {},
  hasNeverLoaded: false,
});

export const errorStatus = (errors) => ({
  isLoading: false,
  hasNeverLoaded: false,
  errors,
});

export const generateStatus = (state, statusKey, status) => ({
  ...state.status,
  [statusKey]: {
    ...state.status[statusKey],
    ...status,
  },
});

export const generateId = () => `id-${Math.random().toString(36).substr(2, 16)}`;
