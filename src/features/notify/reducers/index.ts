import { v4 } from 'uuid';
import { initialState } from 'features/notify/notifySlice';

const TIMEOUT = 2000;

const showNotify = (state, { payload }) => {
    return {
        ...state,
        queue: [
            ...state.queue,
            {
              id: v4(),
              open: true,
              timeout: TIMEOUT,
              ...payload,
            },
        ]
    }
};

const hideNotify = (state, { payload }) => {
    return {
        ...state,
        queue: state.queue.map(notify => {
            if (notify.id === payload.id) {
                return {
                    ...notify,
                    open: false,
                };
            }
        })
    }
};

const resetState = (state, { payload }) => {
    return initialState;
};

export default {
    showNotify,
    hideNotify,
    resetState,
};
