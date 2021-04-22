import React, { Fragment } from 'react';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";

import {
    CardInfoItem,
    CardInfoRow,
    CardInfoRowItem
} from "./styled";

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '20px',
            fontWeight: '300'
        }
    }
}

const CardInfo = () => {
    return (
        <Fragment>
            <CardInfoItem label="Card number" errorMsg="Invalid card number">
                <CardNumberElement options={ELEMENT_OPTIONS} />
            </CardInfoItem>
            <CardInfoRow>
                <CardInfoRowItem label="Expiration date" errorMsg="Invalid expiration date">
                    <CardExpiryElement options={ELEMENT_OPTIONS} />
                </CardInfoRowItem>
                <CardInfoRowItem label="Security code" errorMsg="Invalid security code">
                    <CardCvcElement options={ELEMENT_OPTIONS} />
                </CardInfoRowItem>
            </CardInfoRow>
        </Fragment>
    );
};

export default CardInfo;
