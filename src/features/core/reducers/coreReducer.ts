import { PayloadAction } from '@reduxjs/toolkit';

import { TCoreState } from '../core-types';

export const initApp = (state: TCoreState, { payload }: PayloadAction<TCoreState>) => ({
    ...state,
    initializing: payload.initializing
});

export const appInitialized = (state: TCoreState, { payload }: PayloadAction<Partial<TCoreState>>) => ({
    ...state,
    initializing: payload.initializing,
    initializide: payload.initializide,
});

const authError = (state, { payload }) => ({
    ...state,
    errors: {
        ...state.errors,
        error: {
            ...payload.error,
        }
    }
});

const notFound = (state, { payload }) => ({
    ...state,
    errors: {
        ...state.errors,
        ...payload.error,
    }
});

export default {
    initApp,
    appInitialized,
    authError,
    notFound,
};