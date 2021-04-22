import { initialState } from '../purchaseSlice';

import {
    initialStatus, loadingStatus, generateStatus
} from 'store/utils';

const setSameAsShipping = (state, { payload }) => ({
    ...state,
    billingData: {
        ...state.billingData,
        sameAsShipping: payload
    }
});

const setBillingData = (state, { payload }) => ({
    ...state,
    billingData: {
        ...state.billingData,
        data: {
            ...payload
        }
    }
});

const setOrderId = (state, { payload }) => ({
    ...state,
    billingData: {
        ...state.billingData,
        orderId: payload
    }
});

const paymentProcessStart = (state, action) => ({
    ...state,
    status: generateStatus(state, 'payment', loadingStatus())
});

const paymentProcessEnd = (state, action) => ({
    ...state,
    status: generateStatus(state, 'payment', initialStatus)
});

const makePurchase = (state, action) => state;

const resetAll = (state, action) => initialState;

export default {
    setSameAsShipping,
    setBillingData,
    setOrderId,
    paymentProcessStart,
    paymentProcessEnd,
    makePurchase,
    resetAll
};
