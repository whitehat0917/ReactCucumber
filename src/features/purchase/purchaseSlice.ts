import { createSlice } from '@reduxjs/toolkit';

import { initialStatus } from '../../store/utils';

import { TPurchaseState } from "./purchase-types";
import purchaseReducers from './reducers';

export const initialState: TPurchaseState = {
    status: {
        fetch: initialStatus,
        payment: initialStatus
    },
    product: null,
    contactData: {
        email: '',
        phoneNumber: '',
        keepUpToDate: false,
        firstName: '',
        lastName: '',
        streetAddr: '',
        aptNum: '',
        city: '',
        country: 'United Kingdom',
        region: 'Avon',
        postalCode: ''
    },
    shippingData: {
        currShippingOption: 0
    },
    billingData: {
        sameAsShipping: true,
        data: {
            email: '',
            phoneNumber: '',
            keepUpToDate: false,
            firstName: '',
            lastName: '',
            streetAddr: '',
            aptNum: '',
            city: '',
            country: 'United Kingdom',
            region: 'Avon',
            postalCode: ''
        },
        orderId: ''
    }
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        ...purchaseReducers
    }
});

export const {
    productFetchRequest,
    productFetchSuccess,
    productFetchError,
    productProcessError,
    updateContactData,
    submitContactData,
    setShippingOption,
    setSameAsShipping,
    setBillingData,
    setOrderId,
    paymentProcessStart,
    paymentProcessEnd,
    makePurchase,
    resetAll
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
