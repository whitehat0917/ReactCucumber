import React, { Fragment } from 'react';
import { useSelector } from "react-redux";

import {
    shippingDataSelector
} from "./selectors";

import { formatPrice } from "utils/artworks";
import { CURRENCIES } from "../../constants/artworks";

import {
    ShippingSummaryBody,
    ShippingSummaryItem,
    ShippingItemHeader,
    ShippingItemPlaceholder,
    ShippingItemPrice,
    ShippingTotalBox,
    ShippingTotalCurrency,
    ShippingTotalPrice
} from "./styled";

import { calculateShippingAndTotal } from "./utils";

const ShippingSummary = ({ product, currPage }) => {
    const { shippingData } = useSelector(shippingDataSelector);

    const { shippingPrice, total } = calculateShippingAndTotal(product, shippingData);

    const showActualInfo = (currPage !== 'contact');

    return (
        <ShippingSummaryBody>
            <ShippingSummaryItem>
                <ShippingItemHeader>Shipping</ShippingItemHeader>
                { showActualInfo ? (
                    <ShippingItemPrice>
                        {product?.artwork_data && formatPrice(shippingPrice, product.artwork_data.artist_data.currency)}
                    </ShippingItemPrice>
                ) :(
                    <ShippingItemPlaceholder>Calculated at next step</ShippingItemPlaceholder>
                )}
            </ShippingSummaryItem>
            { showActualInfo && (
                <ShippingTotalBox>
                    <ShippingItemHeader>Total</ShippingItemHeader>
                    <ShippingTotalPrice>
                        {product?.artwork_data && formatPrice(total, product.artwork_data.artist_data.currency)}
                    </ShippingTotalPrice>
                </ShippingTotalBox>
            )}
        </ShippingSummaryBody>
    );
};

export default ShippingSummary;
