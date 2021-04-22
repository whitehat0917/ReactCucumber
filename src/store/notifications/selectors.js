export const initialState = [];

export const getAll = (state = initialState) => state;

export const getCurrentNotification = (state = initialState) => state[0] || null;
