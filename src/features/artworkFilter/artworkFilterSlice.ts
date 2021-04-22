import { createSlice } from '@reduxjs/toolkit';

import { initialStatus } from '../../store/utils';

const initialState = {};

const artworkFilterSlice = createSlice({
    name: 'artworkFilter',
    initialState,
    reducers: {
        applyFilter(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        applyFilterFailed(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        resetFilter() {
            return initialState;
        }
    }
});

export const {
    applyFilter,
    applyFilterFailed,
    resetFilter,
} = artworkFilterSlice.actions;

export default artworkFilterSlice.reducer;