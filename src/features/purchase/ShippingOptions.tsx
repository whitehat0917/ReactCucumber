import React from "react";
import { v4 } from 'uuid';

import { formatPrice } from "utils/artworks";

import {
    InfoSummaryContainer,
    ShippingOptionsItemBody,
    CheckmarkBody,
    CheckmarkIcon,
    ShippingOptionsItemValue,
    InfoSummaryItemPrice
} from "./styled";

export const Checkmark = ({className, checked}) => (
    <CheckmarkBody className={className} checked={checked}>
        { checked && <CheckmarkIcon /> }
    </CheckmarkBody>
);

const ShippingOptions = ({ isDesktop, product, current, onChange }) => {
    return (
        <InfoSummaryContainer>
            { product?.shipping_options?.map((item, index) => (
                <ShippingOptionsItemBody
                    key={v4()}
                    onClick={() => onChange?.(index)}
                >
                    <Checkmark checked={index === current} />
                    <ShippingOptionsItemValue isDesktop={isDesktop}>{item.name}</ShippingOptionsItemValue>
                    <InfoSummaryItemPrice>
                        {formatPrice(item.shipping_cost, product.artwork_data.artist_data.currency)}
                    </InfoSummaryItemPrice>
                </ShippingOptionsItemBody>
            ))}
        </InfoSummaryContainer>
    );
}

export default ShippingOptions;
