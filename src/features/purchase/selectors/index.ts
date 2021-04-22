import { createSelector } from 'reselect';
import _ from 'lodash';

import { FetchStaus } from '../../../app/global-types';
import { TProduct} from "../../shop/shop-types";
import {TBillingData, TContactData, TShippingData} from "../purchase-types";

const getFetchStatus = state => state.purchase.status.fetch;
const getPaymentStatus = state => state.purchase.status.payment;
const getProducts = state => state.purchase.product;
const getContactData = state => state.purchase.contactData;
const getShippingData = state => state.purchase.shippingData;
const getBillingData = state => state.purchase.billingData;
const getOrderId = state => state.purchase.billingData.orderId;

interface IProductSelector {
    isLoading: boolean,
    isError: boolean,
    product?: TProduct
}

export const productSelector = createSelector(
    getFetchStatus,
    getProducts,
    (fetchStatus: FetchStaus, product?: TProduct): IProductSelector => {
        return {
            isLoading: fetchStatus.isLoading,
            isError: !_.isEmpty(fetchStatus.errors),
            product
        };
    }
);

interface IContactDataSelector {
    contactData: TContactData
}

export const contactDataSelector = createSelector(
    getContactData,
    (contactData: TContactData): IContactDataSelector => {
        return {
            contactData
        };
    }
);

interface IShippingDataSelector {
    shippingData: TShippingData
}

export const shippingDataSelector = createSelector(
    getShippingData,
    (shippingData: TShippingData): IShippingDataSelector => ({
        shippingData
    })
);

interface IBillingDataSelector {
    billingData
}

export const billingDataSelector = createSelector(
    getBillingData,
    (billingData: TBillingData): IBillingDataSelector => ({
        billingData
    })
);

interface IOrderIdSelector {
    orderId: string;
}

export const orderIdSelector = createSelector(
    getOrderId,
    (orderId: string): IOrderIdSelector => ({
        orderId
    })
);

interface IPaymentStatusSelector {
    isInProcess: boolean;
};

export const paymentStatusSelector = createSelector(
    getPaymentStatus,
    (paymentStatus: FetchStaus): IPaymentStatusSelector => ({
        isInProcess: paymentStatus.isLoading
    })
);
