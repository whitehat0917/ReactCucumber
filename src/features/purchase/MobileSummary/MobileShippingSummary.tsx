import React from 'react';

import {
    MobileShippingSummaryBody,
    MobileShippingSummaryTitle,
    MobileShippingSummaryPlaceholder, MobileOrderSummaryPrice
} from "../styled";
import {formatPrice} from "../../../utils/artworks";

const MobileShippingSummary = ({ product, showActualInfo, shippingPrice }) => {
    return (
        <MobileShippingSummaryBody>
            <MobileShippingSummaryTitle>
                Shipping
            </MobileShippingSummaryTitle>
            { showActualInfo ? (
                <MobileOrderSummaryPrice>
                    {product && formatPrice(shippingPrice, product.artwork_data.artist_data.currency)}
                </MobileOrderSummaryPrice>
            ) : (
                <MobileShippingSummaryPlaceholder>
                    Calculated at next step
                </MobileShippingSummaryPlaceholder>
            )}
        </MobileShippingSummaryBody>
    );
}

export default MobileShippingSummary;
