import {
    put, call, select, takeLatest
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";

import {
    paymentProcessStart,
    paymentProcessEnd,
    makePurchase,
    setOrderId
} from '../purchaseSlice';
import {
    contactDataSelector,
    productSelector,
    shippingDataSelector,
    billingDataSelector
} from "../selectors";

import { postOrder } from "./endpoints";

import monitoringService from 'services/sentry';
import {getFirstErrorDescr} from "../../../utils/error";

function* watchContactDataSubmit(action) {
    const { userName, productId, token } = action.payload;
    if (!userName || !productId || !token) {
        yield call(toast.error, 'Something went wrong. Please, try again later.');
        return;
    }

    const { contactData } = yield select(contactDataSelector);
    const { shippingData } = yield select(shippingDataSelector);
    const { billingData } = yield select(billingDataSelector);

    const { product } = yield select(productSelector);

    if (!product || (product.id != productId)){
        yield call(toast.error, 'Something went wrong. Please, try again later.');
        return;
    }

    let shippingId = undefined;
    if (product.shipping_options && (product.shipping_options.length > shippingData.currShippingOption))
        shippingId = product.shipping_options[shippingData.currShippingOption].id;

    const billingInfoSrc = billingData.sameAsShipping ? contactData : billingData.data;

    try {
        const result = yield call(postOrder, productId, {
            selected_shipping: shippingId,
            stripe_token: token,
            marcel_subscriber: {
                name: `${contactData.firstName} ${contactData.lastName}`,
                email: contactData.email,
                address_line1: contactData.streetAddr,
                address_line2: contactData.aptNum,
                address_city: contactData.city,
                address_state: contactData.region,
                address_country: contactData.country,
                address_postal_code: contactData.postalCode,
                phone_number: contactData.phoneNumber,
                billing_name: `${billingInfoSrc.firstName} ${billingInfoSrc.lastName}`,
                billing_email: billingInfoSrc.email,
                billing_address_line1: billingInfoSrc.streetAddr,
                billing_address_line2: billingInfoSrc.aptNum,
                billing_address_city: billingInfoSrc.city,
                billing_address_state: billingInfoSrc.region,
                billing_address_country: billingInfoSrc.country,
                billing_address_postal_code: billingInfoSrc.postalCode,
                billing_phone_number: billingInfoSrc.phoneNumber
            }
        });

        yield put(setOrderId(result.data.id));
        yield put(push(`/${userName}/shop/purchase/${productId}/success`));
    } catch (e) {
        yield call(monitoringService.logError, e);
        yield call(toast.error, getFirstErrorDescr(e));
    }

    yield put(paymentProcessEnd());
}

function* watchBillingRequests() {
    yield takeLatest(makePurchase, watchContactDataSubmit);
}

export default watchBillingRequests;
