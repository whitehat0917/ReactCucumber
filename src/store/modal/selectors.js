export const initialState = {};

export const isOpen = (state = initialState, modalName) => Boolean(state[modalName]);
