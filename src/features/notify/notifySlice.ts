import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

// import { TPGState } from './pg-types';

type TNotify = {
    id: string,
    open: boolean,
    type: string,
    timeout: number,
    text: string,
};

type NotifyState = {
    queue: TNotify[]
};

export const initialState: NotifyState = {
    queue: []
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers,
});

export const {
    showNotify,
    hideNotify,
    resetState,
} = notifySlice.actions;

export default notifySlice.reducer;