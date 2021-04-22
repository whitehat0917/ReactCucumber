import { FetchStaus } from "../../app/global-types";

import { TProduct } from "../shop/shop-types";

export interface IPurchasePageDescr {
    id: string;
    title: string;
}

export type TPurchaseStatus = {
    fetch: FetchStaus,
    payment: FetchStaus
};

export type TContactData = {
    email: string,
    phoneNumber: string,
    keepUpToDate: boolean,
    firstName: string,
    lastName: string,
    streetAddr: string,
    aptNum: string,
    city: string,
    country: string,
    region: string,
    postalCode: string
};

export type TShippingData = {
    currShippingOption: number;
};

export type TBillingData = {
    sameAsShipping: boolean,
    data: TContactData,
    orderId: string
};

export type TPurchaseState = {
    status: TPurchaseStatus,
    product?: TProduct,
    contactData: TContactData,
    shippingData: TShippingData,
    billingData: TBillingData
};
